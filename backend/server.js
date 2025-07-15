// backend/server.js

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Carga las variables de entorno desde .env localmente para desarrollo

const app = express();
// Render.com asignará un puerto a través de process.env.PORT.
// Si no está definido (ej. en desarrollo local), usará 4000.
const PORT = process.env.PORT || 4000;

// --- Middleware de CORS ---
// Es CRUCIAL que el 'origin' coincida exactamente con el dominio de tu frontend en Netlify.
// Asegúrate de que sea HTTPS.

// 🚨 ¡IMPORTANTE! Reemplaza 'https://tugraciaprint.netlify.app' con la URL REAL de tu frontend si es diferente.
// Si tu frontend tiene un dominio personalizado (ej. 'https://www.tugraciaprint.com'), úsalo.
const allowedOrigins = [
  'http://localhost:3000', // Para tu frontend en desarrollo local (si corre en puerto 3000)
  'http://localhost:4000', // Para pruebas locales del backend (si lo pruebas con Postman/Insomnia)
  'https://tugraciaprint.netlify.app', // <-- ¡TU URL DE NETLIFY!
  // Agrega otras URLs de frontend si las tuvieras
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite solicitudes sin origen (como las de Postman/Insomnia o solicitudes de mismo origen)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Si tu frontend necesita enviar cookies o encabezados de autorización
  optionsSuccessStatus: 204 // Para pre-flight requests
};

app.use(cors(corsOptions));
app.use(express.json()); // Para parsear el body de las peticiones JSON

// --- Configuración de Nodemailer ---
// ¡IMPORTANTE! Siempre usa variables de entorno para tus credenciales
const mailTransporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar 'outlook', 'hotmail', o un host SMTP personalizado
  auth: {
    user: process.env.EMAIL_USER, // Tu dirección de correo (ej. tu_correo@gmail.com)
    pass: process.env.EMAIL_PASS, // Tu contraseña de aplicación generada para Gmail
  },
});

// --- RUTA PARA RECIBIR Y PROCESAR LA ORDEN ---
app.post('/send-order-details', async (req, res) => {
  const { order } = req.body; // Recibe el objeto de la orden completa
  const { buyer, items, total, orderId, date } = order;

  // Validaciones básicas antes de procesar
  if (!order || !buyer || !items || !total || !orderId) {
    console.error('Datos de orden incompletos:', order);
    return res.status(400).json({ message: 'Missing order details.' });
  }

  // Convertir Timestamp de Firebase a fecha legible
  // El frontend envía Firebase.firestore.Timestamp.fromDate(new Date()), que se serializa como { _seconds: N, _nanoseconds: N }
  let orderDate;
  if (date && typeof date === 'object' && date._seconds !== undefined && date._nanoseconds !== undefined) {
    orderDate = new Date(date._seconds * 1000 + date._nanoseconds / 1000000).toLocaleString();
  } else {
    orderDate = new Date().toLocaleString(); // Fallback si el formato no es el esperado o no viene fecha
  }

  // Construir el HTML de los ítems de la orden para los correos
  const itemsHtml = `
        <ul>
            ${items.map(item => `
                <li>
                    ${item.title} (x${item.quantity}) - $${item.price * item.quantity}
                </li>
            `).join('')}
        </ul>
    `;

  // --- 1. Correo para el Cliente ---
  const mailToClientContent = {
    from: process.env.EMAIL_USER,
    to: buyer.email,
    subject: `Confirmación de tu Orden #${orderId} - TuGraciaPrint`, // Ajusta el nombre de tu tienda
    html: `
            <h1>¡Gracias por tu compra, ${buyer.name}!</h1>
            <p>Tu orden <strong>#${orderId}</strong> ha sido recibida y será procesada pronto.</p>
            <p><strong>Fecha de la Orden:</strong> ${orderDate}</p>
            <p>Aquí están los detalles de tu compra:</p>
            ${itemsHtml}
            <p><strong>Total de la Orden: $${total}</strong></p>
            <p>Para coordinar la entrega de tus productos, por favor, comunícate con nosotros directamente por WhatsApp haciendo click en el enlace que se abrió automáticamente.</p>
            <p>¡Esperamos verte de nuevo pronto!</p>
            <p>Saludos cordiales,</p>
            <p><strong>El equipo de TuGraciaPrint</strong></p>
        `,
  };

  // --- 2. Correo para Ti (Administrador) ---
  const mailToAdminContent = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Envía a tu propio correo (el que configuraste en EMAIL_USER)
    subject: `NUEVA ORDEN RECIBIDA: #${orderId} - TuGraciaPrint`, // Ajusta el nombre de tu tienda
    html: `
            <h1>¡Nueva Orden Recibida!</h1>
            <p>Se ha realizado una nueva orden en tu tienda.</p>
            <p><strong>ID de Orden:</strong> ${orderId}</p>
            <p><strong>Cliente:</strong> ${buyer.name} ${buyer.surname}</p>
            <p><strong>Email Cliente:</strong> ${buyer.email}</p>
            <p><strong>Teléfono Cliente:</strong> ${buyer.phone}</p>
            <p><strong>Fecha de la Orden:</strong> ${orderDate}</p>
            <p><strong>Detalles de la Orden:</strong></p>
            ${itemsHtml}
            <p><strong>Total: $${total}</strong></p>
            <p>¡No olvides revisar esta orden en Firestore y coordinar la entrega con el cliente!</p>
        `,
  };

  try {
    // Enviar correos al cliente y al administrador
    await mailTransporter.sendMail(mailToClientContent);
    console.log(`Correo de confirmación enviado al cliente ${buyer.email} para la orden #${orderId}`);

    await mailTransporter.sendMail(mailToAdminContent);
    console.log(`Correo de notificación de nueva orden #${orderId} enviado al administrador.`);

    res.status(200).json({ message: "Detalles de la orden procesados y correos enviados exitosamente." });

  } catch (error) {
    console.error("Error al enviar correos:", error);
    // Envía un mensaje de error más genérico al frontend para evitar exponer detalles internos
    res.status(500).json({ error: "Error al procesar la solicitud de la orden. Por favor, inténtalo de nuevo más tarde." });
  }
});

// --- Ruta de prueba (opcional, para verificar que el backend está vivo) ---
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend server is running!' });
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});