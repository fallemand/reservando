import { createRouter, createWebHistory } from "vue-router";
import WelcomeStep from "./steps/WelcomeStep.vue";
import NameStep from "./steps/NameStep.vue";
import OpenDaysStep from "./steps/OpenDaysStep.vue";
import OpenTimesStep from "./steps/OpenTimesStep.vue";
import IntervalStep from "./steps/IntervalStep.vue";
import DurationStep from "./steps/DurationStep.vue";
import SectorsStep from "./steps/SectorsStep.vue";
import RegisterStep from "./steps/RegisterStep.vue";
import NotificationsStep from "./steps/NotificationsStep.vue";
import CongratsStep from "./steps/CongratsStep.vue";

const routes = [
  { path: "/", component: WelcomeStep, meta: { header: false } },
  { path: "/name", component: NameStep, meta: { header: true } },
  { path: "/open-days", component: OpenDaysStep, meta: { header: true } },
  { path: "/open-times", component: OpenTimesStep, meta: { header: true } },
  { path: "/interval", component: IntervalStep, meta: { header: true } },
  { path: "/duration", component: DurationStep, meta: { header: true } },
  { path: "/sectors", component: SectorsStep, meta: { header: true } },
  { path: "/register", component: RegisterStep, meta: { header: true } },
  { path: "/notifications", component: NotificationsStep, meta: { header: true } },
  { path: "/congrats", component: CongratsStep, meta: { header: true, headerHighlight: true } },
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
