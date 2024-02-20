import "font-awesome/css/font-awesome.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./config/router";
import store from "./config/store";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
