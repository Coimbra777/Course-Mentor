import { createRouter, createWebHistory } from "vue-router";
import HomePages from "../components/home/HomePage.vue";
import AdminPages from "../components/admin/AdminPages.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomePages,
  },
  {
    name: "adminPages",
    path: "/admin",
    component: AdminPages,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
