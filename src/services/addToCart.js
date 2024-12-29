import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default function addToCart(parfumesArray, parfumeID, isRef = false) {
  
  const parfumesArrayValue = isRef ? parfumesArray.value : parfumesArray;

  let storageParfumes = JSON.parse(localStorage.getItem("cartItems")) || [];

  const foundItem = storageParfumes.find((item) => item.id === parfumeID);

  if (foundItem) {
    foundItem.quantity += 1;
    callInfoToast();
  } else {
    const newItem = parfumesArrayValue.find((item) => item.id === parfumeID);
    if (!newItem) {
      console.error(`Item with ID ${parfumeID} not found in parfumesArray`);
      return;
    }
    newItem.quantity = 1;
    storageParfumes.push(newItem);
    callInfoToast();
  }
  localStorage.setItem("cartItems", JSON.stringify(storageParfumes));
}

function callInfoToast() {
  toast.dark("Parfem dodat u korpu!", {
    type: "info",
    class: "Toastify__toast-container--top-custom",
    autoClose: 2500,
  });
}
