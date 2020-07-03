<template>
  <v-data-table
    :headers="headers" 
    :items="this.api"
    sort-by=""
    class="mytable table tablesorter dark"
    dark
  >
    <!-- <template v-slot:item.pass="{ item }">
      <v-chip small class="pass" >{{ item.pass }}</v-chip>
    </template>
    <template v-slot:item.fail="{ item }">
      <v-chip small class="fail" >{{ item.fail }}</v-chip>
    </template>
    <template v-slot:item.na="{ item }">
      <v-chip small class="na" >{{ item.na }}</v-chip>
    </template> -->

    <template v-slot:item.detail="{ item }" >
      <router-link :to="{path:'/test-details/' + item.run_name}">
      <!-- <router-link :to="{path:'/runs/'+ item.userId}" > -->
      <v-icon>
        find_in_page
      </v-icon>
      </router-link>
      
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
    
  </v-data-table>
</template>

<script>
  export default {
    name: 'dashboard-table',
    props: {
      api: Array
    },
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'RUN NAME',
          align: 'start',
          sortable: false,
          value: 'run_name', // name
        },
        { text: 'TOTAL', value: 'total_count' }, // total
        { text: 'PASS', value: 'pass_count' }, // pass
        { text: 'FAIL', value: 'fail_count' },
        { text: 'N/A', value: 'na_count' },
        { text: 'DETAIL', value: 'detail', sortable: false },
      ],
      cases: [],
      product: '',
    }),

    created () {
      this.initialize()
    },

    mounted () {
    },
    computed: {
      newApi() {
        return this.api;
      }
    },
    watch: {
      newApi(val){
        for (let i = 0; i < this.api.length; i++){
          this.api[i]["total_count"] = this.api[i]["na_count"] + this.api[i]["pass_count"] + this.api[i]["fail_count"];
        }
        this.c();
        
      }

      
    },

    methods: {
      c() {
        console.log("this is table");
        console.log(this.api);
          
      },
      initialize () {
      this.product = this.$route.params.product;
      //console.log(case_array);
      //this.cases = case_array;





      //var p = this.product;

      // reference for real restful api
      // axios
      // .get('https://jsonplaceholder.typicode.com/users/1/todos')
      // .then(response => (this.cases = response.data, 
      // this.cases = this.cases.filter(function (elem) {
      //   console.log(p);
      //   if (p == 'docker'){
      //     return (
      //       elem.completed.toString() == 'false'
      //       );
      //   }
      //   else {
      //     return (elem.completed.toString() == 'true')
      //   }
      // },
      // console.log(this.cases),
      // ))
      // .catch(function (error) { // 请求失败处理
      //   console.log(error);
      // }));

      //console.log(this.$route.params.product);
  },
      getColor (result) {
        if (result == 'Fail') return 'red'
        else if (result == 'N/A') return 'orange'
        else return 'green'
      },
    },
  }
</script>

<style scoped>
.mytable {
    background-color: transparent;
    border-bottom: none;
}
.v-chip.pass {
  background: #3cd1c2 !important;
}
.v-chip.na {
  background: #ffaa2c !important;
}
.v-chip.fail {
  background: #f83e70 !important;
}
.v-icon {
    color: #7af0e4;
}
</style>