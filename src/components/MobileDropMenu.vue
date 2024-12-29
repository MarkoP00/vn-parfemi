<template>
  <div class="navigationMobile active">
    <div class="menuToggle">
      <span>Filteri</span>
    </div>
    <ul>
      <li
        @click="
          emits('resetBrandEmit');
          activeFilter = 'svi brendovi';
        "
        :class="{ activeFilter: activeFilter === 'svi brendovi' }">
        <span class="title">Svi Brendovi</span>
      </li>
      <li
        v-for="brand in brands"
        :key="brand"
        @click="applyFilter(brand)"
        :class="{ activeFilter: activeFilter === brand }">
        <span class="title">{{ brand }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emits = defineEmits(["filterEmit", "resetBrandEmit"]);
const activeFilter = ref("svi brendovi");

const brands = ["Armani", "Azzaro", "Versace", "Mancera", "Tom Ford", "D&G"];

function applyFilter(filter) {
  activeFilter.value = filter;
  emits("filterEmit", filter);
}
</script>

<style scoped>
.navigationMobile {
  width: 100%;
  height: 50px;
  background: #fff;
  z-index: 10;
  border-radius: 4px;
  overflow: hidden;
  transition: width 0.5s, height 0.5s;
  transition-delay: 0s, 0.5s;
  display: none;
  opacity: 0;
  visibility: hidden;
}
.navigationMobile.active {
  height: 350px;
  width: 100%;
  transition: height 0.5s, width 0.5s;
  transition-delay: 0s, 0.5s;
  overflow-y: scroll;
}

.navigationMobile .menuToggle {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #13719c;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: 0.5s;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
}
.navigationMobile ul {
  height: 320px;
  width: 100%;
  overflow-y: scroll;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.navigationMobile ul li {
  position: relative;
  list-style: none;
  width: 100%;
  cursor: pointer;
  animation: fade-in 1s ease-in;
  background: #fff;
}

.navigationMobile ul li:hover {
  background-color: #03a9f4;
}
.navigationMobile ul .activeFilter {
  background-color: rgb(3, 169, 244);
  color: #fff;
}
.navigationMobile ul li .title {
  position: relative;
  display: block;
  line-height: 50px;
  white-space: nowrap;
  text-align: center;
  text-transform: uppercase;
}
.navigationMobile ul li:hover .title {
  color: #fff;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 425px) {
  .navigationMobile {
    display: inline;
    opacity: 1;
    visibility: visible;
  }
}
</style>
