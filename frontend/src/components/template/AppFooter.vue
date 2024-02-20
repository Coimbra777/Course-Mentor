<template>
  <footer class="footer">
    <span
      >Copyright <strong> CourseMentor</strong> &copy;
      {{ new Date().getFullYear() }}
    </span>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  // Outras definições do componente
};
</script>

<style>
.footer {
  grid-area: footer;
  width: 100%;
  background-color: #41444b;
  color: #f6f4e6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
}
</style>
