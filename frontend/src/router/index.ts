import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import homePage from "@/components/homePage.vue";
import addBook from "@/components/addBook.vue";
import singleBookPreview from "@/components/singleBookPreview.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
