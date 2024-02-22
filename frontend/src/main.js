import "font-awesome/css/font-awesome.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./config/router";
import store from "./config/store";
import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwibmFtZSI6IkdhYnJpZWwiLCJlbWFpbCI6ImdhYnJpZWxAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTcwODU2ODExMSwiZXhwIjoxNzA4ODI3MzExfQ.tDTPKZTI2afU7qcWKsy9T-kd2Wh4mruaEtRGQ_tPmR0";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
