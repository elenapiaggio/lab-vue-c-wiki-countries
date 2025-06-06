import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "list",
    component: () => import("@/components/CountriesList.vue"),
    children: [
      {
        path: ":alpha3Code",
        name: "countryDetail",
        props: true,
        component: () => import("../components/CountryDetails.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;