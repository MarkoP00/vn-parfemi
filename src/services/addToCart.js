import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default function addToCart(parfumesArray, parfumeID, isRef = false) {
  const parfumesArrayValue = isRef ? parfumesArray.value : parfumesArray;

  let storageParfumes;

  try {
    storageParfumes = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (!Array.isArray(storageParfumes)) {
      callToastInFunction("Doslo je do greske", "error");
      return;
    }
  } catch (error) {
    console.warn("Resetting cartItems due to invalid data:", error.message);
    storageParfumes = [];
  }

  const foundItem = storageParfumes.find((item) => item.id === parfumeID);

  if (foundItem) {
    foundItem.quantity += 1;
    callToastInFunction("Parfem je dodat u korpu!", "info");
  } else {
    const newItem = parfumesArrayValue.find((item) => item.id === parfumeID);
    if (!newItem) {
      console.error(`Item with ID ${parfumeID} not found in parfumesArray`);
      return;
    }
    newItem.quantity = 1;
    storageParfumes.push(newItem);
    callToastInFunction("Parfem je dodat u korpu!", "info");
  }

  localStorage.setItem("cartItems", JSON.stringify(storageParfumes));
}

function callToastInFunction(message, type) {
  toast.dark(message, {
    type: type,
    class: "Toastify__toast-container--top-custom",
    autoClose: 2500,
  });
}
