import { createRouter, createWebHistory } from "vue-router";
import HomePages from "../components/home/HomePage.vue";
import AdminPages from "../components/admin/AdminPages.vue";
import AuthPages from "../components/auth/Auth.vue";
import { userKey } from "../global";
import ArticlesByCategory from "../components/article/ArticlesByCategory.vue";
import ArticleById from "@/components/article/ArticleById";

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
    meta: { requiresAdmin: true },
  },
  {
    name: "auth",
    path: "/auth",
    component: AuthPages,
  },
  {
    name: "logout",
    path: "/logout",
  },
  {
    name: "ArticlesByCategory",
    path: "/categories/:id/articles",
    component: ArticlesByCategory,
  },
  {
    name: "articleById",
    path: "/articles/:id",
    component: ArticleById,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey);

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const user = JSON.parse(json);
    user && user.admin ? next() : next({ path: "/" });
  } else {
    next();
  }
});

export default router;
