<template>
  <div class="container">
    <i
      class="fa-solid fa-chevron-left"
      @click="scrollLeft"></i>
    <div
      class="tab-slider"
      ref="tabSlider">
      <div
        class="tab"
        v-for="item in parfumes"
        :key="item.id">
        <ProductCard
          :name="item.name"
          :gender="item.gender"
          :price="item.price"
          :volume="item.volume"
          :sale="item.sale"
          :salePrice="item.salePrice"
          :image="item.image"
          :brand="item.brand"
          :rating="item.rating"
          :new="item.new"
          :id="item.id"
          @navigate-to-single="navigateFunction"
          @add-to-cart="handleAddToCart"
          @add-to-favorites="handleAddToFavorites"></ProductCard>
      </div>
    </div>
    <i
      class="fa-solid fa-chevron-right"
      @click="scrollRight"></i>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProductCard from "./ProductCard.vue";
import addToCart from "../../services/addToCart";
import "vue3-toastify/dist/index.css";

const router = useRouter();

const emits = defineEmits(["add-to-favorites"]);

const props = defineProps({
  parfumes: Array,
});

const tabSlider = ref(null);

const scrollLeft = () => {
  const scrollAmount = 300;
  if (tabSlider.value) {
    tabSlider.value.scrollLeft -= scrollAmount;
  }
};

const scrollRight = () => {
  const scrollAmount = 300;
  if (tabSlider.value) {
    tabSlider.value.scrollLeft += scrollAmount;
  }
};

function navigateFunction(parfumeID) {
  router.push(`/singlePerfum/${parfumeID}`);
}

function handleAddToCart(parfumeID) {
  addToCart(props.parfumes, parfumeID);
}

function handleAddToFavorites(parfumeID) {
  const selectedPerfume = props.parfumes.find(
    (perfume) => perfume.id === parfumeID
  );
  if (selectedPerfume) {
    emits("add-to-favorites", selectedPerfume);
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
  height: 0px;
}

.container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.tab-slider {
  max-width: 1400px;
  border-radius: 5px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  gap: 20px;
  align-items: center;
  scroll-behavior: smooth;
  padding: 30px;
}

.fa-chevron-right,
.fa-chevron-left {
  cursor: pointer;
  color: #000;
  font-size: 1.5em;
  margin-left: 20px;
  margin-right: 20px;
}

@media (max-width: 768px) {
  .fa-chevron-right,
  .fa-chevron-left {
    margin-left: 10px;
    margin-right: 10px;
  }
}
@media (max-width: 425px) {
  .fa-chevron-right,
  .fa-chevron-left {
    margin-left: 0px;
    margin-right: 0px;
  }
  .tab-slider {
    padding: 30px 15px;
  }
}
</style>
