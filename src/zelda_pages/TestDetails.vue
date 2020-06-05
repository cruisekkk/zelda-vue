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


      <div class="col-12">
        <card :title="table1.title">
          <div class="table-responsive">
            <data-table thead-classes="text-primary">

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

export default {
  components: {
    BarChart,
    DataTable
  },
  data() {
    return {
      page: 1,
      table1: {
        title: "Tasks from podman",
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