<template>
  <div>
    
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-7" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">Runs</h5>
                <h2 class="card-title">{{this.status()}}</h2>
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
    
        <dashboard-table v-bind:api="this.tableInfo" thead-classes="text-primary">

        </dashboard-table>
      </div>
</template>
<script>
  import vSelect from 'vue-select';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import config from '@/config';
  import {DashboardTable}  from "@/components";

  export default {
    components: {
      vSelect,
      LineChart,
      BarChart,
      DashboardTable
    },
    data() {
      return {
        product: "",
        pass: [],
        fail: [],
        na: [],
        pass_rate: [],
        fail_rate: [],
        na_rate: [],
        labels: [],
        tableInfo: [],
        el: '#example-5',
        selected: ["container"
        ],
        bigLineChart: {
          allData: [
          ],
          activeIndex: 0,
          chartData: null,
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
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
      this.initInfo();
    },
    methods: { 
      keep50labels(){
        while(this.labels.length > 50){
          this.labels.shift();
          this.pass_rate.shift();
          this.fail_rate.shift();
          this.na_rate.shift();
        }
      },
      initInfo(){
        this.product = this.$route.params.product.toLowerCase().replace(/ /, '-');
        axios
          .get('http://10.0.105.81:12321/zelda/products/' + this.product + '/runs/summaries')
          .then(response => (
            this.tableInfo = response.data,
            //console.log(response.data),
            this.tableInfo.forEach( element => {
              this.labels.push(element.run_name);
              this.pass.push(element.pass_count);
              this.fail.push(element.fail_count);
              this.na.push(element.na_count);
              // init the rate
              let total = element.pass_count + element.fail_count + element.na_count;
              this.pass_rate.push(Math.floor(element.pass_count/total *100));
              this.fail_rate.push(Math.floor(element.fail_count/total *100));
              this.na_rate.push(Math.floor(element.na_count/total *100));
              this.keep50labels();
            }),
            this.initBigChart(0)
          )).catch(function (error) { // 请求失败处理
            console.log(error);
          });
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
            data: index == 0 ? this.pass_rate : index == 1 ? this.fail_rate : this.na_rate // 线索
            //this.bigLineChart.allData[index]
          }],
          labels: this.labels
        }
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      status(){
        let str = this.bigLineChart.activeIndex == 0 ? "Pass": this.bigLineChart.activeIndex ==1? "Fail" : "NA";
        return str + " rate %";
      }
    },
    mounted() {
      
    },
    watch: {
      
    },
    beforeDestroy() {
    }
  };
</script>
<style>
</style>