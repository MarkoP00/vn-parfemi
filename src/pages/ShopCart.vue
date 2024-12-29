<template>
  <SlideShow></SlideShow>
  <Header></Header>
  <GlobalPopup
    :singleButton="popupSingleButton"
    v-if="popupTitle"
    :popupTitle="popupTitle"
    :popupMessage="popupMessage"
    @popup-cancel="handlePopup"
    @popup-confirm="() => handleDelete(parfumeDeleteId)"></GlobalPopup>
  <TermsOfUse
    v-if="termsOfUseVisible"
    @close-terms="toggleTermsOfUse"></TermsOfUse>

  <GlobalSpinner v-if="formIsSubmiting"></GlobalSpinner>
  <section class="cartSection">
    <ShopLogo class="banner"></ShopLogo>
    <main class="cartMain">
      <div class="cartHeader">
        <span>Korpa</span>
      </div>
      <div
        class="cartWrapper"
        v-if="!cartProducts || cartProducts.length">
        <div class="cartContainer">
          <div class="cartTop">
            <ul class="cartList">
              <li
                class="cartItem"
                v-for="item in cartProducts"
                :key="item.name">
                <div class="productContainer">
                  <div
                    class="productImage"
                    @click="router.push(`/singlePerfum/${item.id}`)">
                    <img
                      :src="item.image"
                      alt="product image" />
                  </div>
                  <div class="productInfo">
                    <div class="productBrand">
                      <span>{{ item.brand }}</span>
                      <div class="trashCanIcon">
                        <i
                          class="fa-solid fa-trash"
                          @click="
                            handlePopup({
                              title: 'Upozorenje',
                              message:
                                'Da li ste sigurni da želite ukloniti parfem iz korpe?',
                              parfumeID: item.id,
                            })
                          ">
                        </i>
                      </div>
                    </div>
                    <div class="productName">
                      <h3>{{ item.name }}</h3>
                    </div>
                    <div class="productVolume">
                      <span>{{ item.volume }}ml</span>
                    </div>
                    <div class="productPriceContainer">
                      <h4>{{ item.price }} RSD</h4>
                      <div class="productVolumeButtons">
                        <button
                          class="quantityBtn"
                          @click="handleUserActions('minus', item.id)">
                          -
                        </button>
                        <span class="quantityDisplay">{{ item.quantity }}</span>
                        <button
                          class="quantityBtn"
                          @click="handleUserActions('plus', item.id)">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <OrderForm
            ref="orderFormRef"
            :perfumesToOrder="cartProducts"
            :totalAmount="totalAmount"></OrderForm>
        </div>
        <!-- cart Pricing -->
        <div
          class="cartPricing"
          ref="pricingSection">
          <div class="pricingTop">
            <div class="pricingTitle">
              <h3>Pregled porudžbine</h3>
            </div>
            <div class="pricingCost">
              <span>Iznos:</span>
              <p>{{ noShippingAmount }} RSD</p>
            </div>
            <div
              class="pricingDelivery"
              :class="{ freeShipping: noShippingAmount > 10000 }">
              <span>Isporuka:</span>
              <p>390 RSD</p>
            </div>
          </div>
          <div class="pricingBottom">
            <span>Ukupno za plaćanje:</span>
            <h3>{{ totalAmount }} RSD</h3>
          </div>
          <div
            class="termsOfUse"
            :class="{ invalid: termsOfUse === false }">
            <input
              type="checkbox"
              id="terms"
              v-model="termsOfUse" />
            <label for="terms"
              >Obeleži da ste pričitali i da ste saglasni sa
              <span @click="toggleTermsOfUse">Uslovima korišćenja</span></label
            >
          </div>
          <GlobalButton
            :text="'Naruči'"
            @click="handleSubmit" />
        </div>
      </div>
      <div
        v-else
        class="emptyCart">
        <div class="emptyTitle">
          <h1>Vaša korpa je prazna</h1>
        </div>
        <div>
          <GlobalButton
            :text="'Pogledaj ponudu'"
            @click="router.push('/wholeOffer')"></GlobalButton>
        </div>
      </div>
    </main>
  </section>
</template>

<script setup>
import ShopLogo from "../global/ShopLogo.vue";
import Header from "../components/Header.vue";
import SlideShow from "../components/SlideShow.vue";
import GlobalButton from "../global/GlobalButton.vue";
import GlobalPopup from "../global/GlobalPopup.vue";
import GlobalSpinner from "../global/GlobalSpinner.vue";
import OrderForm from "../components/form/OrderForm.vue";
import TermsOfUse from "../components/TermsOfUse.vue";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

// im going to write comments here
const router = useRouter();
// cart products & pricing
const cartProducts = ref(JSON.parse(localStorage.getItem("cartItems")) || []);
const totalAmount = ref(0);
const noShippingAmount = ref(0);
// refs for child
const pricingSection = ref(null);
const orderFormRef = ref(null);
// popup data
const popupMessage = ref("");
const popupTitle = ref("");
const popupSingleButton = ref(false);
const parfumeDeleteId = ref(null);
// form subtmiting status
const formIsSubmiting = ref(false);
const termsOfUse = ref(null);
const termsOfUseVisible = ref(false);
// price handling
function handlePrice() {
  totalAmount.value = 0; // Reset
  noShippingAmount.value = 0;

  cartProducts.value.forEach((item) => {
    noShippingAmount.value += item.price * item.quantity;
  });
}
// user actions on buttons
function handleUserActions(action, parfumeID) {
  const actionParfume = cartProducts.value.find(
    (item) => item.id === parfumeID
  );

  if (!actionParfume) return;

  if (action === "plus") {
    actionParfume.quantity += 1;
    handlePrice();
  }

  if (action === "minus") {
    if (actionParfume.quantity > 1) {
      actionParfume.quantity -= 1;
      totalAmount.value -= actionParfume.price;
    } else {
      handlePopup({
        title: "Upozorenje",
        message: "Da li ste sigurni da želite ukloniti parfem iz korpe?",
        parfumeID: parfumeID,
      });
      return;
    }
  }
  localStorage.setItem("cartItems", JSON.stringify(cartProducts.value));
  handlePrice();
}
// submit handling
async function handleSubmit() {
  if (!termsOfUse.value) {
    termsOfUse.value = false;
    toastNote("Proverite sva uneta polja", "warning");
    return;
  }
  if (orderFormRef.value) {
    formIsSubmiting.value = true;
    const result = await orderFormRef.value.submitForm();
    if (result) {
      handlePopup({
        title: result.popupTitle,
        message: result.popupMessage,
        singleButton: true,
      });
    }
    formIsSubmiting.value = false;
    localStorage.removeItem("cartItems");
    cartProducts.value = [];
  }
}

// notification
function toastNote(message, type) {
  toast.dark(`${message}`, {
    type: `${type}`,
    class: "Toastify__toast-container--top-custom",
    autoClose: 2000,
  });
}

//popup functions
function handlePopup({
  title = "",
  message = "",
  singleButton = false,
  parfumeID = "",
} = {}) {
  popupTitle.value = title;
  popupMessage.value = message;
  popupSingleButton.value = singleButton;
  parfumeDeleteId.value = parfumeID;
}

function handleDelete(parfumeID) {
  if (!cartProducts.value || cartProducts.value.length === 0) return;

  const actionParfume = cartProducts.value.find(
    (item) => item.id === parfumeID
  );

  if (!actionParfume) return;

  if (actionParfume) {
    cartProducts.value = cartProducts.value.filter(
      (item) => item.id !== parfumeID
    );
  }
  localStorage.setItem("cartItems", JSON.stringify(cartProducts.value));

  handlePrice();
  handlePopup();

  toastNote("Proizvod uklonjen iz korpe", "success");
}

function toggleTermsOfUse() {
  termsOfUseVisible.value = !termsOfUseVisible.value;
}

watch(noShippingAmount, () => {
  if (noShippingAmount.value < 10000) {
    totalAmount.value = noShippingAmount.value + 390;
  } else {
    totalAmount.value = noShippingAmount.value;
  }
});

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!cartProducts.value || cartProducts.value.length === 0) return;
      if (!entry.isIntersecting) {
        pricingSection.value.classList.add("sticky");
      } else {
        pricingSection.value.classList.remove("sticky");
      }
    },
    { threshold: 0.1 }
  );

  const banner = document.querySelector(".banner");
  observer.observe(banner);

  handlePrice();
});
</script>

<style scoped>
.cartSection {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.sticky {
  position: sticky;
  top: 15%;
  z-index: 1;
  background: white;
  width: 100%;
}

/* Main Cart Container */
.cartMain {
  width: 100%;
  max-width: 1400px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Header */
.cartHeader {
  background: #333;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}

.cartHeader span {
  font-size: 25px;
  font-weight: bold;
}

.cartContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  width: 100%;
}
.cartWrapper {
  display: flex;
  gap: 20px;
  position: relative;
}
/* Cart List */
.cartTop {
  width: 100%;
}
.cartList {
  list-style: none;
  padding: 10px;
  margin: 0;
  border-bottom: 1px solid #b7b7b7;
  max-height: 550px;
  overflow-y: auto;
}

.cartItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  position: relative;
}

/* Product Container */
.productContainer {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

/* Product Image */
.productImage img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
}

/* Product Info */
.productInfo {
  flex: 1;
}

.productBrand {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  text-transform: uppercase;
}

.trashCanIcon i {
  color: #000;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.trashCanIcon i:hover {
  transform: scale(1.1);
}

.productName h3 {
  font-size: 18px;
  margin: 5px 0;
}

.productVolume span {
  color: #555;
}

/* Product Price and Quantity */
.productPriceContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.productVolumeButtons {
  display: flex;
  align-items: center;
  gap: 10px;
}
.freeShipping {
  text-decoration: line-through;
  text-decoration-color: red;
}

.quantityBtn {
  background: #ddd;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.quantityBtn:hover {
  background: #bbb;
}

.quantityDisplay {
  font-weight: bold;
}
/* Order Info */
.cartPricing {
  padding: 20px;
  background-color: #fff;
  height: 100%;
  width: 500px;
  border-radius: 8px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: 0.3s all;
}
.pricingTitle {
  margin-bottom: 20px;
}
.pricingTop {
  border-bottom: 1px solid #b7b7b7;
  width: 100%;
  padding-bottom: 10px;
}

.pricingCost,
.pricingDelivery {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  width: 100%;
}

.pricingBottom {
  border-bottom: 1px solid #b7b7b7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding-bottom: 17px;
}
.pricingCost span,
.pricingDelivery span,
.pricingCost p,
.pricingDelivery p,
.pricingBottom span {
  margin: 0;
  font-size: 16px;
  color: #333;
  text-align: left;
}
.pricingBottom h3 {
  white-space: nowrap;
}
.termsOfUse {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.termsOfUse input[type="checkbox"] {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.termsOfUse label {
  cursor: pointer;
}

.termsOfUse span {
  color: #b72f2f;
  text-decoration: none;
  font-weight: bold;
}
.termsOfUse span:hover {
  border-bottom: 1px solid #b72f2f;
}
.termsOfUse a:hover {
  text-decoration: underline;
}

.invalid {
  padding: 10px;
  border: 2px solid rgb(239, 76, 76);
  border-radius: 10px;
}
.emptyCart {
  text-align: center;
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
@media (max-width: 768px) {
  .cartMain {
    padding: 5px;
  }
}
@media (max-width: 500px) {
  .cartWrapper {
    flex-direction: column;
  }
  .cartPricing {
    width: 100%;
  }
}
@media (max-width: 376px) {
  .cartSection {
    padding: 10px;
  }
  .cartMain {
    padding: 10px;
  }
}
</style>
