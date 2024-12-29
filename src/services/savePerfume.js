import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default function handleSaving(perfume) {
  let updatedPerfumes;

  const storedPerfumes =
    JSON.parse(localStorage.getItem("savedPerfumes")) || [];

  const existingPerfume = storedPerfumes.find((item) => item.id === perfume.id);

  if (existingPerfume) {
    updatedPerfumes = storedPerfumes.filter((item) => item.id !== perfume.id);
    callInfoToast("Parfem uklonjen iz sačuvanih");
  } else {
    callInfoToast("Parfem dodat u sačuvane");
    updatedPerfumes = [...storedPerfumes, perfume];
  }
  localStorage.setItem("savedPerfumes", JSON.stringify(updatedPerfumes));
}

function callInfoToast(message) {
  toast.dark(message, {
    type: "info",
    class: "Toastify__toast-container--top-custom",
    autoClose: 2500,
  });
}
