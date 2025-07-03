// backend/server.js

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Carga las variables de entorno desde .env localmente

const app = express();
// Render.com asignará un puerto a través de process.env.PORT.
// Si no está definido (ej. en desarrollo local), usará 4000.
const PORT = process.env.PORT || 4000;

// Middleware
// Configuración de CORS para permitir solicitudes desde tu frontend en Vercel.
// Es CRUCIAL que 'origin' coincida exactamente con el dominio de tu aplicación en Vercel.
// Si tu dominio de Vercel es 'https://tugraciaprint.vercel.app', úsalo aquí.
// Si usas un dominio personalizado (ej. 'https://www.tugraciaprint.com'), úsalo en su lugar.
// Para desarrollo local, puedes añadir 'http://localhost:3000' (o el puerto de tu React app)
// o usar '*' temporalmente para pruebas (NO RECOMENDADO para producción).
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000' // Usa la variable de entorno para el frontend
}));
app.use(express.json()); // Para parsear el body de las peticiones JSON

// Configuración de Nodemailer
// --- ¡IMPORTANTE! Siempre usa variables de entorno para tus credenciales ---
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
    // Asegúrate de que 'date' sea un objeto con '_seconds' y '_nanoseconds'
    let orderDate;
    if (date && date._seconds !== undefined && date._nanoseconds !== undefined) {
        orderDate = new Date(date._seconds * 1000 + date._nanoseconds / 1000000).toLocaleString();
    } else {
        orderDate = new Date().toLocaleString(); // Fallback si el formato no es el esperado
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
        // Envía un mensaje de error más genérico al frontend para evitar exponer detalles internos
        res.status(500).json({ error: "Error al procesar la solicitud de la orden. Por favor, inténtalo de nuevo más tarde." });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
