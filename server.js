import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import * as emailjs from '@emailjs/nodejs';

// 1. CONFIGURACIÓN INICIAL
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Multer para CVs (en memoria para mayor seguridad)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
});

// 2. MIDDLEWARES DE SEGURIDAD Y RENDIMIENTO

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "media-src": ["'self'", "https://res.cloudinary.com"], // Permite videos de Cloudinary
        "frame-src": ["'self'", "https://www.youtube.com", "https://youtube.com"], // Permite YouTube
        "script-src": ["'self'", "'unsafe-inline'", "https://www.youtube.com"],        
      },
    },
    crossOriginEmbedderPolicy: false, // Necesario para que el navegador no bloquee el recurso externo
  })
);

/*
app.use(helmet({
  contentSecurityPolicy: false, // Desactivar si usas scripts de terceros como Google Fonts o EmailJS en el cliente
}));*/


app.use(compression()); // Comprime las respuestas para que la web cargue más rápido en Chile
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// 3. RUTAS DE LA API (Deben ir antes de los archivos estáticos)

// Health check para monitoreo
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Formulario de Contacto General
app.post("/send-mail", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Aquí usarías la configuración de EmailJS que ya tienes en tus variables de entorno
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_CONTACT_TEMPLATE_ID,
      { from_name: name, from_email: email, message: message },
      { publicKey: process.env.EMAILJS_PUBLIC_KEY, privateKey: process.env.EMAILJS_PRIVATE_KEY }
    );

    res.status(200).json({ success: true, message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error EmailJS:", error);
    res.status(500).json({ success: false, error: "Fallo al enviar el mensaje" });
  }
});

// Formulario de "Trabaja con nosotros" (con subida de archivo)
app.post("/send-join-mail", upload.single("resume"), async (req, res) => {
  try {
    // Lógica para enviar el archivo como adjunto si EmailJS lo permite en tu plan
    // O procesar los datos del postulante
    res.status(200).json({ success: true, message: "Postulación recibida" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error al procesar la postulación" });
  }
});

// 4. ARCHIVOS ESTÁTICOS Y RUTAS DE NAVEGACIÓN
// Servir la carpeta public donde están tus nuevos módulos JS, CSS e Imágenes WebP
app.use(express.static(path.join(__dirname, "public")));

// Manejo de rutas para mantener URLs limpias (SEO friendly)
app.get(["/", "/home", "/servicios", "/nosotros"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 5. MANEJO GLOBAL DE ERRORES (Middleware final)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servidor de GMN.');
});

// 6. LANZAMIENTO
app.listen(PORT, () => {
  console.log(`
  🚀 Servidor de GMN Group ejecutándose:
  - Local: http://localhost:${PORT}
  - Entorno: ${process.env.NODE_ENV || 'development'}
  `);
});