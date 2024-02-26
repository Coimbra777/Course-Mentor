import "font-awesome/css/font-awesome.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./config/router";
import store from "./config/store";
import "bootstrap/dist/css/bootstrap.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(Toast);
app.use(store);
app.use(router);
app.mount("#app");
