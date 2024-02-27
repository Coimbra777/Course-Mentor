<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title">
      <router-link to="/">
        {{ title }}
      </router-link>
    </h1>
    <div>
      <AppUserDropdown v-if="!hideUserDropdown" />
    </div>
  </header>
</template>

<script>
import AppUserDropdown from "./AppUserDropdown.vue";

export default {
  name: "AppHeader",
  components: {
    AppUserDropdown,
  },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean,
  },
  computed: {
    icon() {
      return this.$store.state.isMenuVisible
        ? "fa-angle-left"
        : "fa-angle-down";
    },
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>

<style>
.header {
  grid-area: header;
  width: 100%;
  background-color: #41444b;
  color: #f6f4e6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 1.6rem;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title a {
  color: #f6f4e6;
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  justify-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f6f4e6;
  text-decoration: none;
}

header.header > a.toggle:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
