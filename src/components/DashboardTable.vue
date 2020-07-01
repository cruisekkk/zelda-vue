<template>
  <v-data-table
    :headers="headers" 
    :items="cases"
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
      <router-link :to="{path:'/test-details/' + item.name}">
      <!-- <router-link :to="{path:'/runs/'+ item.userId}" > -->
      <v-icon @click = "c(item)">
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
    data: () => ({
      api: [],
      dialog: false,
      headers: [
        {
          text: 'RUN NAME',
          align: 'start',
          sortable: false,
          value: 'name', // name
        },
        { text: 'TOTAL', value: 'total' }, // total
        { text: 'PASS', value: 'pass' }, // pass
        { text: 'FAIL', value: 'fail' },
        { text: 'N/A', value: 'na' },
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

    methods: {
      c(item) {
          console.log("a");
          console.log(item);
          console.log("b");
          console.log(this.api);
      },
      initialize () {
      this.product = this.$route.params.product;
      this.api = this.$sidebar.api;
      var api = this.api;
      var pro_name = this.product;
      var case_array = [];
      for (let i = 0; i < api.length; i++){
        if (api[i]['product'] == pro_name){
          let a = {};
          a['name'] = api[i]['run_name'];
          a['pass'] = api[i]['pass_count'];
          a['fail'] = api[i]['fail_count'];
          a['na'] = api[i]['na_count'];
          a['total'] = a['pass'] + a['fail'] + a['na'];
          case_array.push(a);
        }
      }
      console.log(case_array);
      this.cases = case_array;





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