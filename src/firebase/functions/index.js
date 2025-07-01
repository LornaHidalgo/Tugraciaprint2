// Ejemplo en un componente React/Vue/Vanilla JS
import { getFirestore } from './path/to/your/index.js'; // Asegúrate de la ruta correcta

const db = getFirestore();

// Cuando un usuario completa una compra
async function placeOrder(orderData) {
    try {
        const docRef = await db.collection('orders').add({
            ...orderData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp() // Para una marca de tiempo precisa
        });
        console.log("Orden guardada con ID:", docRef.id);
        // Aquí podrías mostrar un mensaje de éxito al usuario
    } catch (e) {
        console.error("Error al guardar la orden:", e);
        // Aquí podrías mostrar un mensaje de error al usuario
    }
}

// Ejemplo de datos de la orden (ajusta según tu estructura)
const myOrder = {
    customerName: "Juan Pérez",
    customerEmail: "juan.perez@example.com",
    totalAmount: 150.75,
    items: [
        { name: "Producto A", quantity: 1, price: 100.00 },
        { name: "Producto B", quantity: 2, price: 25.37 }
    ]
};

// Llamar a la función cuando sea apropiado (ej. al hacer clic en un botón de "Confirmar Compra")
// placeOrder(myOrder);