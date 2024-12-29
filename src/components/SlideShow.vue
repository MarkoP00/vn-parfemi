<template>
  <!-- 
   -->
  <!-- https://brandedperfume.com/media/magefan_blog/Mancera_-_1920x1080.jpg -->
  <main>
    <div class="slideShowWrapper">
      <div class="wrapperImage">
        <img
          src="https://fimgs.net/himg/o.EWLqhnkZnG9.png"
          alt="" />
      </div>
      <div class="wrapperImage">
        <img
          src="https://images.bloomingdalesassets.com/is/image/MacysInc/TF_Bloomingdales_Hero_SignatureGifting_1400x400_TFLogo_1674664017133?resMode=sharp2&fmt=jpeg&wid=1400&hei=400"
          alt="" />
      </div>
      <div class="wrapperImage">
        <img
          src="https://www.fragranceusa.com/cdn/shop/files/bf_banner.jpg?v=1730295575&width=3840"
          alt="" />
      </div>
      <div class="wrapperImage">
        <img
          src="https://static.vecteezy.com/system/resources/previews/033/652/187/large_2x/kharkiv-ukraine-january-2-2021-many-fragrance-perfume-bottles-of-various-famous-brands-of-perfume-manufacturers-on-dark-background-free-photo.JPG"
          alt="" />
      </div>
    </div>
  </main>
</template>

<script setup></script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.slideShowWrapper {
  width: 100%;
  height: 50vh;
  overflow: hidden;
  position: relative;
}

.slideShowWrapper > .wrapperImage {
  width: 100%;
  height: 100%;
  position: absolute;
  animation: animate 20s infinite;
  /* animation: animate 25s infinite; */
  opacity: 0;
}
.slideShowWrapper .wrapperImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.slideShowWrapper > .wrapperImage:nth-child(2) {
  animation-delay: 5s;
}
.slideShowWrapper > .wrapperImage:nth-child(3) {
  animation-delay: 10s;
}
.slideShowWrapper > .wrapperImage:nth-child(4) {
  animation-delay: 15s;
}
/* .slideShowWrapper > .wrapperImage:nth-child(5) {
  animation-delay: 20s;
} */

@keyframes animate {
  10% {
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  40% {
    transform: scale(1.1);
  }
  10% {
    opacity: 1;
  }
}
</style>
