import "font-awesome/css/font-awesome.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./config/router";
import store from "./config/store";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
// import { BootstrapVue } from "bootstrap-vue";
// import "./config/msgs";

const app = createApp(App);

app.use(store);
// app.use(BootstrapVue);
app.use(router);
app.mount("#app");
