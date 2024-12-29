<template>
  <div class="container">
    <a href="https://www.facebook.com/profile.php?id=100008318868991">
      <i class="fa-brands fa-facebook"></i>
    </a>
    <a href="https://www.instagram.com/aca0908/">
      <i class="fab fa-instagram"></i>
    </a>
    <a href="https://www.youtube.com/@aleksandarpetrovic3531">
      <i class="fab fa-youtube yt"></i>
    </a>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  position: absolute;
  width: 65px;
  top: 43%;
  right: 0%;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeRight 1s ease-in-out 0.3s 1 forwards;
}

.container a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  text-decoration: none;
  transition: all 0.3s;
  color: #fff;
}

.container a i {
  font-size: 30px;
}

.container a:hover {
  transform: scale(1.2);
}

@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(200px);
    filter: blur(33px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

@media (max-width: 1024px) {
  .container {
    display: none;
  }
}
</style>
