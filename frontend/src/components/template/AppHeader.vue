<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title">
      {{ title }}
    </h1>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    title: String,
    hideToggle: Boolean,
  },
  computed: {
    icon() {
      return "fa-angle-left";
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

  background: blue;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 1.6rem;
  color: white;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title a {
  color: #fff;
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
