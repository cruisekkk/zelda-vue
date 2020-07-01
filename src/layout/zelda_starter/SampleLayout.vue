<template> 
  <div class="wrapper">
    <side-bar> 
      <template slot="links">
        <div @click="toggleSub">
        <sidebar-link to="/testRuns" :name="$t('sidebar.testRuns')" icon="tim-icons icon-chart-pie-36"/>
        </div>
        <div v-if="this.$sidebar.showSub==true">
        <sidebar-link v-for="product in products" :key="product" :to= "'/testRuns/' + product" :name="product" />
        </div>
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
        products: [],
        fake_api: [
          {
            run_name: 'RUN101',
            product: 'podman',
            pass_count: 3,
            fail_count: 4,
            na_count: 1,
          },
          {
            run_name: 'RUN102',
            product: 'podman',
            pass_count: 2,
            fail_count: 3,
            na_count: 0,
          },
          {
            run_name: 'RUN103',
            product: 'docker',
            pass_count: 2,
            fail_count: 3,
            na_count: 0,
          },
          {
            run_name: 'RUN104',
            product: 'podman',
            pass_count: 7,
            fail_count: 2,
            na_count: 4,
          },
          {
            run_name: 'RUN105',
            product: 'docker',
            pass_count: 10,
            fail_count: 7,
            na_count: 3,
          },
          {
            run_name: 'RUN106',
            product: 'rhel7',
            pass_count: 5,
            fail_count: 5,
            na_count: 3,
          }
        ]
      }
      
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
      toggleSub() {
         this.$sidebar.showSub=!this.$sidebar.showSub;
         console.log(this.$sidebar.showSub);
      },
      initProducts() {
          var api = this.fake_api;
          var hash=[];
          for (var i = 0; i < api.length; i++) {
              if(hash.indexOf(api[i].product)==-1){
                hash.push(api[i].product);
              }
          }
          this.products = hash;
      }
    },
    created() {
      this.initProducts();
      this.$sidebar.products = this.products;
      this.$sidebar.api = this.fake_api;
    }
  };
</script>
