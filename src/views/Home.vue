<template>
  <div class="insite">
      <social></social>
    <div class="page-header header-filter">
      <div class="container">
        <div class="row">
          <div class="col-md-12 ml-auto mr-auto text-center">
            <h1 class="title">
              PascalCoin explorer</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="main main-raised">
          <div class="row">
            <div class="col-md-4">
              <div class="card block-bgcolor mt-0">
                <div class="card-body ">
                  <h4 class="card-title text-white mt-0"><i class="fas fa-th"></i> {{latestBlock}} Blocks</h4>
                  <p class="text-white">A total of {{latestBlock}} blocks were mined.</p>
                  <block-number label="Show latest block" :block="latestBlock" :complement="true"></block-number>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card account-bgcolor mt-0">
                <div class="card-body">
                  <h4 class="card-title text-white mt-0"><i class="fas fa-users"></i> {{accountCount}} Accounts</h4>
                  <p class="text-white">A total of {{accountCount}} accounts are active.</p>
                  <router-link
                          :to="{name: 'accounts'}"
                          class="complement"
                          style="font-family: 'Roboto Slab', 'Times New Roman', serif; font-weight: bold; color: white;">
                    Show Accounts
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card account-bgcolor mt-0">
                <div class="card-body">
                  <h4 class="card-title text-white mt-0"><pascal :amount="supply" :decimals="0"></pascal></h4>
                  <p class="text-white"><pascal :amount="supply" :decimals="0"></pascal> of <pascal :amount="allSupply" :decimals="0"></pascal> are available.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h3 class="title mb-0 mt-0">{{pendingCount}} Pending Operations (mempool)</h3>
              <hr class="block-background block-color">
              <operations-list v-bind:operations="pendings"></operations-list>
              <pagination
                      :total-pages="Math.ceil(pendingCount / operationsAmount)"
                      :total="pendingCount"
                      :per-page="operationsAmount"
                      :current-page="opsPage"
                      @pagechanged="onPageChange"
              />
            </div>
            <div class="col-md-6">
              <apexchart type=bar height=200 :options="chartOptions" :series="series" />
            </div>
            <div class="col-md-6">
              <apexchart type=line height=200 :options="chartOptions2" :series="series2" />
            </div>

            <div class="col-md-12">
              <h3 class="title mb-0">Last 5 Blocks</h3>
              <hr class="block-background block-color">
              <blocks-list v-bind:blocks="latestBlocks"></blocks-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OperationsList from '../components/OperationsList.vue';
import BlocksList from '../components/BlocksList.vue';
import Pascal from '../components/Pascal.vue';
import Pagination from '../components/Pagination.vue';
import BlockNumber from '../components/BlockNumber.vue';
import Social from '../components/Social.vue';

export default {
  name: 'home',
  data() {
    return {
      opsPage: 1,
      operationsAmount: 5,
      series: [{
        name: '',
        data: [],
      }],
      chartOptions: {
        tooltip: {
          fixed: {
            enabled: true,
            position: 'bottom',
            offsetX: 0,
            offsetY: 0,
          },
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: 0,
                to: -10000,
                color: '#F15B46',
              }, {
                from: 0,
                to: 10000,
                color: '#FEB019',
              }],
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'Deviation of last 100 blocks',
          align: 'left',
        },
        yaxis: {
          title: {
            text: 'Deviation in seconds',
          },
        },
        xaxis: {
          type: 'number',
          categories: [],
          labels: {
            show: false,
          },
        },
      },
      series2: [],
      chartOptions2: {
        chart: {
          height: 200,
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
          curve: 'smooth',
          width: 1,
        },
        title: {
          text: 'PascalCoin Operations',
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
          labels: {
            show: false,
          },
        },
      },
    };
  },
  components: {
    BlockNumber,
    OperationsList,
    BlocksList,
    Pagination,
    Pascal,
    Social,
  },
  watch: {
    pendingCount() {
      this.fetchPendingData();
    },
    blockCount() {
      this.fetchLatestBlocksInfo();
    },
    last100() {
      this.series = [{
        name: 'Duration',
        data: this.last100.map(l => l.duration - 300),
      }];
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: this.last100.map(l => l.block),
            type: 'int',
            title: {
              text: 'Blocks',
            },
          },
        },
      };
      this.series2 = [{
        name: 'Number of operations',
        data: this.last100.map(l => parseInt(l.n_operations, 10)),
      }];
      this.chartOptions2 = {
        ...this.chartOptions2,
        ...{
          xaxis: {
            categories: this.last100.map(l => parseInt(l.block, 10)),
            type: 'int',
            title: {
              text: 'Blocks',
            },
          },
        },
      };
    },
  },
  methods: {
    onPageChange(page) {
      this.opsPage = page;
      this.redirect();
    },
    redirect() {
      this.$router.push({
        name: 'home',
        query: {
          ops_page: this.opsPage,
        },
      });
    },
    fetchPendingData() {
      return this.fetchPendings({
        total: this.pendingCount,
        page: this.opsPage,
        amount: this.operationsAmount,
      });
    },
    fetchLatestBlocksInfo() {
      this.fetchLast100();
      return this.fetchLatestBlocks();
    },
    ...mapActions([
      'fetchPendings',
      'fetchLatestBlocks',
      'fetchLast100',
    ]),
  },
  computed: {
    ...mapState({
      blockCount: state => state.blockCount,
      latestBlock: state => state.latestBlock,
      last100: state => state.last100,
      accountCount: state => state.accountCount,
      pendings: state => state.pendings,
      pendingCount: state => state.pendingCount,
      latestBlocks: state => state.latestBlocks,
      searchVisible: state => state.searchVisible,
      supply: state => state.supply,
      allSupply: state => state.allSupply,
    }),
  },
  created() {
    this.opsPage = parseInt(this.$route.query.ops_page, 10) || 1;
    this.fetchPendingData();
    this.fetchLatestBlocksInfo();
  },
  beforeRouteUpdate(to, from, next) {
    this.opsPage = parseInt(to.query.ops_page, 10) || 1;
    this.fetchPendingData()
      .then(() => {
        next();
      });
  },
};
</script>

<style scoped lang="scss">
  @import "./../assets/settings";
  .page-header {
    background-color: $pasc-color-misc;
  }
  .insite .page-header h1 {
    margin-top: -18vh !important;
  }
  .main.main-raised {
    margin-top: -35vh;
  }
</style>
