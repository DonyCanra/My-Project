import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Shop from "../views/Shop.vue";
import History from "../views/History.vue";
import RandomCard from "../views/RandomCard.vue";
import Transaction from "../views/Transaction.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Home,
  },
  {
    path: "/shop",
    name: "ShopPage",
    component: Shop,
  },
  {
    path: "/transaction",
    name: "TransactionPage",
    component: Transaction,
  },
  {
    path: "/card/random",
    name: "random",
    component: RandomCard,
  },
  {
    path: "/histories",
    name: "HistoryPage",
    component: History,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if ((to.name === "HistoryPage" || to.name === "TransactionPage") && !localStorage.access_token) {
    next({ name: "HomePage" });
  } else {
    next();
  }
});

export default router;
