<template>
  <header ref="headerRef">
    <div class="logo" @click="() => router.push('/mainPage')">
      <img src="/src/assets/images/logo/logo.png" alt="" />
    </div>

    <!-- <div v-if="allPerfumes">
      <InputSearch @search-emit="handleSearch"></InputSearch>
    </div> -->

    <ul class="headerList">
      <li @click="() => router.push('/mainPage')">
        <span>Početna</span>
      </li>
      <li @click="() => router.push('/wholeOffer')">
        <span>Ponuda</span>
      </li>
      <li @click="() => router.push('/discounts')">
        <span>Akcije</span>
      </li>
      <li @click="() => router.push('/cart')">
        <span>Korpa</span>
      </li>
      <li @click="toggleSavedPerfumesWindow" class="saveIndicator">
        <button>
          <i class="fa-solid fa-heart"></i>
        </button>
        <p v-if="Array.isArray(savedPerfumes) && savedPerfumes.length > 0">
          {{ savedPerfumes.length }}
        </p>
      </li>
    </ul>
    <div class="mobileHamburger">
      <div class="icon">
        <i
          v-if="!hamburgerMenuVisible"
          class="fa-solid fa-bars"
          @click="toggleHamburger"
        ></i>
        <i v-else class="fa-solid fa-xmark" @click="toggleHamburger"></i>
        <div class="mobileSavedPerfumes">
          <li @click="toggleSavedPerfumesWindow" class="saveIndicator">
            <button>
              <i class="fa-solid fa-heart"></i>
            </button>
            <p v-if="Array.isArray(savedPerfumes) && savedPerfumes.length > 0">
              {{ savedPerfumes.length }}
            </p>
          </li>
        </div>
      </div>
      <Transition name="fade">
        <div
          class="mobileList"
          v-if="hamburgerMenuVisible"
          :class="{ menuVisible: hamburgerMenuVisible }"
        >
          <ul>
            <li @click="() => router.push('/mainPage')">
              <span>Početna</span>
            </li>
            <li @click="() => router.push('/wholeOffer')">
              <span>Ponuda</span>
            </li>
            <li @click="() => router.push('/discounts')">
              <span>Akcije</span>
            </li>
            <li @click="() => router.push('/cart')">
              <span>Korpa</span>
            </li>
            <div class="mobileSocial">
              <li
                @click="
                  navigation(
                    'https://www.facebook.com/profile.php?id=100008318868991'
                  )
                "
              >
                <span><i class="fa-brands fa-facebook"></i></span>
              </li>

              <li @click="navigation('https://www.instagram.com/aca0908/')">
                <span>
                  <i class="fab fa-instagram"></i>
                </span>
              </li>
              <li
                @click="
                  navigation('https://www.youtube.com/@aleksandarpetrovic3531')
                "
              >
                <span>
                  <i class="fab fa-youtube yt"></i>
                </span>
              </li>
            </div>
          </ul>
        </div>
      </Transition>
    </div>

    <!-- saved perfumes list -->
    <div class="savedPerfumesWrapper" v-if="savedPerfumesVisible">
      <ul v-if="Array.isArray(savedPerfumes) && savedPerfumes.length > 0">
        <li
          v-for="item in savedPerfumes"
          :key="item.id"
          @click="navigateToSinglePerfume(item.id)"
        >
          <div class="singlePerfumeImage">
            <img :src="item.image" alt="" />
          </div>
          <div class="singlePerfumeData">
            <div class="singleBrand">
              <h3>{{ item.brand }}</h3>
              <div class="likeButton" @click.stop>
                <button @click="removeFromSaved(item.id)">
                  <i class="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
            <div class="singleName">
              <span>{{ item.name }}</span>
            </div>
            <div class="singleVolume">
              <span>{{ item.volume }}ml</span>
            </div>
          </div>
        </li>
      </ul>
      <p v-else>Trenutno nema sačuvanih parfema</p>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();

const headerRef = ref(null);
const hamburgerMenuVisible = ref(false);

const savedPerfumes = ref(
  JSON.parse(localStorage.getItem("savedPerfumes")) || []
);
const savedPerfumesVisible = ref(false);

function toggleHamburger() {
  savedPerfumesVisible.value = false;
  hamburgerMenuVisible.value = !hamburgerMenuVisible.value;
}

function toggleSavedPerfumesWindow() {
  hamburgerMenuVisible.value = false;

  savedPerfumes.value = JSON.parse(localStorage.getItem("savedPerfumes"));
  savedPerfumesVisible.value = !savedPerfumesVisible.value;
}

function removeFromSaved(id) {
  const actionPerfume = savedPerfumes.value.find((item) => item.id === id);

  if (actionPerfume) {
    savedPerfumes.value = savedPerfumes.value.filter(
      (item) => item.id !== actionPerfume.id
    );

    toast.dark("Parfem uklonjen iz sačuvanih", {
      type: "info",
      class: "Toastify__toast-container--top-custom",
      autoClose: 2500,
    });
  }

  localStorage.setItem("savedPerfumes", JSON.stringify(savedPerfumes.value));
}

function updateSavedPerfumes() {
  savedPerfumes.value = JSON.parse(localStorage.getItem("savedPerfumes")) || [];
}

function navigation(link) {
  window.location.href = link;
}

function navigateToSinglePerfume(id) {
  savedPerfumesVisible.value = false;
  router.push(`/singlePerfum/${id}`);
}

watch(savedPerfumes, (newVal) => {
  savedPerfumes.value = newVal;
});

defineExpose({
  updateSavedPerfumes,
});
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.6s;
  padding: 0 50px;
  z-index: 100;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.6);
}

header img {
  height: 100px;
  width: 110px;
  margin: 5px;
  cursor: pointer;
}

.headerList {
  display: flex;
  justify-content: center;
  align-items: center;
}

.headerList li {
  list-style: none;
}

.headerList li span {
  margin: 0 15px;
  text-decoration: none;
  color: #fff;
  letter-spacing: 2px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  transition: color 0.6s;
  cursor: pointer;
}

.headerList li span::before {
  content: "";
  position: absolute;
  width: 0%;
  height: 3px;
  bottom: -30%;
  left: 0;
  background-color: #008cff;
  transition: width 0.6s;
  border-radius: 20px;
}

.headerList li span:hover::before {
  width: 100%;
}

.headerList li span:hover {
  color: #008cff;
}

.mobileHamburger {
  display: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  z-index: 101;
  transition: all 0.3s;
}

.mobileHamburger .icon {
  position: relative;
  padding: 10px;
}

.mobileSavedPerfumes {
  position: absolute;
  left: -100%;
  top: 25%;
}
.mobileList {
  flex-direction: column;
  position: absolute;
  top: 100%;
  width: 20%;
  right: 0;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px;
  z-index: 100;
  transform: translateX(-200px);
  transition: all 0.3s;
  animation: fade-in 0.3s;
  border-bottom-left-radius: 20px;
}

.menuVisible {
  transform: translateX(0);
}

header.sticky .mobileList {
  width: 100%;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.8);
}

.mobileList ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
}

.mobileList ul li {
  margin: 10px 0;
  border: 1px solid #fff;
  padding: 10px;
  background-color: rgb(22, 147, 230, 0.5);
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  position: relative;
}

.mobileList ul li span,
.mobileSocial a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  letter-spacing: 2px;
  transition: 0.3s;
}

.mobileList ul li button {
  background: none;
  font-weight: 600;
}
.mobileHamburger.active + .mobileList {
  display: flex;
  animation: slideDown 0.4s ease forwards;
}

.mobileSocial li i {
  font-size: 20px;
  padding: 5px;
}

/* savedPerfumesWrapper */
.savedPerfumesWrapper {
  position: absolute;
  top: 120%;
  right: 50px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  width: 400px;
  max-height: 400px;
  overflow-y: auto;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  transform: translateY(-20px);
  z-index: 101;
  animation: animate 0.3s;
}

.savedPerfumesWrapper.visible {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

.savedPerfumesWrapper ul {
  padding: 10px;
  list-style-type: none;
  margin: 0;
}

.savedPerfumesWrapper li {
  display: flex;
  justify-content: start; /* space-between */
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.savedPerfumesWrapper li:hover {
  background: #c8c7c7;
  cursor: pointer;
}

.savedPerfumesWrapper p {
  padding: 10px;
  text-align: center;
  font-weight: 600;
}
.singlePerfumeImage img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
  object-fit: cover;
}

.singlePerfumeData {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-left: 10px;
}

.singleBrand {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  color: #716f6f;
}

.singleName {
  color: #000;
  font-weight: 600;
}
/* like button */

.likeButton button {
  background-color: #ff6b6b;
  border: 1px solid #ff4d4d;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.likeButton button i {
  font-size: 18px;
  color: #fff;
  transition: color 0.3s ease;
}

.likeButton button:hover {
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
}

/* saveIndicator */

.saveIndicator {
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  cursor: pointer;
  position: relative;
}

.saveIndicator button {
  padding: 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #fff;
  cursor: pointer;
  position: relative;
}

.saveIndicator i {
  font-size: 24px;
  color: #000;
  transition: transform 0.3s ease;
}

.saveIndicator:hover i {
  transform: scale(1.2);
}

.saveIndicator p {
  font-size: 14px;
  background-color: #e41c1c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: absolute;
  right: -30%;
  top: -20%;
}

@media (max-width: 1024px) {
  .headerList {
    display: none;
  }

  .mobileHamburger {
    display: block;
  }
}

@media (max-width: 930px) {
  .mobileList {
    width: 30%;
  }
  .mobileSocial {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
}
@media (max-width: 670px) {
  .mobileList {
    width: 40%;
  }
}

@media (max-width: 426px) {
  header {
    padding: 0 40px 0 40px;
  }
  .mobileList {
    padding: 10px 10px;
  }
  .mobileList ul li {
    border: 1px solid #fff;
    padding: 10px;
    background-color: rgb(22, 147, 230, 0.7);
    border-radius: 10px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mobileList {
    width: 100%;
  }

  .mobileList ul li i {
    font-size: 25px;
  }

  .mobileList ul li span {
    font-size: 1.1rem;
  }
  .savedPerfumesWrapper {
    left: 3%;
  }
}

@media (max-width: 400px) {
  header {
    padding: 5px 10px 5px 10px;
  }
  .mobileList ul li i {
    font-size: 20px;
  }
  .savedPerfumesWrapper {
    width: 350px;
    left: 6%;
  }
  .savedPerfumesWrapper ul {
    padding: 0;
  }
}
@media (max-width: 376px) {
  .savedPerfumesWrapper {
    left: 3%;
  }
}
@media (max-width: 325px) {
  header.sticky .mobileSocial {
    gap: 10px;
  }
  .mobileSocial li i {
    font-size: 15px;
    padding: 4px;
  }
  .savedPerfumesWrapper {
    width: 300px;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(200px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes animate {
  from {
    opacity: 0;
    transform: translate(0, 100px);
    filter: blur(33px);
  }

  to {
    opacity: 1;
    transform: translate(0);
    filter: blur(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
