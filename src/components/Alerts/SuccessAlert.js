import Swal from "sweetalert2";

const SuccessAlert = () => {
    return Swal.fire({
        title: "Well Done!",
        text: "You successfully added a new task",
        icon: "success",
        confirmButtonText: "Ok",
    });
};

export default SuccessAlert;