<template>
  <div @click = "c">
    
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-7" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{$t('dashboard.totalRuns')}}</h5>
                <h2 class="card-title">{{$t('dashboard.performance')}}</h2>
              </div>
              <div class="col-sm-2">
                <div id="example-5" >
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  
                </div>
                <!-- <span>Selected: {{ selected }}</span> -->
              </div>
              </div>
              <div class="col-sm-3">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: bigLineChart.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initBigChart(index)"
                           name="options" autocomplete="off"
                           :checked="bigLineChart.activeIndex === index">
                    {{option}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <card :title="$t('dashboard.RunsInfo')"> 
          <div class="table-responsive">
            <dashboard-table thead-classes="text-primary">

            </dashboard-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  import vSelect from 'vue-select';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from '../pages/Dashboard/TaskList';
  import config from '@/config';
  import {DashboardTable}  from "@/components";

  export default {
    components: {
      vSelect,
      LineChart,
      BarChart,
      TaskList,
      DashboardTable
    },
    data() {
      return {
        labels: [],
        api: this.$sidebar.api,
        el: '#example-5',
        selected: ["container"
        ],
        bigLineChart: {
          allData: [
            [95, 70, 90, 70, 85, 60, 75, 60, 90, 80, 90, 100],
            [80, 70, 95, 100, 95, 80, 90, 100, 80, 95, 70, 10],
            [60, 80, 65, 90, 80, 95, 90, 100, 70, 100, 60, 10]
          ],
          activeIndex: 0,
          chartData: null,
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
        greenLineChart: {
          extraOptions: chartConfigs.greenChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
            datasets: [{
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            }]
          },
          gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
          gradientStops: [1, 0.4, 0],
        }
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.resultCategories');
      },
      ContainerCategories() {
        return this.$t('dashboard.resultCategories');
      }
    },
    created(){
        var api = this.api;
        var labels=[];
          for (var i = 0; i < api.length; i++) {
              if(api[i]['product'] == this.$route.params.product){
                labels.push(api[i]['run_name']);
              }
          }
        this.labels = labels;
      },
    methods: {
      
      c(){
        console.log(this.api);
      },
      initBigChart(index) {
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index]
          }],
          labels: this.labels,
          //['RUN321', 'RUN335', 'RUN375', 'RUN423', 'RUN445', 'RUN449'],
        }
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
    },
    mounted() {
      // not used yet
      // this.i18n = this.$i18n;
      // if (this.enableRTL) {
      //   this.i18n.locale = 'ar';
      //   this.$rtl.enableRTL();
      // }
      this.initBigChart(0);
    },
    beforeDestroy() {
      // if (this.$rtl.isRTL) {
      //   this.i18n.locale = 'en';
      //   this.$rtl.disableRTL();
      // }
    }
  };
</script>
<style>
</style>