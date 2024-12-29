<template>
  <Header></Header>
  <SlideShow></SlideShow>
  <section>
    <ShopLogo></ShopLogo>
    <PageTitle :title="'Parfemi na popustu'"></PageTitle>
    <main class="discountMain">
      <GlobalCard
        :imageSRC="'https://www.armanibeauty.sa/dw/image/v2/BFZH_PRD/on/demandware.static/-/Sites-armanibeauty-master-catalog/default/dw4186682b/Pink/ww-acqua-di-gio-parfum/LE177300-F2.jpg?sw=1200&sh=1200'"
        :firstMessage="'Uštedite do'"
        :secondMessage="'na Muške parfeme'"
        :discount="'20%'"
        @click="router.push('/parfumesDiscount/male')"></GlobalCard>
      <GlobalCard
        :imageSRC="'https://www.myperfumeshop.com.au/cdn/shop/files/versace-crystal-noir-edp-body-care-set-for-women-gift-set-798193.jpg?v=1727956732&width=1030'"
        :firstMessage="'Uštedite do'"
        :secondMessage="'na Ženske parfeme'"
        :discount="'25%'"
        @click="router.push('/parfumesDiscount/female')"></GlobalCard>
      <GlobalCard
        :imageSRC="'https://redolencenpl.com/wp-content/uploads/2024/04/1-6.jpg'"
        :firstMessage="'Uštedite do'"
        :secondMessage="'na Unisex parfeme'"
        :discount="'20%'"
        @click="router.push('/parfumesDiscount/unisex')"></GlobalCard>
    </main>
  </section>
</template>

<script setup>
import SlideShow from "./SlideShow.vue";
import ShopLogo from "../global/ShopLogo.vue";
import PageTitle from "../global/PageTitle.vue";
import Header from "./Header.vue";
import GlobalCard from "../global/GlobalCard.vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
section {
  min-height: 40vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.discountMain {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
  padding: 20px;
}
</style>
