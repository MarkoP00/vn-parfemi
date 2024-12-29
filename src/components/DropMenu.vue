<template>
  <div
    class="navigation"
    :class="menuVisible ? 'active' : ''">
    <div
      class="menuToggle"
      @click="toggleMenu"
      :class="menuVisible ? 'active' : ''">
      <i
        class="fa-solid fa-caret-down"
        :class="menuVisible ? 'activeMenu' : ''"></i>
    </div>
    <ul v-if="menuVisible">
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
const menuVisible = ref(false);
const activeFilter = ref("svi brendovi");

const brands = ["Armani", "Azzaro", "Versace", "Mancera", "Tom Ford", "D&G"];

function applyFilter(filter) {
  activeFilter.value = filter;
  emits("filterEmit", filter);
  menuVisible.value = false;
}

function toggleMenu() {
  menuVisible.value = !menuVisible.value;
}
</script>

<style scoped>
.navigation {
  position: absolute;
  right: 25%;
  width: 50px;
  height: 50px;
  background: #fff;
  z-index: 15;
  border-radius: 4px;
  overflow: hidden;
  transition: width 0.5s, height 0.5s;
  transition-delay: 0s, 0.5s;
}
.navigation.active {
  width: 250px;
  height: 350px;
  transition: height 0.5s, width 0.5s;
  transition-delay: 0s, 0.5s;
  overflow-y: scroll;
}
.navigation.active::-webkit-scrollbar {
  width: 5px;
}

.navigation.active::-webkit-scrollbar-thumb {
  background: #2196f3;
  border-radius: 10px;
}

.navigation.active::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.navigation .menuToggle {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: rgb(33, 150, 243);
  /* background: rgb(33, 150, 243, 0.2); */
  transition: 0.5s;
  cursor: pointer;
}
.navigation .menuToggle.active {
  background: #2196f3;
}
.navigation .menuToggle i {
  position: absolute;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 50px;
  height: 50px;
  transition: 0.5s;
}
.activeMenu {
  transform: rotate(180deg);
}

.navigation ul {
  position: absolute;
  left: 0;
  width: 100%;
}
.navigation ul li {
  position: relative;
  list-style: none;
  width: 100%;
  cursor: pointer;
  animation: fade-in 1s ease-in;
}

.navigation ul li:hover {
  background-color: #03a9f4;
}
.navigation ul .activeFilter {
  background-color: #03a9f4;
  color: #fff;
}
.navigation ul li .title {
  position: relative;
  display: block;
  line-height: 50px;
  white-space: nowrap;
  text-align: center;
  text-transform: uppercase;
}
.navigation ul li:hover .title {
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
  .navigation {
    display: none;
    visibility: hidden;
    opacity: 0;
  }
}
</style>
