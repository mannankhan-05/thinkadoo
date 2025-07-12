import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import homePage from "@/components/homePage.vue";
import singleBookPreview from "@/components/singleBookPreview.vue";
import authSelection from "@/components/authSelection.vue";
import loginPage from "@/components/loginPage.vue";
import signUpPage from "@/components/signUpPage.vue";
import userCart from "@/components/userCart.vue";
import forgetPassword from "@/components/forgetPassword.vue";
import resetPassword from "@/components/resetPassword.vue";
import personalizeCharacter from "@/components/personalizeCharacter.vue";
import eBooks from "@/components/eBooks.vue";
import accountEdit from "@/components/accountEdit.vue";

// Import the components for the order management
import orderCheckout from "@/components/order/orderCheckout.vue";

// Import the components for the admin panel
import adminPanel from "@/components/admin/adminPanel.vue";
import addBook from "@/components/admin/addBook.vue";
import editOrDeleteBooks from "@/components/admin/editOrDeleteBooks.vue";
import orderManagement from "@/components/admin/orderManagement.vue";

// Import the components for the footer
import helpAndFaqs from "@/components/footer/helpAndFaqs.vue";

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
    path: "/order-checkout",
    name: "orderCheckout",
    component: orderCheckout,
  },
  {
    path: "/books",
    name: "books",
    component: eBooks,
  },
  {
    path: "/account-edit",
    name: "accountEdit",
    component: accountEdit,
  },
  {
    path: "/support/helpAndFaqs",
    name: "helpAndFaqs",
    component: helpAndFaqs,
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
  {
    path: "/admin/orders",
    name: "orderManagement",
    component: orderManagement,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
