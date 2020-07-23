<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        © {{year}} made by
        <a href="https://www.binarcode.com" target="_blank" rel="noopener">Edward</a>&nbsp;&
        <a href="https://www.creative-tim.com" target="_blank" rel="noopener">Johnny</a>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
