import { toast, ToastContainer } from "react-toastify";

export const notify = (type, text = "Update") =>
  type === "success"
    ? toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    : toast.error(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

export const TgToast = ({ message, type }) => {
  return <ToastContainer />;
};
