import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { getFirestore } from "../../../firebase/index";
import { CartContext } from "../../../context/cartContext";
import { confirmationAlert } from "../../../helpers/Alerts";
import "./order.css";
import * as Yup from "yup";

/* Objeto con la validación del form */
const FormValidation = Yup.object().shape({
  name: Yup.string().required("Campo obligatorio"),
  email: Yup.string()
    .email("Email inválido")
    .required("Campo obligatorio")
    .oneOf([Yup.ref("repeat_email")], "Los emails ingresados no coinciden"),
  repeat_email: Yup.string()
    .email("Email inválido")
    .required("Campo obligatorio")
    .oneOf([Yup.ref("email")], "Los emails ingresados no coinciden"),
  phone: Yup.number("Ingresar números").required("Campo obligatorio"),
});

/* Control del form */
export const OrderContent = () => {
  const { cart } = useContext(CartContext);
  const { getSubtotal, getTotal, clearCart } = useContext(CartContext);
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          repeat_email: "",
          phone: "",
        }}
        validationSchema={FormValidation}
        onSubmit={(formData) => {
          const newOrder = {
            buyer: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
            },
            items: cart.map(({ item, counter }) => ({
              id: item.id,
              title: item.title,
              price: item.price,
              quantity: counter,
            })),
            total: getTotal(),
            date: hoy.toLocaleDateString(),
          };

          /* Envío de orden a Firebase */
          const db = getFirestore();
          const orders = db.collection("orders");
          orders
            .add(newOrder)
            .then((response) =>
              confirmationAlert(
                "Orden de compra exitosa",
                `Nos pondremos en contacto para coordinar el pago y la entrega. N° de compra ${response.id}`
              )
            )
            .then(() => clearCart());
        }}
      >
        {({ errors, touched }) => (
          <>
            {cart.length === 0 && (
              <h3>
                Su carrito está vacio por lo tanto no puede realizar su orden de compra. Visite nuestros{" "}
                <Link to="productos/all">productos</Link>{" "}
              </h3>
            )}

            {cart.length !== 0 && (
              <>
                <h2>Detalle carrito</h2>
                <Container className="cart__header">
                  <div className="cart__header--info">Detalle</div>
                  <div className="cart__header--actions">
                    <div>Cantidad</div>
                    <div>Precio</div>
                    <div>Subtotal</div>
                  </div>
                </Container>
                {cart.map(({ item, counter }) => (
                  <Container className="card__cart" id={item.id} key={item.id}>
                    <div className="card__cart--info">
                      <div className="card__cart--img">
                        <img src={item.Image} alt="Foto de producto" />
                      </div>
                      <div className="card_product--title_principal">
                        <h3 className="card__cart--title">{item.title}</h3>
                        <p className="card__cart--desc">{item.description}</p>
                      </div>
                    </div>
                    <div className="card__cart--actions">
                      <div className="price">{counter}</div>
                      <div className="price">${item.price}</div>
                      <div className="price">
                        ${getSubtotal(counter, item.price)}
                      </div>
                    </div>
                  </Container>
                ))}
                <div className="cart__footer">Total ${getTotal()}</div>
              </>
            )}

            {cart.length !== 0 && (
              <>
                <h2>Datos comprador</h2>
                <Form>
                  <div className="form-group">
                    <label className="form-label">Nombre</label>
                    <Field
                      name="name"
                      className="form-input"
                      placeholder="Ingresar nombre y apellido"
                    />
                    <div className="form-error">
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="Ingresar email"
                    />
                    <div className="form-error">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Repetir email</label>
                    <Field
                      name="repeat_email"
                      type="email"
                      className="form-input"
                      placeholder="Repetir email"
                    />
                    <div className="form-error">
                      <ErrorMessage name="repeat_email" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Teléfono</label>
                    <Field
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="Ingresar teléfono"
                    />
                    <div className="form-error">
                      <ErrorMessage name="phone" />
                    </div>
                  </div>
                  <div className="form-buttons">
                    <button type="submit" className="btn">
                      Realizar compra
                    </button>
                    <button type="reset" className="btn">
                      Vaciar formulario
                    </button>
                  </div>
                </Form>
              </>
            )}
          </>
        )}
      </Formik>
    </div>
  );
};
