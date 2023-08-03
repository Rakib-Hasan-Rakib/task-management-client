import Swal from "sweetalert2";

const ErrorAlert = () => {
  return Swal.fire({
    title: "Error!",
    text: "Opps! you stuck somewhere",
    icon: "error",
    confirmButtonText: "Ok",
  });
};

export default ErrorAlert;
