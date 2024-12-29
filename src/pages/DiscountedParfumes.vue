<template>
  <section>
    <main>
      <Header ref="headerRef"></Header>
      <SlideShow></SlideShow>
      <GlobalSpinner v-if="pageIsLoading"></GlobalSpinner>
      <div class="topSide">
        <ShopLogo></ShopLogo>
        <!-- title -->
        <div class="pageTitle">
          <i class="fa-solid fa-minus"></i>
          <span class="pageTitleText"
            >{{ genderTitle }} parfemi na popustu</span
          >
          <i class="fa-solid fa-minus"></i>
        </div>
      </div>
      <!-- delivery -->
      <div class="deliveryMain">
        <div class="deliveryText">
          <div class="deliveryTop">
            <i class="fa-solid fa-truck"></i>
          </div>
          <div class="deliveryBottom">
            <span class="deliveryHighlight"
              >Poručite još danas i uživajte u
            </span>
            <strong>besplatnoj dostavi!</strong>
            <span>
              Važi za sve porudžbine preko <strong>10.000 RSD</strong>. Ne
              propustite priliku da uštedite!</span
            >
          </div>
        </div>
      </div>
      <!-- product list -->
      <div
        class="productListWrapper"
        v-if="!allParfumes || allParfumes.length">
        <ul class="productList">
          <li
            v-for="item in parfumesArray"
            :key="item.name">
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
      <div
        class="fallBackText"
        v-else>
        <p>Došlo je do greške. Molim vas osvežite stranicu</p>
      </div>
    </main>
  </section>
</template>

<script setup>
import Header from "../components/Header.vue";
import ShopLogo from "../global/ShopLogo.vue";
import SlideShow from "../components/SlideShow.vue";
import ProductCard from "../components/card/ProductCard.vue";
import GlobalSpinner from "../global/GlobalSpinner.vue";
import { ref, watch, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import addToCart from "../services/addToCart";
import handleSaving from "../services/savePerfume";
import callToast from "../services/callToast";

const route = useRoute();
const router = useRouter();

const allParfumes = ref([]);
const parfumesArray = ref([]);

const pageIsLoading = ref(true);

const headerRef = ref();

async function getPerfumes() {
  const convertedPerfumes = [];
  try {
    const response = await fetch(
      "https://vn-parfemi-default-rtdb.firebaseio.com/.json"
    );
    if (response.ok) {
      const responseData = await response.json();

      Object.values(responseData).forEach((brand) => {
        Object.entries(brand).forEach(([key, perfume]) => {
          const perfumeWithId = Array.isArray(perfume)
            ? { ...perfume[0], id: key }
            : { ...perfume, id: key };
          convertedPerfumes.push(perfumeWithId);
        });
      });

      allParfumes.value = [...convertedPerfumes];
      filterFunction();
    }
  } catch (error) {
    console.error("New error", error);
  }
  pageIsLoading.value = false;
}

function handleAddToCart(parfumeID) {
  addToCart(parfumesArray, parfumeID, true);
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

function filterFunction() {
  const gender = route.params.gender;

  parfumesArray.value = allParfumes.value.filter(
    (item) => item.gender === gender && item.sale === true
  );
}

function navigateFunction(parfumeID) {
  router.push(`/singlePerfum/${parfumeID}`);
}

const genderTitle = computed(() => {
  switch (route.params.gender) {
    case "male":
      return "Muški";
    case "female":
      return "Ženski";
    case "unisex":
      return "Unisex";
    default:
      return "Parfemi";
  }
});

// im updating savedPerfumes in Header here
function triggerHeaderUpdate() {
  headerRef.value?.updateSavedPerfumes();
}

watch(() => route.params.gender, filterFunction, { immediate: true });

onMounted(() => {
  getPerfumes();
});
</script>

<style scoped>
.topSide {
  margin: 40px 0px;
}
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

.pageTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.pageTitle span,
.pageTitle i {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}
/* delivery */
.deliveryMain {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 2px solid #2196f3;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
}

.deliveryText {
  color: #333;
  font-family: "Arial", sans-serif;
}

.deliveryTop {
  font-size: 3rem;
  color: #2196f3;
  margin-bottom: 10px;
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.deliveryBottom {
  font-size: 1.2rem;
  line-height: 1.6;
}

.deliveryHighlight {
  color: #333;
  font-weight: bold;
}

strong {
  color: #e91e63;
}

.fallBackText {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
@media (max-width: 1024px) {
  .productList {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 425px) {
  .productList {
    grid-template-columns: repeat(1, 1fr);
  }
  .pageTitle span,
  .pageTitle i {
    font-size: 23px;
    font-weight: bold;
    color: #333;
  }
}
@media (max-width: 320px) {
  .pageTitle span {
    white-space: nowrap;
    font-size: 18px;
  }
}
</style>
