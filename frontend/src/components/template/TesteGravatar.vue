<template>
  <vue-gravatar :email="email" :alt="alt" />
</template>

<script>
import VueGravatar from "vue-gravatar";

export default {
  props: ["email", "alt"],

  created() {
    console.log("Valor do email:", this.email);
  },

  components: {
    VueGravatar,
  },
};
</script>
