import { toast } from "vue3-toastify";

export default function callToast(type, message) {
  toast.dark(message, {
    type: type,
    class: "Toastify__toast-container--top-custom",
    autoClose: 2500,
  });
}
