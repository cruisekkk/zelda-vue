<template>

    <div class="row">
      <div class="col-lg-4">
        <card class = "above">
          <div class="table-responsive">
            <meta-data-table thead-classes="text-primary" v-bind:meta_api = "this.runsInfo">
            </meta-data-table>
          </div>
        </card>
      </div>
      <div class="col-lg-8" :class="{'text-right': isRTL}">
        <card type="chart" class = "above">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> Run name: podman</h3>
          </template>
          <div class="chart-area" >
            <bar-chart style="height: 100%"
                       chart-id="blue-bar-chart"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>


      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <data-table thead-classes="text-primary" v-bind:table_api = "this.tableInfo">

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
import {DataTable}  from "@/components";
import {MetaDataTable}  from "@/components";
export default {
  components: {
    BarChart,
    DataTable,
    MetaDataTable
  },
  data() {
    return {
      runsInfo: {},
      tableInfo: [],
      run_name: null,
      array: [],
      page: 1,
      table1: {
        title: "Test Cases from podman",
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
              data: [],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        }, 
    };
  }, 
  created(){
      this.initApi();
      this.initializeChart ()
  },
  methods:{
      initApi(){
        this.run_name = this.$route.params.run_name;
        axios
          .get('http://10.73.2.3:12321/zelda/runs/' + this.run_name)
          .then(response => (
            this.runsInfo = response.data, // for meta-table
            //console.log(this.runsInfo),
            this.tableInfo = this.runsInfo.cases,
            console.log(this.tableInfo)
          )).catch(function (error) { // 请求失败处理
            console.log(error);
          });
      },

      initializeChart () {
        this.array = [55,20,5];
        console.log(this.blueBarChart.chartData.datasets[0].data);
        console.log(this.array);
        console.log(this.blueBarChart.gradientStops);
        this.blueBarChart.chartData.datasets[0].data = this.array;
      },

      
  }

};
</script>
<style>
.above {
  height: 355px;
}
</style>