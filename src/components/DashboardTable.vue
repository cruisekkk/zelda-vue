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
      <router-link :to="{path:'/test-details'}" >
      <v-icon >
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
      dialog: false,
      headers: [
        {
          text: 'RUN NAME',
          align: 'start',
          sortable: false,
          value: 'userId', // name
        },
        { text: 'PRODUCT NAME', value: 'id'}, // product
        { text: 'TOTAL', value: 'title' }, // total
        { text: 'PASS', value: 'completed' }, // pass
        { text: 'FAIL', value: 'fail' },
        { text: 'N/A', value: 'na' },
        { text: 'DETAIL', value: 'detail', sortable: false },
      ],
      cases: [],
    }),

    created () {
      this.initialize()
    },

    mounted () {
            axios
      .get('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => (this.info = response.data.sites))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
    },

    methods: {
      initialize () {
  //       this.cases = [
  //  {
  //   name: "RUN321", 
  //   product: "rsyslog container",
  //   total: 15,
  //   pass: 12,
  //   fail: 2,
  //   na: 1,
  // },
  // {
  //   name: "RUN335",
  //   product: "ubi7 containenr",
  //   total: 22,
  //   pass: 20,
  //   fail: 1,
  //   na: 1,
  // },
  // {
  //   name: "RUN375",
  //   product: "podman rpm",
  //   total: 899,
  //   pass: 836,
  //   fail: 33,
  //   na: 30,
  // },
  // {
  //   name: "RUN423",
  //   product: "buildah rpm",
  //   total: 48,
  //   pass: 42,
  //   fail: 5,
  //   na: 1,
  // }
  // ]
      axios
      .get('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => (this.cases = response.data))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
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