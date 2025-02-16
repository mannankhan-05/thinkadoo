import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import homePage from "@/components/homePage.vue";
import addBook from "@/components/addBook.vue";

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
