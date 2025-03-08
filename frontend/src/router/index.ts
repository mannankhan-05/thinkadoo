import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import homePage from "@/components/homePage.vue";
import singleBookPreview from "@/components/singleBookPreview.vue";
import authSelection from "@/components/authSelection.vue";
import loginPage from "@/components/loginPage.vue";
import signUpPage from "@/components/signUpPage.vue";
import userCart from "@/components/userCart.vue";
import adminPanel from "@/components/adminPanel.vue";
import addBook from "@/components/addBook.vue";
import editOrDeleteBooks from "@/components/editOrDeleteBooks.vue";
import forgetPassword from "@/components/forgetPassword.vue";
import resetPassword from "@/components/resetPassword.vue";
import personalizeCharacter from "@/components/personalizeCharacter.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: homePage,
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
  {
    path: "/forget-password",
    name: "forgetPasswordPage",
    component: forgetPassword,
  },
  {
    path: "/reset-password/:email",
    name: "resetPasswordPage",
    component: resetPassword,
  },
  {
    path: "/personalize-character",
    name: "personalizeCharacter",
    component: personalizeCharacter,
  },
  {
    path: "/admin",
    name: "adminPanel",
    component: adminPanel,
  },
  {
    path: "/admin/addBook",
    name: "addBook",
    component: addBook,
  },
  {
    path: "/admin/books",
    name: "adminBooks",
    component: editOrDeleteBooks,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
