<template>
  <div class="parfumeCard">
    <div
      class="salePrice"
      v-if="props.salePrice">
      <p>Nova cena</p>
      <span>{{ props.salePrice }} RSD</span>
    </div>
    <div
      v-if="props.sale"
      class="ribbon">
      <span>Akcija!</span>
    </div>
    <div
      v-if="props.new && !props.sale"
      class="ribbon2">
      <span>Novo!</span>
    </div>
    <div class="parfumeImage">
      <img
        :src="props.image"
        alt="Perfume Image" />
    </div>
    <div class="parfumInfo">
      <div class="parfumeName">
        <div class="parfumeNameBrand">
          <span>{{ props.brand }} </span>
          <span> {{ props.volume }}ml</span>
        </div>
        <h3>{{ props.name }}</h3>
      </div>
      <div class="productPrice">
        <div class="priceLeft">
          <span :class="{ onSale: props.salePrice }"
            >Cena: {{ props.price }} RSD</span
          >
        </div>
        <!-- stars -->
        <div class="priceRight">
          <i
            v-for="i in 5"
            :key="i"
            :class="getStarClass(i)"></i>
        </div>
      </div>
    </div>

    <div
      class="parfumeCardHover"
      @click="router.push(`/singlePerfum/${props.id}`)">
      <div
        class="parfumeButtons"
        @click.stop>
        <button @click="emitEvent('navigate-to-single', props.id)">
          <i class="fa-solid fa-eye"></i>
        </button>

        <button @click="emitEvent('add-to-favorites', props.id)">
          <i class="fa-solid fa-heart"></i>
        </button>
        <button @click="emitEvent('add-to-cart', props.id)">
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  name: String,
  gender: String,
  price: Number,
  stock: Boolean,
  quantity: Boolean,
  sale: Boolean,
  salePrice: {
    type: [Number, Boolean],
    default: false,
  },
  image: String,
  brand: String,
  new: Boolean,
  rating: Number,
  volume: Number,
  id: String,
});

const emits = defineEmits([
  "add-to-cart",
  "navigate-to-single",
  "add-to-favorites",
]);

function emitEvent(event, id) {
  emits(event, id);
}

function getStarClass(index) {
  if (props.rating >= index) return "fa fa-star";
  if (props.rating + 0.5 === index) return "fa fa-star-half-alt";
  return "fa-regular fa-star";
}
</script>

<style scoped>
.parfumeCard {
  height: 450px;
  width: 350px;
  background-color: #f8f8f8;
  position: relative;
  border-radius: 20px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  border: 1px solid rgb(166, 162, 162);
  animation: fade-in 0.5s;
}

.parfumeImage {
  height: 330px;
  width: 100%;
}

.parfumeImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.parfumInfo {
  padding: 5px 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.parfumeNameBrand {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.parfumeName span {
  color: #5c5b5b;
  text-transform: uppercase;
  font-weight: 400;
}
.parfumeName h3 {
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
  font-size: 1.1em;
}

.productPrice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 10px;
  width: 90%;
}

.priceLeft span {
  font-weight: 500;
  color: #333;
  font-size: 1.1em;
}

.priceRight {
  color: #ffc107;
  font-size: 1.1em;
}

.priceRight i {
  margin-right: 3px;
}

.salePrice {
  position: absolute;
  top: 10px;
  right: 10px;
  /* background: linear-gradient(45deg, #ff6b6b, #ff4757); */
  background: rgb(255, 71, 87, 0.8);
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  animation: pulse 1.5s infinite;
  z-index: 10;
}

.salePrice p {
  margin: 0;
  font-size: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
}

.salePrice span {
  font-size: 18px;
  font-weight: 700;
  margin-top: 5px;
  display: block;
}

.onSale {
  text-decoration: line-through;
  text-decoration-color: #ff4757;
}
.parfumeCardHover {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 20px;
  cursor: pointer;
}

.parfumeCard:hover .parfumeCardHover {
  opacity: 1;
}

.parfumeButtons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.parfumeButtons button {
  padding: 10px 12px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  color: #000;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s, color 0.3s;
}

.parfumeButtons button:hover {
  background: #181818;
  color: #fff;
}

.ribbon,
.ribbon2 {
  height: 150px;
  width: 150px;
  position: absolute;
  top: -10px;
  left: -10px;
  overflow: hidden;
  z-index: 10;
}

.ribbon::before,
.ribbon::after {
  position: absolute;
  content: "";
  display: block;
  border: 5px solid #801a3a;
  border-top-color: transparent;
  border-left-color: transparent;
}
.ribbon2::before,
.ribbon2::after {
  position: absolute;
  content: "";
  display: block;
  border: 5px solid #0a5363;
  border-top-color: transparent;
  border-left-color: transparent;
}
.ribbon::before,
.ribbon2::before {
  top: 0px;
  right: 15px;
}
.ribbon::after,
.ribbon2::after {
  bottom: 15px;
  left: 0px;
}
.ribbon span,
.ribbon2 span {
  position: absolute;
  top: 30px;
  right: 0;
  transform: rotate(-45deg);
  width: 200px;
  padding: 10px 0;
  color: #fff;
  text-align: center;
  font-size: 17px;
  text-transform: uppercase;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
}
.ribbon span {
  background: #e91e63;
}
.ribbon2 span {
  background: #0f9cbc;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 5px 10px rgba(255, 107, 107, 0.2);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 8px 15px rgba(255, 107, 107, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 5px 10px rgba(255, 107, 107, 0.2);
  }
}
@media (max-width: 768px) {
  .parfumeCard {
    height: 380px;
    width: 300px;
  }
  .parfumeImage {
    height: 270px;
    width: 100%;
  }

  .parfumeImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .parfumeName span {
    font-size: 0.95em;
  }
  .parfumeName h3 {
    margin-bottom: 0px;
    font-size: 1em;
  }
  .parfumInfo {
    padding: 1px 10px;
    gap: 0px;
  }
  .priceLeft span {
    font-size: 0.95em;
  }
  .priceRight {
    font-size: 1em;
  }
  .productPrice {
    position: absolute;
    bottom: 5px;
    display: flex;
    justify-content: center;
    gap: 45px;
    width: unset;
  }
}
</style>
