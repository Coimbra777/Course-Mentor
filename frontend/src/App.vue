<template>
  <div id="app">
    <div
      class="container-fluid"
      :class="{ 'hide-menu': !isMenuVisible || !user }"
    >
      <AppHeader
        title="Course Mentor"
        :hideToggle="!user"
        :hideUserDropdown="!user"
      />
      <AppMenu v-if="user" />
      <Loading v-if="validatingToken" />
      <AppContent v-else />
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppContent from "./components/template/AppContent.vue";
import AppHeader from "./components/template/AppHeader.vue";
import AppMenu from "./components/template/AppMenu.vue";

import AppFooter from "./components/template/AppFooter.vue";
import Loading from "./components/template/Loading.vue";
import { mapState } from "vuex";
import axios from "axios";
import { baseApiUrl, userKey } from "./global";

import "bootstrap/dist/css/bootstrap.css";

export default {
  name: "App",
  components: {
    AppHeader,
    AppMenu,
    AppContent,
    AppFooter,
    Loading,
  },
  computed: mapState(["isMenuVisible", "user"]),
  data() {
    return {
      validatingToken: true,
    };
  },
  mounted() {
    this.validateToken();
  },
  methods: {
    async validateToken() {
      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      try {
        const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

        if (res.data) {
          this.$store.commit("setUser", userData);
        } else {
          localStorage.removeItem(userKey);
          this.$router.push({ name: "auth" });
        }
      } catch (error) {
        console.error("Error while validating token:", error);
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      } finally {
        this.validatingToken = false;
      }
    },
  },
};
</script>

<style>
* {
  font-family: "IBM Plex Mono", monospace;
}

body {
  margin: 0;
  padding: 0;
}

.container-fluid {
  padding: 0px;
  height: 100vh;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "header header"
    "menu content"
    "footer footer";
}

.container-fluid.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>
