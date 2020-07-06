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


    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.attributes = [
          {
            attribute: 'Run name',
            value: 'RUN350',
          },
          {
            attribute: 'Product',
            value: 'Podman rpm',
          },
          {
            attribute: 'Start time',
            value: '',
          },
          {
            attribute: 'End time',
            value: '',
          },
          {
            attribute: 'Type',
            value: 'rpm',
          },
          {
            attribute: 'Owner',
            value: 'Johnny',

          },
          {
            attribute: 'Arch',
            value: 'x86',
          },
  ]
  },
    },
  }
</script>

<style scoped>
.mytable {
    background-color: transparent;
    border-bottom: none;
}
</style>