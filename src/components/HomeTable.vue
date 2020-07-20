<template>
<div>
    <p class="head_title">Product list</p>
  <v-data-table
    :headers="headers"
    :items="this.products"
    hide-default-header
    hide-default-footer
    class="mytable dark"
    dark
    height="320px"
  >

    <template v-slot:top>
        <div data-app>
        
      </div>
    </template>
    
  </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'home-table',
    data: () => ({
        products: [],
      dialog: false,
        headers: [
          {
            text: 'name',
            align: 'start',
            value: 'name',
          },
        ],
      defaultItem: {
        attribute: '',
        value: '',
      },
    }),
    created () {
      this.initialize();
    },
 
    methods: {
      initialize () {
        this.$sidebar.products.forEach(x => this.products.push({"name": x}));
        console.log(this.products instanceof Array);

  },
    },
    computed: {
      newApi() {
        return this.$sidebar.products;
      },
    },
    watch: {
      newApi() {
        this.initialize();
      }
    }
  }
</script>

<style scoped>
p.head_title {
    margin-top: 20px;
    margin-left: 1%;
}
.mytable {
    background-color: transparent;
    border-bottom: none;
}
</style>