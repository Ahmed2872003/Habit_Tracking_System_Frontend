import { toast } from "react-toastify";

const TOAST_CONFIG = {
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const notifySuccess = (msg) => toast.success(msg, TOAST_CONFIG);
const notifyError = (msg) => toast.error(msg, TOAST_CONFIG);
const notifyInfo = (msg) => toast.info(msg, TOAST_CONFIG);
const notifyWarning = (msg) => toast.warn(msg, TOAST_CONFIG);

export { notifySuccess, notifyError, notifyInfo, notifyWarning };
