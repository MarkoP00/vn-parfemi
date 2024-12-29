<template>
  <Header ref="headerRef"></Header>
  <SlideShow></SlideShow>
  <section class="offerSection">
    <main>
      <GlobalSpinner v-if="pageIsLoading"></GlobalSpinner>
      <!-- shop logo -->
      <ShopLogo></ShopLogo>
      <!-- whole offer title -->
      <div class="wholeOfferTitle">
        <i class="fa-solid fa-minus"></i>
        <span>Kompletna ponuda </span>
        <i class="fa-solid fa-minus"></i>
      </div>
      <!-- active sales -->
      <div class="activeSales">
        <GlobalCard
          :imageSRC="'https://i.pinimg.com/736x/86/da/41/86da41942a89df8efed6ec382a40a702.jpg'"
          :firstMessage="'Ustedite do'"
          :secondMessage="'na Muške parfeme'"
          :discount="'20%'"
          @click="router.push('/parfumesDiscount/male')"></GlobalCard>
        <GlobalCard
          :imageSRC="'https://images.unsplash.com/photo-1701291927826-c7775869d822?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcmZ1bWVzfGVufDB8fDB8fHww'"
          :firstMessage="'Ustedite do'"
          :secondMessage="'na Ženske parfeme'"
          :discount="'25%'"
          @click="router.push('/parfumesDiscount/female')"></GlobalCard>
        <GlobalCard
          :imageSRC="'https://i.pinimg.com/736x/90/e8/cc/90e8ccb1212d59b142c1c33c20fe9b53.jpg'"
          :firstMessage="'Ustedite do'"
          :secondMessage="'na Unisex parfeme'"
          :discount="'20%'"
          @click="router.push('/parfumesDiscount/unisex')"></GlobalCard>
      </div>
      <!-- filter buttons -->
      <div class="filterButtons">
        <button
          @click="
            resetFilter();
            genderFilter = 'all';
          "
          :class="{ genderFilter: genderFilter === 'all' }">
          Svi parfemi
        </button>
        <button
          @click="filterFunction('male')"
          :class="{ genderFilter: genderFilter === 'male' }">
          Muški parfemi
        </button>
        <button
          @click="
            filterFunction('female');
            genderFilter = 'female';
          "
          :class="{ genderFilter: genderFilter === 'female' }">
          Ženski parfemi
        </button>
        <button
          @click="
            filterFunction('unisex');
            genderFilter = 'unisex';
          "
          :class="{ genderFilter: genderFilter === 'unisex' }">
          Unisex parfemi
        </button>
        <div class="filterDrop">
          <DropMenu
            @filterEmit="filterByBrand"
            @resetBrandEmit="resetBrand"></DropMenu>
        </div>
        <div class="mobileFilter">
          <MobileDropMenu
            @filterEmit="filterByBrand"
            @resetBrandEmit="resetBrand"></MobileDropMenu>
        </div>
      </div>
      <!-- product list -->
      <div class="productListWrapper">
        <ul class="productList">
          <li
            v-for="item in filteredParfumes"
            :key="item.id">
            <ProductCard
              :name="item.name"
              :brand="item.brand"
              :gender="item.gender"
              :price="item.price"
              :image="item.image"
              :sale="item.sale"
              :salePrice="item.salePrice"
              :new="item.new"
              :rating="item.rating"
              :volume="item.volume"
              :id="item.id"
              @add-to-cart="handleAddToCart"
              @navigate-to-single="navigateFunction"
              @add-to-favorites="handleAddToFavorites" />
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import SlideShow from "../components/SlideShow.vue";
import GlobalCard from "../global/GlobalCard.vue";
import ProductCard from "../components/card/ProductCard.vue";
import Header from "../components/Header.vue";
import DropMenu from "../components/DropMenu.vue";
import GlobalSpinner from "../global/GlobalSpinner.vue";
import ShopLogo from "../global/ShopLogo.vue";
import MobileDropMenu from "../components/MobileDropMenu.vue";
import addToCart from "../services/addToCart";
import getPerfumes from "../services/getPerfumes";
import callToast from "../services/callToast";
import handleSaving from "../services/savePerfume";

const router = useRouter();

const allParfumes = ref([]);
const filteredParfumes = ref([]);
const pageIsLoading = ref(true);

const activeBrandFilter = ref(false);
const genderFilter = ref("all");

const headerRef = ref();

async function fetchPerfumes() {
  await getPerfumes(allParfumes);
  if (allParfumes.value) {
    pageIsLoading.value = false;
  }
}

function filterFunction(filter) {
  genderFilter.value = filter;

  if (!activeBrandFilter.value) {
    filteredParfumes.value = allParfumes.value.filter(
      (item) => item.gender.toLowerCase() === filter.toLowerCase()
    );
  } else {
    filteredParfumes.value = allParfumes.value.filter(
      (item) =>
        item.gender.toLowerCase() === filter.toLowerCase() &&
        item.brand.toLowerCase() === activeBrandFilter.value.toLowerCase()
    );
  }
}

function resetFilter() {
  console.log(activeBrandFilter.value);

  if (activeBrandFilter.value) {
    filteredParfumes.value = allParfumes.value.filter(
      (item) =>
        item.brand.toLowerCase() === activeBrandFilter.value.toLowerCase()
    );
  } else {
    filteredParfumes.value = [...allParfumes.value];
  }
}

function filterByBrand(brand) {
  activeBrandFilter.value = brand;

  if (genderFilter.value !== "all") {
    filteredParfumes.value = allParfumes.value.filter(
      (item) =>
        item.gender.toLowerCase() === genderFilter.value.toLowerCase() &&
        item.brand.toLowerCase() === activeBrandFilter.value.toLowerCase()
    );
  } else {
    filteredParfumes.value = allParfumes.value.filter(
      (item) =>
        item.brand.toLowerCase() === activeBrandFilter.value.toLowerCase()
    );
  }
}

function resetBrand() {
  activeBrandFilter.value = false;

  if (genderFilter.value !== "all") {
    filteredParfumes.value = allParfumes.value.filter(
      (item) => item.gender.toLowerCase() === genderFilter.value.toLowerCase()
    );
  } else {
    filteredParfumes.value = [...allParfumes.value];
  }
}

function handleAddToCart(parfumeID) {
  addToCart(allParfumes, parfumeID, true);
}

function navigateFunction(parfumeID) {
  router.push(`/singlePerfum/${parfumeID}`);
}

function handleAddToFavorites(parfumeID) {
  const actionPerfume = allParfumes.value.find((item) => item.id === parfumeID);

  if (actionPerfume) {
    handleSaving(actionPerfume);
    triggerHeaderUpdate();
  } else {
    callToast("warning", "Nažalost došlo je do greške");
  }
}

// im updating savedPerfumes in Header here
function triggerHeaderUpdate() {
  headerRef.value?.updateSavedPerfumes();
}

watch(allParfumes, (newVal) => {
  filteredParfumes.value = [...newVal];
});

onMounted(() => {
  fetchPerfumes();
});
</script>

<style scoped>
.offerSection {
  min-height: 40vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wholeOfferTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.wholeOfferTitle span,
.wholeOfferTitle i {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

/* buttons */

.filterButtons {
  display: flex;
  gap: 15px;
  margin: 20px 0px;
  justify-content: center;
  position: relative;
}

.filterButtons button {
  padding: 10px 20px;
  font-size: 1rem;
  color: #333;
  background-color: #fff;
  border: 2px solid #333;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filterButtons button:hover {
  background-color: #333;
  color: #fff;
}
.filterButtons .genderFilter {
  background-color: #333;
  color: #fff;
}

.filterDrop {
  position: absolute;
  right: 22%;
}
/* active sales */

.activeSales {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  margin: 40px 0px;
}

/* producst list */
.productListWrapper {
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.productList {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0 auto;
}
@media (max-width: 1024px) {
  .productList {
    grid-template-columns: repeat(2, 1fr);
  }
  .filterDrop {
    right: 8%;
  }
}
@media (max-width: 768px) {
  .activeSales {
    gap: 20px;
  }
  .filterDrop {
    right: 5%;
  }
  .productListWrapper {
    padding: 0;
  }
  .filterButtons {
    gap: 10px;
    margin-bottom: 20px;
  }
  .filterButtons button {
    padding: 12px;
    font-size: 0.9rem;
  }
}

@media (max-width: 425px) {
  .productList {
    grid-template-columns: repeat(1, 1fr);
  }
  .filterButtons {
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 50px;
  }
  .filterButtons button {
    padding: 10px;
    white-space: nowrap;
    font-size: 0.9rem;
    font-weight: 600;
  }
  .filterDrop {
    top: 120%;
    right: 2%;
  }
}
@media (max-width: 375px) {
  .filterButtons button {
    padding: 15px 10px;
    font-weight: 600;
  }
}
@media (max-width: 320px) {
  .filterButtons {
    flex-direction: column;
    margin-bottom: 20px;
  }
  .filterButtons button {
    font-weight: 500;
  }
  .wholeOfferTitle span {
    white-space: nowrap;
    font-size: 23px;
  }
}
</style>
