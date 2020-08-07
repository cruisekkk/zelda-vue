<template>
      <card>
        <div class="row">
          <div class="col-9"><p>Runs Info</p></div>
            <div class="col-3">
              <p v-if="search" v-on:click="this.send_search_data">update button(还没想好图标= =，先点这里！)</p>
  <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          dark
          class="input"
        ></v-text-field>
        </div>
        <div class="table-responsive">
          <div>
  <v-data-table
    :headers="headers" 
    :items="this.api"
    :search="search"
    sort-by=""
    class="mytable table tablesorter dark"
    dark
  >

    <template v-slot:item.detail="{ item }" >
      <router-link :to="{path:'/test-details/' + item.run_name}">
      <!-- <router-link :to="{path:'/runs/'+ item.userId}" > -->
      <v-icon>
        find_in_page
      </v-icon>
      </router-link>
      
    </template>
    <template v-slot:no-data>
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </template>
    
  </v-data-table>
  </div>
  </div>
  </div>
  </card>
</template>

<script>
  export default {
    name: 'dashboard-table',
    props: {
      api: Array
    },
    data: () => ({
      search: '',
      searchTable: [],
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
      },
      newSearch() {
        return this.search;
      }
    },
    watch: {
      newApi(val){
        for (let i = 0; i < this.api.length; i++){
          this.api[i]["total_count"] = this.api[i]["na_count"] + this.api[i]["pass_count"] + this.api[i]["fail_count"];
        }
      },
      newSearch(val){
        if (val.length == 0){
          this.$emit('restore-graph');
        }
        this.updateSearchTable(val);
      }
      
    },

    methods: {
      initialize () {
      this.product = this.$route.params.product;
  },
      getColor (result) {
        if (result == 'Fail') return 'red'
        else if (result == 'N/A') return 'orange'
        else return 'green'
      },
      updateSearchTable(keyword) { 
        
        let length = keyword.length;
        let table = [];
        for (let obj of this.api){
          let find = false;
          let search_arr = [String(obj.fail_count), String(obj.na_count), String(obj.pass_count), String(obj.run_name), String(obj.total_count)];   
          for (let attr of search_arr){
            if (attr.length >= length) {
              for (let i = 0; i <= attr.length - length; i++){
                if (attr.slice(i, i+ length) === keyword){
                  find = true;
                  break;
                }
              }
            }
            if (find) break;
          }
          if (find) table.push(obj);
        }
        this.searchTable = table;
      },

      send_search_data(newdata){
        this.$emit('table-update', this.searchTable);
      }
    },

  
  }
</script>

<style scoped>
.input {
  margin: 0px;
  padding: 0px;
}
p {
  color: rgba(212, 212, 212, 0.6);
  font-size: 1.4rem;
}
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