import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutComp from "./VueMastery_RealWorldVue3/components/AboutComp.vue";
import AboutView from "./views/AboutView.vue";
import AccountView from "./views/AccountView.vue";
import EventDetails from "./VueMastery_RealWorldVue3/components/EventDetails.vue";
import EventList from "./VueMastery_RealWorldVue3/components/EventList.vue";
import ExamplesView from "./views/ExamplesView.vue";
import GridView from "./views/GridView.vue";
import protectedRoute from "./middlewares/protected";
import StartPageView from "./views/StartPageView.vue";
import VTableView from "./views/VTableView.vue";
import Vue3TableLiteView from "./views/Vue3TableLiteView.vue";
import VueMasteryRealWorldVue3 from "./views/VueMasteryRealWorldVue3.vue";
import VueMasteryVuexFundamentals from "./views/VueMasteryVuexFundamentals.vue";
import VueMasteryVuexFundamentalsEventList from "./VueMastery_Vuex_Fundamentals/components/EventList.vue";
import VueMasteryVuexFundamentalsEventDetails from "./VueMastery_Vuex_Fundamentals/components/EventDetails.vue";
import VueMasteryVuexFundamentalsAbout from "./VueMastery_Vuex_Fundamentals/components/AboutComp.vue";
import VueMasteryVuexFundamentalsEventCreate from "./VueMastery_Vuex_Fundamentals/components/EventCreate.vue";
import VueMasterySocksView from "./views/VueMasterySocksView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "StartPage",
    component: StartPageView,
  },
  {
    path: "/examples",
    name: "Examples",
    component: ExamplesView,
  },
  {
    path: "/account",
    name: "Account",
    component: AccountView,
  },
  {
    path: "/vtable",
    name: "VTable",
    component: VTableView,
    beforeEnter: protectedRoute,
  },
  {
    path: "/v3table",
    name: "V3TableLite",
    component: Vue3TableLiteView,
  },
  {
    path: "/socks",
    name: "Socks",
    component: VueMasterySocksView,
  },
  {
    path: "/realworldvue3",
    name: "RealWorldVue3",
    component: VueMasteryRealWorldVue3,
    children: [
      {
        path: "event",
        name: "EventList",
        component: EventList,
      },
      {
        path: "event/:id",
        name: "EventDetails",
        props: true,
        component: EventDetails,
      },
      {
        path: "about",
        name: "AboutComp",
        component: AboutComp,
      },
    ],
  },
  {
    path: "/vuexfundamentals",
    name: "VuexFundamentals",
    component: VueMasteryVuexFundamentals,
    children: [
      {
        path: "vuexevent",
        name: "VuexEventList",
        component: VueMasteryVuexFundamentalsEventList,
      },
      {
        path: "vuexevent/:id",
        name: "VuexEventDetails",
        props: true,
        component: VueMasteryVuexFundamentalsEventDetails,
      },
      {
        path: "vuexabout",
        name: "VuexAboutComp",
        component: VueMasteryVuexFundamentalsAbout,
      },
      {
        path: "vuexcreate",
        name: "VuexEventCreate",
        component: VueMasteryVuexFundamentalsEventCreate,
      },
    ],
  },
  {
    path: "/grid",
    name: "Grid",
    component: GridView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
