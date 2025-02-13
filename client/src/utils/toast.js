import { toast } from "react-toastify"
const showToast = (type, message) => {
  return toast(message, {
    type: type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    progressClassName:
      type == "error" ? "errorProgressBar" : "successProgressBar",
    className: type == "error" ? "errorToast" : "successToast",
  })
}
export default showToast
