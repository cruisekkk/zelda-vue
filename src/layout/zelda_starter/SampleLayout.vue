<template> 
  <div class="wrapper">
    <side-bar> 
      <template slot="links">
        <div @click="toggleSub">
        <sidebar-link to="/testRuns" :name="$t('sidebar.testRuns')" icon="tim-icons icon-chart-pie-36"/>
        </div>
        <div v-if="this.$sidebar.showSub==true">
        <sidebar-link v-for="product in this.$sidebar.products" :key="product" :to= "'/testRuns/' + product.toLowerCase().replace(/ /, '-')" :name="product" />
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
        curr: [],
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
      update() {
        if (this.curr.length != 0){
          console.log("product");
          console.log(this.products);
          console.log("curr");
          console.log(this.curr);
          this.$sidebar.products = this.curr;
          };
      },
      initSidebar() {
          var api = new Array();
          this.curr = new Array();
          axios
          .get('http://10.73.2.3:12321/zelda/products')
          .then(response => (
            api = response.data, 
            api.forEach(element => {
            if (!(this.$sidebar.products.includes(element.name))){
              this.curr.push(element.name);
              console.log("this is not in the sidebar.products");
            }
          }),
          console.log(this.curr.length),
          this.update()
          )).catch(function (error) { // 请求失败处理
            console.log(error);
          });
      }
    },
    created() {
      // initialize the side bar part of the page
      // use a global variable to keep the products array alive
      this.initSidebar();
      
      this.$sidebar.api = this.fake_api;
    }
  };
</script>
