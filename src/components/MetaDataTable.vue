<template>
  <v-data-table
    :headers="headers"
    :items="attributes"
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
</template>

<script>
  export default {
    name: 'meta-data-table',
    data: () => ({
      dialog: false,
        headers: [
          {
            text: 'attribute',
            align: 'start',
            value: 'attribute',
          },
          { text: 'value', value: 'value' },
          { text: 'action', value: 'action'},
        ],
      attributes: [],
      defaultItem: {
        attribute: '',
        value: '',
      },
    }),
    props: {
      meta_api: Object
    },
    created () {
      this.initialize();
    },
 
    methods: {
      initialize () {
        this.attributes = [
          {
            attribute: 'Run name',
            value: this.$route.params.run_name,
          },
          {
            attribute: 'Product',
            value: this.meta_api.product,
          },
          {
            attribute: 'Start time',
            value: this.meta_api["start-time"],
          },
          {
            attribute: 'End time',
            value: this.meta_api["end-time"],
          },
          {
            attribute: 'Type',
            value: this.meta_api.type,
          },
          {
            attribute: 'Owner',
            value: this.meta_api.owner,

          },
          {
            attribute: 'Arch',
            value: this.meta_api.arch,
          },
  ]
  },
    },
    computed: {
      newApi() {
        return this.meta_api;
      }
    },
    watch: {
      newApi() {
        this.initialize();
      }
    }
  }
</script>

<style scoped>
.mytable {
    background-color: transparent;
    border-bottom: none;
}
</style>