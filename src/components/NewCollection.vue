<template>
  <Header ref="headerRef"></Header>
  <section class="newCollectionSection">
    <main class="newCollectionMain">
      <div class="newCollectionTop">
        <ShopLogo></ShopLogo>
        <PageTitle :title="'Novo u ponudi'"></PageTitle>
      </div>
      <div class="newCollectionBottom">
        <CardSlider
          :parfumes="newParfumes"
          @add-to-favorites="handleSavingFunction"></CardSlider>
      </div>

      <div class="activeSales">
        <GlobalCard
          @click="router.push('/parfumesDiscount/male')"
          :imageSRC="'https://i.pinimg.com/736x/86/da/41/86da41942a89df8efed6ec382a40a702.jpg'"
          :firstMessage="'Ustedite do'"
          :secondMessage="'Muski parfemi'"
          :discount="'20%'"></GlobalCard>
        <GlobalCard
          @click="router.push('/parfumesDiscount/female')"
          :imageSRC="'https://images.unsplash.com/photo-1701291927826-c7775869d822?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcmZ1bWVzfGVufDB8fDB8fHww'"
          :firstMessage="'Ustedite do'"
          :secondMessage="'Zenski parfemi'"
          :discount="'25%'"></GlobalCard>
        <GlobalCard
          @click="router.push('/parfumesDiscount/unisex')"
          :imageSRC="'https://i.pinimg.com/736x/90/e8/cc/90e8ccb1212d59b142c1c33c20fe9b53.jpg'"
          :firstMessage="'Ustedite do na'"
          :secondMessage="'Parfeme iz nove ponude'"
          :discount="'20%'"></GlobalCard>
      </div>

      <div class="forHer">
        <div class="forHerTitle">
          <span>Parfemi za nju</span>
        </div>
        <CardSlider
          :parfumes="femaleParfumes"
          @add-to-favorites="handleSavingFunction"></CardSlider>
      </div>
      <div class="forHim">
        <div class="forHimTitle">
          <span>Parfemi za njega</span>
        </div>
        <CardSlider
          :parfumes="maleParfumes"
          @add-to-favorites="handleSavingFunction"></CardSlider>
      </div>
    </main>
  </section>
</template>

<script setup>
import CardSlider from "./card/CardSlider.vue";
import ShopLogo from "../global/ShopLogo.vue";
import PageTitle from "../global/PageTitle.vue";
import GlobalCard from "../global/GlobalCard.vue";
import getPerfumes from "../services/getPerfumes";
import handleSaving from "../services/savePerfume";
import Header from "./Header.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const allParfumes = ref();
const maleParfumes = ref();
const femaleParfumes = ref();
const newParfumes = ref();

const headerRef = ref();

async function fetchPerfumes() {
  await getPerfumes(allParfumes);
  updateFilteredPerfumes();
}

function updateFilteredPerfumes() {
  if (!allParfumes.value) return;

  maleParfumes.value = allParfumes.value.filter(
    (item) => item.gender.toLowerCase() === "male"
  );
  femaleParfumes.value = allParfumes.value.filter(
    (item) => item.gender.toLowerCase() === "female"
  );
  newParfumes.value = allParfumes.value
    .filter((item) => item.new === true)
    .slice(0, 12);
}

function handleSavingFunction(perfume) {
  handleSaving(perfume);
  triggerHeaderUpdate();
}

// im updating savedPerfumes in Header here
function triggerHeaderUpdate() {
  headerRef.value?.updateSavedPerfumes();
}

onMounted(() => {
  fetchPerfumes();
});
</script>

<style scoped>
.newCollectionSection {
  padding: 40px 20px;
  background-color: #f9f9f9;
}

.newCollectionMain {
  max-width: 1600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shopLogo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.newCollectionTop {
  text-align: center;
}
.newCollectionTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.newCollectionTitle span,
.forHerTitle span,
.forHimTitle span,
.newCollectionTitle i {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

/* .filterButtons {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
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
} */

.newCollectionBottom {
  margin: 10px 0px 60px 0px;
  width: 100%;
}
.activeSales {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.forHer,
.forHim {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 65vh;
}
.forHerTitle span,
.forHimTitle span {
  color: #333;
}
@media (max-width: 768px) {
  .activeSales {
    gap: 20px;
  }
}
</style>
