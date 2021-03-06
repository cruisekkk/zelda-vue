import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../layout/zelda_starter/SampleLayout.vue';
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import Vuetify from "vuetify";
// import "vuetify/dist/vuetify.min.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);
Vue.use(Router);

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/zelda_pages/Dashboard.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TestDetails = () => import(/* webpackChunkName: "common" */ "@/zelda_pages/TestDetails.vue");
const Calendar = () => import(/* webpackChunkName: "common" */ "@/zelda_pages/Calendar.vue");
const HomePage = () => import(/* webpackChunkName: "common" */ "@/zelda_pages/HomePage.vue");

const routes = [
  {
    path: "/", 
    component: DashboardLayout,
    redirect: "/testRuns",
    children: [
      {
        path: "testRuns",
        name: "testRuns",
        component: HomePage
      },
      {
        path: "testRuns/:product",
        name: "testRuns",
        component: Dashboard
      },
      {
        path: "calendar",
        name: "calendar",
        component: Calendar
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "test-details/:run_name",
        name: "test-details",
        component: TestDetails
      },
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;

