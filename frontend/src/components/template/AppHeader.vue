<template>
  <header class="header">
    <h1>header</h1>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
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
</style>
