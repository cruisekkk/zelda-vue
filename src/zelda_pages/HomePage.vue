<template>
  <div class="row">
  <div class="col-lg-12">
    <card class = "above">
    <div class="home">
        <div class="description">
          <div class="desc_word">
            <p class="head_title">ZELDA</p> 
          </div>
          <div class="desc_word">
            <p class="h3">Where you can visualize and update your Daily QE Work</p>
          </div>  
        </div>
    </div>
  <div class="row">
      <div class="col-lg-12">
        
          <div class="table-responsive">
            <div class="title">
              <p class="h4">Product General status</p>
            </div>
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
          </div>
        
      </div>
  </div>
  </card>
  </div>
  </div>
</template>

<script>
import HomeTable from "@/components/HomeTable";
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
export default {
  components: {
    HomeTable,
    BarChart,
  },
  data() {
    return {
      bar_init: false,
      product_labels:[],
      product_runs: [],
      blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: [],
            datasets: [{
              label: "Test Runs",
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
    }
  },
  created(){
    axios.get('http://10.73.2.3:12321/zelda/products')
          .then(response => (
            response.data.forEach((value) =>{
              this.product_labels.push(value.name);
              this.product_runs.push(value.runs.length);
            }),
            this.initializeChart(),
            this.bar_init = true
          )).catch(function (error) { // 请求失败处理
            console.log(error);
          });
  },
  methods:{
    initializeChart(){
      this.blueBarChart.chartData.labels = this.product_labels;
      this.$set(this.blueBarChart.chartData.datasets[0], "data", this.product_runs);
    }
  }
}
</script>
<style scoped>
  .home .above{
    background-color: transparent;
  }

  .description {
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 250px;
    overflow: hidden;
    border-radius: 5px;
  }
  .desc_word .head_title{
    text-align: center;
    display: block;
    font-size: 50px;
    /* font-family: Georgia; */
    font-weight:550;
    margin-bottom: 20px;
  }
  .desc_word p {
    text-align: center;
  }
  p.h3 {
    color: white;
  }
  .title {
    display: flex;
    justify-content: center;
  }
  .title p {
    display: block;
    width: 25%;
    padding-bottom: 5px;
    text-align: center;
    /* border-bottom: 0.7px white solid; */
  }
</style>
