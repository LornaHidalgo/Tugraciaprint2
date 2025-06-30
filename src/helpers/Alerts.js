import Swal from "sweetalert2";

export const confirmationAlert = (title, text) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      text: text,
      showConfirmButton: true,
    });
  };

export const successAlert = (text) => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: text,
    showConfirmButton: false,
    timer: 1000,
  })
}
export const declainAlert = (text) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: text,
      showConfirmButton: true,
    });
  };