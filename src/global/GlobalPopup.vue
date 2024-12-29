<template>
  <section
    class="popupSection"
    @click="handleEmit('popup-cancel')">
    <transition name="fadeIn">
      <main
        @click.stop
        v-if="popupVisible">
        <div class="popupTitle">{{ props.popupTitle }}</div>
        <div class="popupMessage">{{ props.popupMessage }}</div>
        <div
          class="popupSingleButton"
          v-if="props.singleButton">
          <GlobalButton
            :text="'U redu'"
            @click="handleEmit('popup-cancel')"></GlobalButton>
        </div>
        <div
          class="popupActionButtons"
          v-else>
          <button
            class="closeButton"
            @click="handleEmit('popup-cancel')">
            Ne
          </button>
          <GlobalButton
            :text="'Da'"
            @click="handleEmit('popup-confirm')"></GlobalButton>
        </div>
      </main>
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import GlobalButton from "./GlobalButton.vue";

const popupVisible = ref(null);
const props = defineProps({
  popupTitle: String,
  popupMessage: String,
  singleButton: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["popup-confirm", "popup-close"]);

function handleEmit(event) {
  setTimeout(() => {
    emit(event);
  }, 500);
  popupVisible.value = false;
}

onMounted(() => {
  popupVisible.value = true;
});
</script>

<style scoped>
.popupSection {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popupSection main {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 450px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.popupTitle {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  position: relative;
  padding-bottom: 10px;
}

.popupTitle::after {
  content: "";
  display: block;
  width: 50px;
  height: 3px;
  background: #3498db;
  margin: 0 auto;
  border-radius: 2px;
}

.popupMessage {
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
}

.popupSingleButton {
  display: flex;
  justify-content: center;
}

.popupActionButtons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.popupActionButtons button {
  font-size: 16px;
}
.closeButton {
  background: #f7f7f7;
  border: 1px solid #000;
  color: #000;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 50%;
}

.closeButton:hover {
  background: #e74c3c;
  color: white;
}

.fadeIn-enter-from,
.fadeIn-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: all 0.5s;
}
.fadeIn-enter-to,
.fadeIn-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
