<template>
  <div class="cardHoverMain">
    <img
      :src="props.imageSRC"
      alt="" />
    <div class="cardHoverText">
      <span>{{ props.firstMessage }}</span>
      <h3>{{ props.discount }}</h3>
      <span class="cardSmallerText">{{ props.secondMessage }}</span>
    </div>
    <div class="hoverWrapper"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  imageSRC: String,
  firstMessage: String,
  secondMessage: String,
  discount: String,
});
</script>

<style scoped>
.cardHoverMain {
  position: relative;
  height: 420px;
  width: 360px;
  overflow: hidden;
  background: #000;
}

.cardHoverMain img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.cardHoverText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 1;
  transition: opacity 0.3s ease;
  background: #000;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.cardHoverText span {
  color: #fff;
  white-space: nowrap;
  font-weight: 400;
}
.cardSmallerText {
  font-size: 1.2rem;
}
.cardHoverText h3 {
  font-size: 4rem;
}

.hoverWrapper {
  position: absolute;
  inset: 5%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #fff;
  opacity: 0;
  transform: scale(1);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.cardHoverMain:hover .hoverWrapper {
  opacity: 1;
  transform: scale(1);
}

.cardHoverMain:not(:hover) .hoverWrapper {
  animation: fadeOutShrink 0.4s forwards;
}

@keyframes fadeOutShrink {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}

@media (max-width: 768px) {
  .cardHoverMain {
    height: 350px;
    width: 300px;
  }
}

@media (max-width: 325px) {
  .cardHoverMain {
    height: 320px;
    width: 280px;
  }
}
</style>
