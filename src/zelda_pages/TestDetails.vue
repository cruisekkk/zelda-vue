<template>

    <div class="row">
      <div class="col-lg-12" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> Run name: podman</h3>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%"
                       chart-id="blue-bar-chart"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>

      <!-- <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <details-table :data="table1.data"
                        :columns="table1.columns"
                        thead-classes="text-primary">
            </details-table>
          </div>
          <div class="text-center">
          <v-pagination
            v-model="page"
            :length="6"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          ></v-pagination>
        </div> 
        </card>
      </div> -->

      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <data-table :data="table1.data"
                        :columns="table1.columns"
                        thead-classes="text-primary">

            </data-table>
          </div>
        </card>
      </div>
    </div>
</template>
<script>
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import TaskList from '../pages/Dashboard/TaskList';
import UserTable from '../pages/Dashboard/UserTable';
import config from '@/config';
import {DetailsTable}  from "@/components";
import {DataTable}  from "@/components";
const tableColumns = ["Test Case Name", "Results", "Bug", "Comments"];
const tableData = [
  {
    id: 1,
    "test case name": "check signature",
    results: "Pass",
    bug: "N/A",
    comments: "N/A",
  },
  {
    id: 2,
    "test case name": "install",
    results: "Fail",
    bug: "Bug 33513",
    comments: "always fail",
  },
  {
    id: 3,
    "test case name": "run",
    results: "Fail",
    bug: "N/A",
    comments: "caused by install fail",
  },
  {
    id: 4,
    "test case name": "scan",
    results: "Pass",
    bug: "N/A",
    comments: "caused by install fail",
  }
];

export default {
  components: {
    DetailsTable,
    BarChart,
    DataTable
  },
  data() {
    return {
      page: 1,
      table1: {
        title: "Tasks from podman",
        columns: [...tableColumns],
        data: [...tableData]
      },
      blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['PASS', 'FAIL', 'N/A'],
            datasets: [{
              label: "Cases",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [55, 20, 5],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        }
    };
  }
};
</script>
<style>
</style>