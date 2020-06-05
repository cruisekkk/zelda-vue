<template>
  <table class="table tablesorter" :class="tableClass"> 
    <thead :class="theadClasses">
    <tr>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
    </tr>
    </thead>
    <tbody :class="tbodyClasses">
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, column)">
          {{itemValue(item, column)}}
        </td>
        <div class="text-right">
        <base-button slot="footer" type="primary" fill>edit<v-icon small right white>mdi-folder</v-icon></base-button>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <base-button slot="footer" type="primary" fill>remove</base-button>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        </div>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'details-table',
    props: {
      columns: {
        type: Array,
        default: () => [],
        description: "Table columns"
      },
      data: {
        type: Array,
        default: () => [],
        description: "Table data"
      },
      type: {
        type: String, // striped | hover
        default: "",
        description: "Whether table is striped or hover type"
      },
      theadClasses: {
        type: String,
        default: '',
        description: "<thead> css classes"
      },
      tbodyClasses: {
        type: String,
        default: '',
        description: "<tbody> css classes"
      }
    },
    computed: {
      tableClass() {
        return this.type && `table-${this.type}`;
      }
    },
    methods: {
      hasValue(item, column) {
        return item[column.toLowerCase()] !== "undefined";
      },
      itemValue(item, column) {
        return item[column.toLowerCase()];
      }
    }
  };
</script>
<style>
</style>
