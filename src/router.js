import { createWebHashHistory, createRouter } from "vue-router";
import MainPage from "./pages/MainPage.vue";
import WholeOffer from "./pages/WholeOffer.vue";
import MaleParfumes from "./pages/DiscountedParfumes.vue";
import ShopCart from "./pages/ShopCart.vue";
import SingleParfum from "./pages/SingleParfum.vue";
import ChooseDiscountParfumes from "./components/ChooseDiscountParfumes.vue";
import UploadParfume from "./components/uploadForm/UploadParfume.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: MainPage,
    },
    {
      path: "/mainPage",
      component: MainPage,
    },
    {
      path: "/wholeOffer",
      component: WholeOffer,
    },
    {
      path: "/parfumesDiscount/:gender",
      component: MaleParfumes,
    },
    {
      path: "/cart",
      component: ShopCart,
    },
    {
      path: "/singlePerfum/:id",
      component: SingleParfum,
    },
    {
      path: "/discounts",
      component: ChooseDiscountParfumes,
    },
    {
      path: "/mobileDrop",
      component: UploadParfume,
    },
  ],
  scrollBehavior(to) {
    if (to.path === "/wholeOffer") {
      return null;
    }
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
