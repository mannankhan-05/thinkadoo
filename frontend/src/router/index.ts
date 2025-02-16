import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import homePage from "@/components/homePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: homePage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
