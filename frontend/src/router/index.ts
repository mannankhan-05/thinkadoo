import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import homePage from "@/components/homePage.vue";
import addBook from "@/components/addBook.vue";
import singleBookPreview from "@/components/singleBookPreview.vue";
import authSelection from "@/components/authSelection.vue";
import loginPage from "@/components/loginPage.vue";
import signUpPage from "@/components/signUpPage.vue";
import userCart from "@/components/userCart.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: homePage,
  },
  {
    path: "/addBook",
    name: "addBook",
    component: addBook,
  },
  {
    path: "/bookPreview/:id",
    name: "singleBookPreview",
    component: singleBookPreview,
  },
  {
    path: "/authSelection",
    name: "authSelection",
    component: authSelection,
  },
  {
    path: "/login",
    name: "loginPage",
    component: loginPage,
  },
  {
    path: "/signUp",
    name: "signUpPage",
    component: signUpPage,
  },
  {
    path: "/cart",
    name: "cartPage",
    component: userCart,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
