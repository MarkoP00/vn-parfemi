<template>
  <Header ref="headerRef"></Header>
  <SlideShow></SlideShow>
  <GlobalSpinner v-if="pageIsLoading"></GlobalSpinner>
  <section class="singleParfumeSection">
    <main class="singleParfumeMain">
      <div class="singleParfumeName">
        <span
          >{{ singleParfume.brand.toUpperCase() }} -
          {{ singleParfume.name }}</span
        >
        <div class="singleParfumeVolume">
          <span>({{ singleParfume.volume }}ml)</span>
        </div>
        <p
          :style="{
            color:
              singleParfume.gender === 'male'
                ? '#00BFFF'
                : singleParfume.gender === 'female'
                ? '#FF69B4'
                : '#32CD32',
          }"
        >
          {{
            singleParfume.gender === "unisex"
              ? "Unisex"
              : `for ${singleParfume.gender === "male" ? "men" : "women"}`
          }}
        </p>
      </div>
      <div class="singleParfumeInfo">
        <div class="singleParfumeImage">
          <img :src="singleParfume.image" alt="Perfume bottle" />
        </div>
        <div class="singleParfumeNotes">
          <p class="notesHeader">Mirisne note</p>
          <ul class="singleParfumeNoteList">
            <li
              v-for="note in singleParfume.notes"
              :key="note"
              :style="{ backgroundColor: getNoteColor(note) }"
              class="noteItem"
            >
              {{ note }}
            </li>
          </ul>

          <div class="singleParfumePriceWrapper">
            <div class="parfumePrice">
              <div class="singleParfumePrice">
                <span :class="{ sale: singleParfume.salePrice }">
                  {{ singleParfume.price }} RSD</span
                >
              </div>
              <div
                class="singleParfumeSalePrice"
                v-if="singleParfume.salePrice"
              >
                <span>Nova cena: {{ singleParfume.salePrice }} RSD</span>
              </div>
            </div>

            <div class="singleParfumeButtons">
              <GlobalButton
                :text="'Dodaj u korpu'"
                @click="handleAddToCart(singleParfume.id)"
              ></GlobalButton>
              <div class="likeButton">
                <button @click="toggleSave" v-if="!perfumeIsSaved">
                  <i class="fa-regular fa-heart"></i>
                </button>
                <button @click="toggleSave" v-if="perfumeIsSaved">
                  <i class="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="recommendations">
      <div class="recommendationTitle">
        <span>Preporučeno za vas</span>
      </div>

      <CardSlider
        :parfumes="recommendedParfumes"
        @add-to-favorites="handleSaving"
      ></CardSlider>
    </div>
  </section>
</template>

<script setup>
import "vue3-toastify/dist/index.css";
import GlobalSpinner from "../global/GlobalSpinner.vue";
import CardSlider from "../components/card/CardSlider.vue";
import Header from "../components/Header.vue";
import GlobalButton from "../global/GlobalButton.vue";
import SlideShow from "../components/SlideShow.vue";
import { noteColors } from "../parfumes/notes";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import getPerfumes from "../services/getPerfumes";
import addToCart from "../services/addToCart";
import handleSaving from "../services/savePerfume";

const route = useRoute();

const allParfumes = ref();
const savedPerfumes = ref(
  JSON.parse(localStorage.getItem("savedPerfumes")) || []
);

const perfumeIsSaved = ref(false);
const singleParfume = ref({
  brand: "",
  name: "",
  volume: 0,
  gender: "",
  image: "",
  notes: [],
  price: 0,
  salePrice: null,
  id: "",
});
const recommendedParfumes = ref();

const pageIsLoading = ref(true);
const headerRef = ref();

async function fetchPerfumes() {
  await getPerfumes(allParfumes);

  if (allParfumes.value) {
    filterSinglePerfum(route.params.id);

    pageIsLoading.value = false;
    recommendedParfumes.value = getRecommendedPerfumes();
  }
  checkSavedStatus();
}

function filterSinglePerfum(perfumeID) {
  singleParfume.value = allParfumes.value.find(
    (item) => item.id === perfumeID
  ) || {
    brand: "",
    name: "",
    volume: 0,
    gender: "",
    image: "",
    notes: [],
    price: 0,
    salePrice: null,
    id: 0,
  };
}

function handleAddToCart(parfumeID) {
  addToCart(allParfumes, parfumeID, true);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getNoteColor(note) {
  return noteColors[note] || "#ccc";
}

function getRecommendedPerfumes() {
  return shuffleArray(
    allParfumes.value.filter(
      (parfume) =>
        parfume.name !== singleParfume.value.name &&
        parfume.gender === singleParfume.value.gender
    )
  ).slice(0, 15);
}

function toggleSave() {
  handleSaving(singleParfume.value);
  perfumeIsSaved.value = !perfumeIsSaved.value;

  // refreshing savedPerfumes
  savedPerfumes.value = JSON.parse(localStorage.getItem("savedPerfumes")) || [];
  checkSavedStatus();
  triggerHeaderUpdate();
}

function checkSavedStatus() {
  const savedPerfume = savedPerfumes.value.some(
    (item) => item.id === singleParfume.value.id
  );
  perfumeIsSaved.value = savedPerfume;
}

// im updating savedPerfumes in Header here
function triggerHeaderUpdate() {
  headerRef.value?.updateSavedPerfumes();
}

watch(
  () => route.params.id,
  (newID) => {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });

    pageIsLoading.value = true;
    filterSinglePerfum(newID);

    recommendedParfumes.value = shuffleArray(
      allParfumes.value.filter(
        (parfume) =>
          parfume.name !== singleParfume.value.name &&
          parfume.gender === singleParfume.value.gender
      )
    ).slice(0, 15);
    pageIsLoading.value = false;
    checkSavedStatus();
  }
);

onMounted(() => {
  fetchPerfumes();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<style scoped>
.singleParfumeSection {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
}

.singleParfumeMain {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  padding: 20px 80px;
  border-radius: 12px;
}

.singleParfumeName {
  text-align: center;
}
.singleParfumeName span {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}
.singleParfumeName p {
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 5px;
}

.singleParfumeInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
}
.singleParfumeImage {
  min-width: 450px;
  max-width: 500px;
  min-height: 400px;
  max-height: 500px;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.singleParfumeImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.singleParfumeNotes {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.notesHeader {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
}
.singleParfumeNoteList {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.noteItem {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  color: #000;
  font-weight: 600;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  list-style: none;
  cursor: pointer;
}
.noteItem:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.singleParfumePriceWrapper {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.singleParfumePrice {
  padding: 5px;
  border-radius: 6px;
  background: rgb(51, 51, 51);
  color: #fff;
  text-align: center;
  width: 100%;
}
.singleParfumeSalePrice {
  padding: 5px;
}
.singleParfumeSalePrice span {
  color: red;
  font-weight: 600;
}
.parfumePrice {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 1.1rem;
  font-weight: 600;
  gap: 5px;
}

.sale {
  text-decoration: line-through;
  text-decoration-color: red;
}

.singleParfumeVolume span {
  font-size: 20px;
  color: #5f5c5c;
}

.singleParfumeButtons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.likeButton {
  display: flex;
  justify-content: center;
  align-items: center;
}

.likeButton button {
  background-color: #f5f5f5;
  border: 2px solid #e0e0e0;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.likeButton button i {
  font-size: 20px;
  color: #ff6b6b;
  transition: color 0.3s ease;
}

.likeButton button:hover {
  background-color: #ff6b6b;
  border-color: #ff4d4d;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
}

.likeButton button:hover i {
  color: #fff;
}

.likeButton button:active {
  transform: scale(0.95);
}

.recommendations {
  width: 100%;
  margin-top: 50px;
}

.recommendationTitle {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}
@media (max-width: 770px) {
  .singleParfumeInfo {
    flex-direction: column;
  }
  .singleParfumeMain {
    max-width: 600px;
  }
  .singleParfumeInfo {
    gap: 50px;
    text-align: center;
  }
}

@media (max-width: 500px) {
  .singleParfumeMain {
    padding: 20px 40px;
  }
  .parfumePrice {
    justify-content: center;
  }
  .singleParfumeButtons {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  .singleParfumeImage {
    min-width: 250px;
    min-height: 300px;
  }
}

@media (max-width: 380px) {
  .singleParfumeMain {
    padding: 20px;
  }
}

@media (max-width: 325px) {
  .singleParfumeImage {
    width: 250px;
    height: 300px;
  }
}
</style>
