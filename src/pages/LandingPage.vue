<template>
  <section class="landingSection">
    <div class="landingImage">
      <img
        :src="`/src/assets/images/background/${imageSRC}`"
        alt="" />
    </div>
    <main class="landingMain">
      <div class="landingText">
        <h3 v-if="visible">{{ landingTitle }}</h3>
        <p v-if="visible">
          {{ landingDesc }}
        </p>
        <GlobalButton v-if="visible"></GlobalButton>
      </div>

      <div class="landingButtons">
        <button
          @click="
            handleChange(
              'chanel.jpg',
              'chanel',
              'Doživite Luksuz u svakom dahu',
              'Probudite čula i dopustite sebi da zasijate uz mirise stvorene za ljubitelje elegancije i stila'
            )
          "
          :class="{ active: activeButton === 'chanel' }"></button>
        <button
          @click="
            handleChange(
              'sauvagescreen.png',
              'sauvage',
              'Dior Sauvage',
              'Unesite samopouzdanje u svoj životni stil uz miris koji zrači snagom i autoritetom'
            )
          "
          :class="{ active: activeButton === 'sauvage' }"></button>
        <button
          @click="
            handleChange(
              'stronger.jpg',
              'stronger',
              'Emporio Armani Stronger With You',
              'Prigrlite snagu ljubavi i strasti sa mirisom koji odražava hrabrost i slobodan duh'
            )
          "
          :class="{ active: activeButton === 'stronger' }"></button>
        <button
          @click="
            handleChange(
              'versaga.png',
              'eros',
              'Versace Eros – Za one koji žive sa strašću',
              'Uronite u svet senzualnosti i snage uz miris inspirisan mitologijom i pravom muškošću'
            )
          "
          :class="{ active: activeButton === 'eros' }"></button>
      </div>
      <SocialButtons></SocialButtons>
    </main>
  </section>
</template>

<script setup>
import SocialButtons from "../components/SocialButtons.vue";
import GlobalButton from "../global/FancyButton.vue";
import { ref } from "vue";

const imageSRC = ref("chanel.jpg");
const activeButton = ref("chanel");
const landingTitle = ref("Doživite Luksuz u svakom dahu");
const landingDesc = ref(
  "Probudite čula i dopustite sebi da zasijate uz mirise stvorene za ljubitelje elegancije i stila"
);
const visible = ref(true);

function handleChange(imageSource, displayedButton, newTitle, newDesc) {
  visible.value = false;
  setTimeout(() => {
    visible.value = true;
  }, 200);

  imageSRC.value = imageSource;
  activeButton.value = displayedButton;

  landingTitle.value = newTitle;
  landingDesc.value = newDesc;
}
</script>

<style scoped>
.landingSection {
  position: relative;
  height: 100svh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.landingImage {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  animation: fade-in 0.5s;
}

.landingImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.landingMain {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  padding: 20px;
  box-sizing: border-box;
  z-index: 2;
}

.landingText {
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  margin-left: 130px;
}

.landingText h3 {
  opacity: 0;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  animation: animate 1s ease-in-out 0.3s 1 forwards;
}
.landingText p {
  opacity: 0;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
  animation: animate 1s ease-in-out 0.5s 1 forwards;
}

.landingText button {
  opacity: 0;
  margin: 0 auto;
  animation: animate 1s ease-in-out 0.7s 1 forwards;
}

.landingButtons {
  opacity: 0;
  position: absolute;
  right: 50%;
  bottom: 20px;
  z-index: 3;
  display: flex;
  gap: 10px;
  animation: fadeBottom 1s ease-in-out 0.7s 1 forwards;
}

.landingButtons button {
  width: 12px;
  height: 12px;
  background: #ffffff90;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.landingButtons button:hover {
  background: #fff;
}

.landingButtons button.active {
  background: rgb(48, 202, 253);
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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

@keyframes fadeBottom {
  from {
    opacity: 0;
    transform: translateY(100px);
    filter: blur(33px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@media (max-width: 1024px) {
  .landingMain {
    align-items: center;
  }
  .landingText {
    margin-right: 100px;
  }
  .landingButtons {
    right: 45%;
  }
}

@media (max-width: 768px) {
  .landingMain {
    align-items: center;
  }

  .landingText {
    margin: 0;
    max-width: 500px;
  }

  .landingText h3 {
    font-size: 1.5rem;
  }

  .landingText p {
    font-size: 1rem;
  }
}
@media (max-width: 425px) {
  .landingButtons {
    right: 40%;
  }
  .landingMain {
    padding: 0;
  }
}
</style>
