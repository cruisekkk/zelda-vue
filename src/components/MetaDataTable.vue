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
    <template v-slot:item.result="{ item }">
      <v-chip :class="`${item.result}`" >{{ item.result }}</v-chip>
    </template>

    <template v-slot:top>
        <div data-app>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit meta data</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.attribute" label="Attribute" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.value" label="value"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2 edit"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
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
      cases: [],
      editedIndex: -1,
      editedItem: {
        attribute: '',
        value: '',
      },
      defaultItem: {
        attribute: '',
        value: '',
      },
    }),

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

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

      editItem (item) {
        this.editedIndex = this.cases.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.cases[this.editedIndex], this.editedItem)
        } else {
          this.cases.push(this.editedItem)
        }
        this.close()
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