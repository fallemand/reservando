import { createRouter, createWebHistory } from "vue-router";
import WelcomeStep from "./components/WelcomeStep.vue";

const About = { template: "<div>About</div>" };

const routes = [
  { path: "/", component: WelcomeStep },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHistory("signup"),
  routes,
});

export default router;
