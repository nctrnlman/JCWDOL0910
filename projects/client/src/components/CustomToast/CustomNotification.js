import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast/CustomToast";
import CustomToastOptions from "../../components/CustomToast/CustomToastOptions";

export function showSuccessToast(message) {
  toast(<CustomToast type="success" message={message} />, CustomToastOptions);
}

export function showErrorToast(message) {
  toast(<CustomToast type="error" message={message} />, CustomToastOptions);
}

export function showWarningToast(message) {
  toast(<CustomToast type="warning" message={message} />, CustomToastOptions);
}
export function showInfoToast(message) {
  toast(<CustomToast type="info" message={message} />, CustomToastOptions);
}
