import { createApp } from "vue";
import "@/style.css";
import App from "@/App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import CanvasView from "@/views/CanvasView.vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import ElementPlus from "element-plus";
import Sidebar from "@/components/Sidebar.vue";
import { createPinia } from "pinia";

const routes = [
  {
    path: "/",
    name: "CanvasView",
    components: {
      default: CanvasView,
      sidebar: Sidebar,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ElementPlus);

app.mount("#app");
