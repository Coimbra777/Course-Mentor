<template>
  <aside class="menu">
    <h1>Menu</h1>
  </aside>
</template>

<script>
export default {
  name: "AppMenu",
  // Outras definições do componente
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
