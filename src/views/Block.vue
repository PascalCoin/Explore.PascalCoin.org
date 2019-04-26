<template>
  <div>
    <div v-if="block === null" class="insite">
      <loading title="Block" cls="block" :show-error="doesNotExist" error="The block could not be found. Either wait until it is mined and the page will refresh, or go back."></loading>
    </div>

    <div class="insite" v-if="block !== null">
      <social></social>
    <div class="page-header header-filter">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h1 class="title">Block {{block.block}}</h1>
            <p>
              <date :timestamp="block.timestamp" class="text-white"></date>
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
                    :to="{name: 'blocks'}"
                    class="btn btn-fab btn-block-color btn-round">
              <i class="fa fa-arrow-left"></i><div class="ripple-container"></div>
            </router-link>
          </div>
          <div style="position: absolute; top: -24px; right: 18px; white-space: nowrap">
            <router-link
                    :to="{name: 'block', params: { block: block.block - 1}}"
                    class="btn btn-block-color btn-fill"
                    v-if="block.block - 1 >= 0">
              &laquo; {{block.block - 1}}
              <div class="ripple-container"></div>
            </router-link>
            <router-link
                    :to="{name: 'block', params: { block: block.block + 1}}"
                    class="btn btn-block-color btn-fill"
                    v-if="block.block < blockCount - 1">
              {{block.block + 1}} &raquo;
              <div class="ripple-container"></div>
            </router-link>

          </div>
          <div class="row">
            <div class="col-md-6">
              <h3 class="title mb-0 mt-0">Block Data</h3>
              <div class="card mt-1 block-bgcolor-dark">
                <div class="card-body ">
                  <!--h6 class="card-category text-white">
                      <i class="material-icons">trending_up</i> Block Key Data
                  </h6-->
                  <div class="row">
                    <div class="col-md-6">
                      <dl>
                        <info-value :help="true">
                          <template slot="label">Block Number</template>
                          <template slot="help">The unique identifier of the block.</template>
                          <template slot="value">{{block.block}}</template>
                        </info-value>
                        <info-value :help="true">
                          <template slot="label">Created at</template>
                          <template slot="help">The exact time the block was mined and added to the SafeBox.</template>
                          <template slot="value">
                            <date :timestamp="block.timestamp"></date>
                          </template>
                        </info-value>
                        <info-value :help="false">
                          <template slot="label">Number of operations</template>
                          <template slot="value">{{block.operations}}</template>
                        </info-value>
                      </dl>
                    </div>
                    <div class="col-md-6">
                      <info-value :help="true">
                        <template slot="label">Volume</template>
                        <template slot="help">The accumulated volume of all operations.</template>
                        <template slot="value">
                          <pascal :amount="block.raw.explorer.stats.volume" :lif="-1" liflabel="Unknown"></pascal>
                        </template>
                      </info-value>
                      <info-value :help="true">
                        <template slot="label">Fee</template>
                        <template slot="help">The accumulated fee of all operations.</template>
                        <template slot="value">
                          <pascal :amount="block.fee"></pascal>
                        </template>
                      </info-value>
                      <info-value :help="true">
                        <template slot="label">Reward</template>
                        <template slot="help">The Reward paid to the miner.</template>
                        <template slot="value">
                          <pascal :amount="block.reward"></pascal>
                        </template>
                      </info-value>
                      <info-value :help="true">
                        <template slot="label">Maturation</template>
                        <template slot="help">The number of blocks between the current and the last mined block.</template>
                        <template slot="value">{{block.maturation}}</template>
                      </info-value>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <h3 class="title mb-0 mt-0">Block info</h3>
              <div class="card mt-1">
                <div class="card-body ">
                  <dl>
                    <info-value :help="true">
                      <template slot="label">Duration</template>
                      <template slot="help">The duration of the block in seconds.</template>
                      <template slot="value">{{block.raw.explorer.stats.duration}} seconds.</template>
                    </info-value>
                    <info-value :help="true">
                      <template slot="label">Blockchain Version</template>
                      <template slot="help">The used PascalCoin protocol.</template>
                      <template slot="value">{{block.ver}}</template>
                    </info-value>
                    <info-value :help="true">
                      <template slot="label">Operation Hash</template>
                      <template slot="help">RAW sha256 (32 bytes) of all operations.</template>
                      <template slot="value">{{block.oph.toHex()}}</template>
                    </info-value>
                    <info-value :help="true">
                      <template slot="label">SafeBox hash</template>
                      <template slot="help">The hash of the block in the SafeBox.</template>
                      <template slot="value">{{block.sbh.toHex()}}</template>
                    </info-value>
                  </dl>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <h3 class="title mb-0 mt-0">Mining</h3>
              <div class="card mt-1">
                <div class="card-body ">
                  <div class="row">
                    <div class="col-md-6">
                      <dl>
                        <info-value :help="true">
                          <template slot="label">Miner Name (Payload)</template>
                          <template slot="help">The name of the miner that won the block.</template>
                          <template slot="value">{{block.payload}}</template>
                        </info-value>
                        <info-value :help="true">
                          <template slot="label">Public Key</template>
                          <template slot="help">The public key of the miner.</template>
                          <template slot="value">
                            <public-key :pubkey="block.publicKey"></public-key>
                          </template>
                        </info-value>
                        <info-value :help="true">
                          <template slot="label">Miner Protocol</template>
                          <template slot="help">The available protocol of the miner.</template>
                          <template slot="value">{{block.verA}}</template>
                        </info-value>
                      </dl>
                    </div>
                    <div class="col-md-6">
                      <dl>
                        <info-value :help="false">
                          <template slot="label">Target</template>
                          <template slot="value">{{block.target}}</template>
                        </info-value>
                        <info-value :help="false">
                          <template slot="label">Nonce</template>
                          <template slot="value">{{block.nonce}}</template>
                        </info-value>
                        <info-value :help="false">
                          <template slot="label">Hashrate</template>
                          <template slot="value">{{block.hashratekhs}} KH/s</template>
                        </info-value>
                        <info-value :help="false">
                          <template slot="label">Proof of work</template>
                          <template slot="value">{{block.pow.toHex()}}</template>
                        </info-value>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <h3 class="title mb-0">{{block.operations}} Operations</h3>
              <hr class="block-background block-color">
              <operations-list v-bind:operations="operations"></operations-list>
              <pagination
                      :total-pages="Math.ceil(block.operations / operationsAmount)"
                      :total="block.operations"
                      :per-page="operationsAmount"
                      :current-page="opsPage"
                      @pagechanged="onPageChange"
              />
            </div>
            <div class="col-md-12">
              <h3 class="title mb-0">Created Accounts</h3>
              <accounts-list v-bind:accounts="accounts"></accounts-list>
            </div>
          </div>
          <disqus></disqus>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OperationsList from '../components/OperationsList.vue';
import AccountsList from '../components/AccountsList.vue';
import Pascal from '../components/Pascal.vue';
import Pagination from '../components/Pagination.vue';
import Date from '../components/Date.vue';
import PublicKey from '../components/PublicKey.vue';
import InfoValue from '../components/InfoValue.vue';
import Social from '../components/Social.vue';
import Disqus from '../components/Disqus.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'block',
  data() {
    return {
      opsPage: 1,
      operationsAmount: 5,
      help: {},
    };
  },
  components: {
    OperationsList,
    Pascal,
    AccountsList,
    Pagination,
    Date,
    PublicKey,
    InfoValue,
    Social,
    Disqus,
    Loading,
  },
  methods: {
    onPageChange(page) {
      this.opsPage = page;
      this.redirect(this.block.block);
    },
    redirect(block) {
      this.$router.push({
        name: 'block',
        params: {
          block,
        },
        query: {
          ops_page: this.opsPage,
        },
      });
    },
    fetchAllData(blockNumber) {
      this.fetchOperationData(blockNumber);
      return this.fetchBlockData({
        blockNumber,
      });
    },
    fetchOperationData(blockNumber) {
      return this.fetchBlockOperations({
        blockNumber,
        operationsPage: this.opsPage,
        operationsAmount: this.operationsAmount,
      });
    },
    ...mapActions('block', [
      'fetchBlockData',
      'fetchBlockOperations',
    ]),
  },
  computed: {
    ...mapState({
      block: state => state.block.block,
      doesNotExist: state => state.block.doesNotExist,
      blockCount: state => state.blockCount,
      latestBlock: state => state.latestBlock,
      operations: state => state.block.operations,
      accounts: state => state.block.accounts,
    }),
  },
  watch: {
    latestBlock() {
      if (this.latestBlock == this.$router.currentRoute.params.block && this.doesNotExist === true) {
        this.fetchAllData(this.$router.currentRoute.params.block);
      }
    },
  },
  created() {
    this.opsPage = parseInt(this.$route.query.ops_page, 10) || 1;
    this.fetchAllData(this.$route.params.block);
  },
  beforeRouteUpdate(to, from, next) {
    this.opsPage = parseInt(to.query.ops_page, 10) || 1;
    if (to.params.block !== this.block.block) {
      this.fetchAllData(to.params.block).then(() => {
        next();
      });
    } else {
      this.fetchOperationData(to.params.block).then(() => {
        next();
      });
    }
    // next();
  },
};
</script>


<style scoped lang="scss">
  @import "./../assets/settings";
  .page-header {
    background-color: $pasc-color-block;
  }
</style>
