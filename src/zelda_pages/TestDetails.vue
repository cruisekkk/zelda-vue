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
            <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> {{"Run name: " + this.run_name}}</h3>
          </template>
          <div class="chart-area" >
            <bar-chart style="height: 100%"
                       chart-id="blue-bar-chart"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions"
                       v-if ="bar_init"
                       >
            </bar-chart>
          </div>
        </card>
      </div>
      <data-table thead-classes="text-primary" v-bind:table_api = "this.tableInfo">
      </data-table>
    </div>
</template>
<script>
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
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
      bar_init: false,
      tableInfo: [],
      run_name: null,
      result_data: [],
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
      //this.blueBarChart.chartData.datasets[0].data = [1,2,3];
  },
  updated(){
      //this.initializeChart();
  },
  methods:{
      initApi(){
        this.run_name = this.$route.params.run_name;
        axios
          .get('http://10.73.2.3:12321/zelda/runs/' + this.run_name)
          .then(response => (
            this.runsInfo = response.data, // for meta-table
            //console.log(this.runsInfo),
            this.tableInfo = this.runsInfo.cases.filter((value) =>{
              if (!!value){
                return true;
              }
              return false;
            }),
            
            console.log(this.tableInfo),
            this.initializeChart(),
            this.bar_init = true
          )).catch(function (error) { // 请求失败处理
            console.log(error);
          });
      },

      initializeChart () {
        this.result_data = this.gen_result();
        //Object.assign(this.blueBarChart.chartData.datasets[0].data,this.result_data);
        this.$set(this.blueBarChart.chartData.datasets[0], "data", this.result_data);
        console.log(this.blueBarChart.chartData.datasets[0].data);
        console.log(this.result_data);
        
      },

      gen_result() {
        let pass = 0;
        let fail = 0;
        let na = 0;
        for (let i of this.tableInfo){
          if (i.result.toString() == "0"){
                pass++;
            }
            else if (i.result.toString() == "1"){
                fail++;
            }
            else if (i.result.toString() == "2"){
                na++;
            }
        }
        return [pass, fail, na];
      }  

      
  }

};
</script>
<style scoped>
.above {
  height: 355px;
}
</style>