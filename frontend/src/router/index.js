import { createRouter, createWebHistory } from "vue-router";
import Overview from "../views/Overview.vue";
import Performance from "../views/Performance.vue";
import Campaigns from "../views/Campaigns.vue";

const routes = [
  {
    path: "/",
    name: "Overview",
    component: Overview,
  },
  {
    path: "/performance",
    name: "Performance",
    component: Performance,
  },
  {
    path: "/campaigns",
    name: "Campaigns",
    component: Campaigns,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
