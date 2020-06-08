<template>
  <v-data-table
    :headers="headers"
    :items="cases"
    sort-by="calories"
    class="mytable table tablesorter dark"
    dark
  >
    <template v-slot:item.result="{ item }">
      <v-chip :class="`${item.result}`" >{{ item.result }}</v-chip>
    </template>

    <template v-slot:top>
        <div data-app>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit item</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
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
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2 edit"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        class="delete"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
    
  </v-data-table>
</template>

<script>
  export default {
    name: 'data-table',
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'TEST CASE NAME',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'RESULT', value: 'result' },
        { text: 'BUG', value: 'bug' },
        { text: 'COMMENT', value: 'comment' },
        { text: 'ACTION', value: 'actions', sortable: false },
      ],
      cases: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        result: '',
        bug: '',
        comment: '',
      },
      defaultItem: {
        name: '',
        result: '',
        bug: '',
        comment: '',
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
        this.cases = [
   {
    name: "check signature",
    result: "Pass",
    bug: "N/A",
    comment: "N/A",
  },
  {
    name: "install",
    result: "Fail",
    bug: "Bug 33513",
    comment: "always fail",
  },
  {
    name: "run",
    result: "Fail",
    bug: "N/A",
    comment: "caused by install fail",
  },
  {
    name: "scan",
    result: "Pass",
    bug: "N/A",
    comment: "caused by install fail",
  }
  ]
  },

      editItem (item) {
        this.editedIndex = this.cases.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.cases.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.cases.splice(index, 1)
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
.v-chip.Pass {
  background: #3cd1c2 !important;
}
.v-chip.NA {
  background: #ffaa2c !important;
}
.v-chip.Fail {
  background: #f83e70 !important;
}
.v-icon.edit {
  /* color: #89f0e5; */
}
.v-icon.delete {
  color: #f82b62;
}
</style>