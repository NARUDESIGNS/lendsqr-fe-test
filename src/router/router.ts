import LoginPage from "@/pages/LoginPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const route = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: LoginPage,
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/pages/users/UsersPage.vue"),
    },
    {
      path: "/users/:id",
      name: "user",
      component: () => import("@/pages/users/UserPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/pages/NotFoundPage.vue"),
    },
  ],
});

export default route;
