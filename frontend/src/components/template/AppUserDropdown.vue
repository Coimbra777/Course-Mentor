<template>
  <div class="user-dropwdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown-img"></div>
      <i class="fa fa-angle-down"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppUserDropdown",

  computed: mapState(["user"]),
};
</script>

<style></style>
