// backend/server.js

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Asegúrate de tener un archivo .env con tus credenciales

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el body de las peticiones JSON

// Configuración de Nodemailer
// --- ¡IMPORTANTE! Usa variables de entorno para tus credenciales ---
const mailTransporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar 'outlook', 'hotmail', o un host SMTP personalizado
  auth: {
    user: process.env.EMAIL_USER, // Tu dirección de correo (ej. tu_correo@gmail.com)
    pass: process.env.EMAIL_PASS, // Tu contraseña o contraseña de aplicación
  },
});

// --- RUTA PARA RECIBIR Y PROCESAR LA ORDEN ---
app.post('/send-order-details', async (req, res) => {
  const { order } = req.body; // Recibe el objeto de la orden completa
  const { buyer, items, total, orderId, date } = order;

  // Convertir Timestamp de Firebase a fecha legible si viene del frontend
  let orderDate = new Date(date._seconds * 1000 + date._nanoseconds / 1000000).toLocaleString();

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
    subject: `Confirmación de tu Orden #${orderId} - Hitaku Store`,
    html: `
      <h1>¡Gracias por tu compra, ${buyer.name}!</h1>
      <p>Tu orden <strong>#${orderId}</strong> ha sido recibida y será procesada pronto.</p>
      <p><strong>Fecha de la Orden:</strong> ${orderDate}</p>
      <p>Aquí están los detalles de tu compra:</p>
      ${itemsHtml}
      <p><strong>Total de la Orden: $${total}</strong></p>
      <p>Para coordinar la entrega de tus productos, por favor, comunícate con nosotros directamente por WhatsApp haciendo click en el enlace que se abrió automáticamente.</p>
      <p>¡Esperamos verte de nuevo pronto!</p>
    `,
  };

  // --- 2. Correo para Ti (Administrador) ---
  const mailToAdminContent = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Envía a tu propio correo (el que configuraste en EMAIL_USER)
    subject: `NUEVA ORDEN RECIBIDA: #${orderId} - Hitaku Store`,
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
      <p>Revisa esta orden y coordina con el cliente.</p>
    `,
  };

  try {
    // Enviar correos al cliente y al administrador
    await mailTransporter.sendMail(mailToClientContent);
    console.log(`Correo enviado al cliente ${buyer.email} para la orden #${orderId}`);

    await mailTransporter.sendMail(mailToAdminContent);
    console.log(`Correo de notificación de orden #${orderId} enviado al administrador.`);

    res.status(200).json({ message: "Detalles de la orden enviados exitosamente." });

  } catch (error) {
    console.error("Error al enviar correos:", error);
    res.status(500).json({ error: "Error al procesar la solicitud de la orden." });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});