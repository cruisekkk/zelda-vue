<template>
        <card>
        <div class="row">
          <div class="col-9"><p>Test Cases</p></div>
            <div class="col-3">
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
    :items="cases"
    :search="search"
    sort-by="calories"
    class="mytable table tablesorter dark"
    dark
    calculate-widths="true"
  >

    <template v-slot:item.name="{item}">
      <div style="width: 300px">{{ item.name }}</div>
    </template>

    <template v-slot:item.result="{item}">
      <v-chip :class="`${item.result}`" style="width: 60px" >{{ item.result }}</v-chip>
    </template>

    <template v-slot:item.bug="{item}">
      <div style="width: 100px">{{ item.bug }}</div>
    </template>

     <template v-slot:item.comments="{item}">
      <div style="width: 270px">{{ item.comments }}</div>
    </template>


    <template v-slot:top>
        <div data-app>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit test case</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.name" label="Name" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.result" label="Result" disabled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.bug" label="Bug"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea solo v-model="editedItem.comments" label="Comment"></v-textarea>
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
    name: 'data-table',
    data: () => ({
      search: '',
      dialog: false,
      headers: [
        {
          text: 'TEST CASE NAME',
          align: 'start',
          sortable: false,
          value: 'name', // name
          width: 50
        },
        { text: 'RESULT', value: 'result' }, // result
        { text: 'BUG', value: 'bug' }, // bug
        { 
          text: 'COMMENT', value: 'comments' ,
          width: 200
        }, // comment
        { text: 'ACTION', value: 'actions', sortable: false },
      ],
      cases: [],
      run_name: '',
      editedIndex: -1,
      editedItem: {
        userId: '',
        id: '',
        title: '',
        completed: '',
      },
      defaultItem: {
        userId: '',
        id: '',
        title: '',
        completed: '',
      },
    }),

    props: {
      table_api: Array
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      //this.initialize()
      this.run_name = this.$route.params.run_name;
    },

    mounted () {
    },

    computed: {
        newApi() {
        return this.table_api;
      }
    },

    watch: {
        newApi(val) {
          this.cases = this.table_api;
          this.result_transform();
        }

    },

    methods: {
      initialize () {
      },

      result_transform () {
        for (let i of this.cases) {
            if (i.result.toString() == "0"){
                i.result = "Pass";
            }
            else if (i.result.toString() == "1"){
                i.result = "Fail";
            }
            else if (i.result.toString() == "2"){
                i.result = "NA";
            }
        }
      },

      editItem (item) {
        this.editedIndex = this.cases.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.cases.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.cases.splice(index, 1)
        axios
          .delete('http://10.0.105.81:12321/zelda/runs/' + this.run_name + '/cases/' + item['_id']['$oid'])
          .then(response => (
            console.log(response.data) // for meta-table
          )).catch(function (error) { // 请求失败处理
            console.log(error);
          })
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
        this.close();
        axios
          .post('http://10.0.105.81:12321/zelda/runs/' + this.run_name + '/cases/' + this.editedItem['_id']['$oid'] + '/update',
          {
            bug: this.editedItem.bug,
            comments: this.editedItem.comments
          }
          )
          .then(response => (
            console.log(response.data) 
          )).catch(function (error) { // 请求失败处理
            console.log(error);
          })
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
.v-chip.Pass {
  background: #3cd1c2 !important;
}
.v-chip.NA {
  background: #ffaa2c !important;
}
.v-chip.Fail {
  background: #f83e70 !important;
}
.v-icon.delete {
  color: #f82b62;
}
</style>