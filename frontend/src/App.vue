<template>
  <div id="app">
    <div class="container" :class="{ 'hide-menu': !isMenuVisible }">
      <AppHeader title="Course Mentor" :hideToggle="false" />
      <AppMenu />
      <AppContent />
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppContent from "./components/template/AppContent.vue";
import AppFooter from "./components/template/AppFooter.vue";
import AppHeader from "./components/template/AppHeader.vue";
import AppMenu from "./components/template/AppMenu.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    AppHeader,
    AppMenu,
    AppContent,
    AppFooter,
  },
  computed: mapState(["isMenuVisible"]),
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

.container {
  height: 100vh;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "header header"
    "menu content"
    "footer footer";
}

.container.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>
