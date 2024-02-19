<template>
  <aside class="menu" v-show="isMenuVisible">
    <h1>Menu</h1>
  </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppMenu",
  computed: mapState(["isMenuVisible"]),
};
</script>

<style>
.menu {
  grid-area: menu;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px;
}
</style>
