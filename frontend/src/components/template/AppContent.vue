<template>
  <div class="content"><router-view></router-view></div>
</template>

<script>
export default {
  name: "AppContent",
};
</script>

<style>
.content {
  grid-area: content;
  width: 100%;
  padding: 40px;
  /* background-color: #52575d; */
}
</style>
