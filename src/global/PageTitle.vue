<template>
  <div class="pageTitle">
    <i class="fa-solid fa-minus"></i>
    <span class="pageTitleText">{{ props.title }} </span>
    <i class="fa-solid fa-minus"></i>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style scoped>
.pageTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.pageTitle span,
.pageTitle i {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

@media (max-width: 375px) {
  .pageTitle span {
    white-space: nowrap;
    font-size: 23px;
  }
}
</style>
