<template>
  <div id="app">
    <div class="row">
      <Header :varFromParent="var01" @newList="updateList($event)">
    </div>
    <div class="row">
      <Table>
    </div>
    <div class="row">
      <DataTable
        :varFromParent="var01"
        @newList="updateList($event)"
        style="position: relative"
      />
    </div>
  </div>
</template>

<script>
/** Imports Header Table and DataTable */
import Header from './components/Header.vue';
import Table from './components/Table.vue';
import DataTable from './components/DataTable.vue';

/** Exports default */
export default {
  name: 'App',
  components: {
    Header,
    Table,
    DataTable,
  },
  methods: {
    updateList(varFromChild) {
      this.var01 = varFromChild.data;
    },
  },
  data: () => ({
    var01: [
    /** Initializes var as provided on screenshot on Apollo */
      ['title01', 'description01', '02/03/22', 'low', false],
      ['title02', 'moded02', '02/03/22', 'med', false],
      ['title03', 'description03', '02/03/22', 'high', true],
    ],
  }),
};
</script>

<style>
button {
  width: 120px;
}
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
</style>
