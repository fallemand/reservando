import { createRouter, createWebHistory } from "vue-router";
import WelcomeStep from "./components/WelcomeStep.vue";
import NameStep from "./components/NameStep.vue";

const routes = [
  { path: "/", component: WelcomeStep, meta: { header: false } },
  { path: "/name", component: NameStep, meta: { header: true } },
];

const router = createRouter({
  history: createWebHistory("signup"),
  routes,
});

router.afterEach((to, from) => {
  const fromDepth = routes.findIndex((route) => route.path === from.path);
  const toDepth = routes.findIndex((route) => route.path === to.path);
  if (fromDepth !== toDepth) {
    to.meta.transitionName = toDepth > fromDepth ? "slide-right" : "slide-left";
  }
});

export default router;
