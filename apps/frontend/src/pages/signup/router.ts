import { createRouter, createWebHistory } from "vue-router";
import WelcomeStep from "./steps/WelcomeStep.vue";
import NameStep from "./steps/NameStep.vue";
import CalendarStep from "./steps/CalendarStep.vue";
import SectorsStep from "./steps/SectorsStep.vue";
import RegisterStep from "./steps/RegisterStep.vue";

const routes = [
  { path: "/", component: WelcomeStep, meta: { header: false } },
  { path: "/name", component: NameStep, meta: { header: true } },
  { path: "/calendar", component: CalendarStep, meta: { header: true } },
  { path: "/sectors", component: SectorsStep, meta: { header: true } },
  { path: "/register", component: RegisterStep, meta: { header: true } },
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
