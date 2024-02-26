import { createRouter, createWebHistory } from "vue-router";
import HomePages from "../components/home/HomePage.vue";
import AdminPages from "../components/admin/AdminPages.vue";
import AuthPages from "../components/auth/Auth.vue";

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
  {
    name: "auth",
    path: "/auth",
    component: AuthPages,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
