<template>
  <div class="auth-content">
    <div class="auth-modal"></div>
  </div>
</template>

<script>
export default {
  name: "AuthPage",
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-modal {
  width: 500px;
  background-color: white;
  padding: 50px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
