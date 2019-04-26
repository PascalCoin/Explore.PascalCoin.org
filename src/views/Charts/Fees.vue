<template>
    <div class="insite">
        <div class="page-header header-filter">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto text-center">
                        <h1 class="title">Fees</h1>
                        <p>
                            Fees
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <div class="main main-raised">
                    <div style="position: absolute; top: -24px; left: 18px;">
                        <router-link
                                :to="{name: 'accounts'}"
                                class="btn btn-fab btn-account-color btn-round">
                            <i class="fa fa-arrow-left"></i><div class="ripple-container"></div>
                        </router-link>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="nav nav-pills nav-pills-rose mb-5">
                                <li class="nav-item">
                                    <router-link
                                            :to="{name: 'charts-fees' }"
                                            class="nav-link"
                                            exact-active-class="active show">
                                        Yearly
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link
                                            :to="{name: 'charts-fees', query: { type: 'monthly'} }"
                                            class="nav-link"
                                            exact-active-class="active show">
                                        Monthly
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link
                                            :to="{name: 'charts-fees', query: { type: 'weekly'} }"
                                            class="nav-link"
                                            exact-active-class="active show">
                                        Weekly
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link
                                            :to="{name: 'charts-fees', query: { type: 'daily'} }"
                                            class="nav-link"
                                            exact-active-class="active show">
                                        Daily
                                    </router-link>
                                </li>
                            </ul>
                            <div id="chart">
                                <apexchart type=line height=350 :options="chartOptions" :series="series" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const OP_LABELS = [
  'Blockchain Reward',
  'Transaction',
  'Change Key',
  'Recover funds',
  'List for Sale',
  'Delist',
  'Buy account',
  'Change Key',
  'Change Info',
  'Multi Operation',
  'Data',
];

export default {
  name: 'charts-fees',
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 3,
        },
        tooltip: {
          fixed: {
            enabled: true,
            position: 'bottom',
            offsetX: 0,
            offsetY: 0,
          },
        },
        stroke: {
          curve: 'straight',
          width: 1,
        },
        title: {
          text: 'PascalCoin Paid Fees',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Day',
          },
        },
      },
    };
  },
  components: {},
  methods: {
    onAreaChange(type) {
      this.type = type;
      this.redirect();
    },
    redirect() {
      this.$router.push({
        name: 'charts-fees',
        query: {
          type: this.type,
        },
      });
    },
    fetchChartData(type) {
      return this.fetchData(type);
    },
    ...mapActions('charts', [
      'fetchData',
    ]),
    updateChart(data, xField, xLabel) {
      const series = {};
      const x = [];
      for (let i = 0; i < data.length; i += 1) {
        if (series.volume_avg === undefined) {
          // series.volume = {
          // name: 'Fees',
          // data: [],
          // };
          series.volume_avg = {
            name: 'Fees Average',
            data: [],
          };
        }
        // series.volume.data.push(data[i].sum_fee_pasc);
        series.volume_avg.data.push(parseInt(data[i].avg_fee_molina, 10));
        x.push(data[i][xField]);
      }
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: x,
            type: 'string',
            title: {
              text: xLabel,
            },
          },
        },
      };
      this.series = Object.values(series);
    },
  },
  computed: {
    ...mapState({
      daily: state => state.charts.daily,
      weekly: state => state.charts.weekly,
      monthly: state => state.charts.monthly,
      yearly: state => state.charts.yearly,
    }),
  },
  watch: {
    daily() {
      this.updateChart(this.daily, 'day', 'Days');
    },
    weekly() {
      this.updateChart(this.weekly, 'week', 'Weeks');
    },
    monthly() {
      this.updateChart(this.monthly, 'month', 'Months');
    },
    yearly() {
      this.updateChart(this.yearly, 'year', 'Years');
    },
  },
  created() {
    this.type = this.$route.query.type || 'yearly';
    this.fetchChartData(this.type);
  },
  beforeRouteUpdate(to, from, next) {
    this.type = to.query.type || 'yearly';
    this.fetchChartData(this.type)
      .then(() => {
        next();
      });
  },
};
</script>

<style scoped lang="scss">
@import "./../../assets/settings";
.page-header {
    background-color: $pasc-color-account;
}
</style>
