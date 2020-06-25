<template> 
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link v-for="product in products" :key="product" to="/profile" :name="product" />
        <sidebar-link to="/test-details" :name="$t('sidebar.testDetails')" icon="tim-icons icon-puzzle-10"/>
        <sidebar-link to="/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/calendar" :name="$t('sidebar.calendar')" icon="tim-icons icon-calendar-60"/> 
      </template> 
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import TopNavbar from "./SampleNavbar.vue";
  import ContentFooter from "./SampleFooter.vue";
  import DashboardContent from "./Content.vue";
  import MobileMenu from "./MobileMenu";
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    data() {
      return {
        products: ["podman", "docker"]
      }
      
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
