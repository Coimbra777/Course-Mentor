<template>
  <div class="loading">
    <spring-spinner :animation-duration="3000" :size="60" color="#ff1d5e" />
  </div>
</template>

<script>
import { SpringSpinner } from "epic-spinners";

export default {
  name: "LoadingComponent",
  components: {
    SpringSpinner,
  },
};
</script>

<style>
.loading {
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
