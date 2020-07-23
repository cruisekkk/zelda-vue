<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        © {{year}} made by
        <a href="https://gitlab.cee.redhat.com/atomic-qe/zelda-backend" target="_blank" rel="noopener">Edward</a>&nbsp;&
        <a href="https://gitlab.cee.redhat.com/atomic-qe/zelda-vue" target="_blank" rel="noopener">Johnny</a>
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
