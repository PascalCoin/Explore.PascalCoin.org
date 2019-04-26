<template>
  <div>
    <div v-if="account === null" class="insite">
      <loading title="Account" cls="account" :show-error="doesNotExist" error="The account could not be found. Either wait until it is mined and the page will refresh, or go back."></loading>
    </div>
  <div v-if="account !== null" class="insite">
    <social></social>
    <div class="page-header header-filter">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h1 class="title">Account <account-number :complement="true" :account="account.account"></account-number></h1>
            <p v-if="account.isForSale()" class="bootstrap-tagsinput rose-badge"><span class="tag badge">For sale: <pascal :amount="account.price"></pascal></span></p>
            <p>
              last updated in block <block-number complement="true" :block="account.updatedB"></block-number>
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
          <div style="position: absolute; top: -24px; right: 18px; white-space: nowrap">
            <router-link
                    :to="{name: 'account', params: { account: account.account.account - 1}}"
                    class="btn btn-account-color btn-fill"
                    v-if="account.account.account > 0">
              &laquo; <account-number hidelink="true" :account="newAccountNumber(account.account.account - 1)"></account-number>
              <div class="ripple-container"></div>
            </router-link>
            <router-link
                    :to="{name: 'account', params: { account: account.account.account + 1}}"
                    class="btn btn-account-color btn-fill"
                    v-if="account.account.account < accountCount">
            <account-number hidelink="true" :account="newAccountNumber(account.account.account + 1)"></account-number> &raquo;
              <div class="ripple-container"></div>
            </router-link>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h3 class="title mb-0 mt-0">Account Data</h3>
              <div class="card mt-1 block-bgcolor-dark">
                <div class="card-body ">
                  <!--h6 class="card-category text-white">
                      <i class="material-icons">trending_up</i> Block Key Data
                  </h6-->
                  <div class="row">
                    <div class="col-md-6">
                      <dl>
                        <info-value :help="true">
                          <template slot="label">Account Number</template>
                          <template slot="help">The unique identifier of the account.</template>
                          <template slot="value"><account-number :complement="true" :hidelink="true" :account="account.account"></account-number></template>
                        </info-value>
                        <info-value :help="true">
                          <template slot="label">Name</template>
                          <template slot="help">The name of the account which is also unique.</template>
                          <template slot="value">
                            <span v-if="account.name === ''">The account has no name yet.</span>
                            <span v-if="account.name !== ''">{{account.name}}</span>
                          </template>
                        </info-value>
                        <info-value :help="true">
                          <template slot="label">Type</template>
                          <template slot="help">The type of the account (a number between 0 and 65535.</template>
                          <template slot="value">{{account.type}}</template>
                        </info-value>
                      </dl>
                    </div>
                    <div class="col-md-6">
                      <info-value :help="true">
                        <template slot="label">Balance</template>
                        <template slot="help">The current balance of the account.</template>
                        <template slot="value">
                          <pascal :amount="account.balance"></pascal>
                        </template>
                      </info-value>
                      <info-value :help="true">
                        <template slot="label">Number of operations</template>
                        <template slot="help">The number of operations executed by this account.</template>
                        <template slot="value">{{account.nOperation}}</template>
                      </info-value>
                      <info-value :help="true">
                        <template slot="label">Initial Owner</template>
                        <template slot="help">The initial owner of the account when the account was created (the miner).</template>
                        <template slot="value">
                          <span v-if="account.account.isFoundationReward">PascalCoin Foundation</span>
                          <span v-if="!account.account.isFoundationReward">Miner of Block <block-number :block="account.account.createdInBlock"></block-number></span>
                        </template>
                      </info-value>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <h3 class="title mb-0 mt-0">Account info</h3>
              <div class="card mt-1">
                <div class="card-body ">
                  <dl>
                    <info-value :help="true">
                      <template slot="label">Owning Public Key</template>
                      <template slot="help">The current owning public key of the account.</template>
                      <template slot="value">
                        <public-key :pubkey="account.publicKey"></public-key>
                      </template>
                    </info-value>
                    <info-value :help="true">
                      <template slot="label">Created in block</template>
                      <template slot="help">The block in which the account was created.</template>
                      <template slot="value"><block-number :block="account.account.createdInBlock"></block-number></template>
                    </info-value>
                    <info-value :help="true">
                      <template slot="label">Last operation</template>
                      <template slot="help">The block this account made it's last operation.</template>
                      <template slot="value"><block-number :block="account.updatedB"></block-number></template>
                    </info-value>
                    <info-value :help="true">
                      <template slot="label">State</template>
                      <template slot="help">The state of the account where "listed" indicated that the account is for sale.</template>
                      <template slot="value">{{account.state}}</template>
                    </info-value>
                  </dl>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <h3 class="title mb-0 mt-0">Sales info</h3>
              <div class="card mt-1">
                <div class="card-body" v-if="!account.isForSale()">
                  This account is not for sale.
                </div>
                <div class="card-body" v-if="account.isForSale()">
                  <div v-if="account.privateSale" class="alert bg-light">
                    <div class="container">
                      <div class="alert-icon">
                        <i class="material-icons">info_outline</i>
                      </div>
                      <b>Info:</b> This is a private sale!
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <dl>
                        <info-value :help="true">
                          <template slot="label">Price</template>
                          <template slot="help">The price of the account.</template>
                          <template slot="value">
                            <pascal :amount="account.price"></pascal>
                          </template>
                        </info-value>
                      </dl>
                    </div>
                    <div class="col-md-4">
                      <dl>
                        <info-value :help="true">
                          <template slot="label">Seller</template>
                          <template slot="help">
                            The seller account that will get the paid price.
                          </template>
                          <template slot="value">
                            <account-number :account="account.sellerAccount"></account-number>
                          </template>
                        </info-value>
                      </dl>
                    </div>
                    <div class="col-md-4">
                      <dl>
                        <info-value :help="true">
                          <template slot="label">Locked until block</template>
                          <template slot="help">Until what block this account is locked</template>
                          <template slot="value">{{account.lockedUntilBlock}}</template>
                        </info-value>
                      </dl>
                    </div>
                    <div class="col-md-12" v-if="account.privateSale">
                      <dl>
                        <info-value :help="true" v-if="account.privateSale">
                          <template slot="label">New PublicKey</template>
                          <template slot="help">The public key that can buy the account in case of a private sale.</template>
                          <template slot="value">
                            <public-key pubkey="account.new_enc_pubkey"></public-key>
                          </template>
                        </info-value>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div class="col-md-12">
                  <h3 class="title mb-0">States</h3>
                  <div class="table-responsive">
                      <table class="table table-striped">
                          <thead>
                          <tr>
                              <th>Operation</th>
                              <th>From Block</th>
                              <th>To Block</th>
                              <th>Name</th>
                              <th>Type</th>
                              <th>Public key</th>
                          </tr>
                          </thead>
                          <tbody>
                          <template v-for="(owner, idx) in account.raw.explorer.public_keys" >
                          <tr>
                              <td>
                                  <operation-link :label="owner.block + '/' + owner.opblock" :ophash="owner.op.opHash" v-if="owner.op !== undefined"></operation-link>
                                  <block-number label="Created" :block="owner.block" v-if="owner.op === undefined"></block-number>
                              </td>
                              <td>
                                  <block-number :block="owner.block"></block-number>
                              </td>
                            <td>
                                  <span v-if="account.raw.explorer.public_keys[idx-1] !== undefined">
                                      <block-number :block="account.raw.explorer.public_keys[idx-1].block"></block-number>
                                  </span>
                            </td>
                            <td>
                                  <span>
                                      {{owner.name}}
                                  </span>
                            </td>
                            <td>
                                    {{owner.type}}
                            </td>
                              <td class="pubkey"><public-key :pubkey="owner.enc_pubkey"></public-key></td>
                          </tr>
                            <tr v-if="owner.op !== undefined">
                              <td colspan="10"><operation-text-short :operation="owner.op"></operation-text-short></td>
                            </tr>
                          </template>
                          </tbody>
                      </table>
                  </div>
              </div>
              <div class="col-md-12">
              <h3 class="title mb-0">Operations</h3>
              <operations-list v-bind:operations="operations"></operations-list>
              <pagination
                      :total-pages="-1"
                      :total="-1"
                      :per-page="operationsAmount"
                      :current-page="opsPage"
                      @pagechanged="onPageChange"
              />
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
import AccountNumberObj from 'pascalcoin/src/Types/AccountNumber';
import AccountNumber from '../components/AccountNumber.vue';
import BlockNumber from '../components/BlockNumber.vue';
import OperationsList from '../components/OperationsList.vue';
import Pagination from '../components/Pagination.vue';
import Pascal from '../components/Pascal.vue';
import InfoValue from '../components/InfoValue.vue';
import PublicKey from '../components/PublicKey.vue';
import OperationLink from '../components/OperationLink.vue';
import OperationTextShort from '../components/OperationTextShort.vue';
import Social from '../components/Social.vue';
import Disqus from '../components/Disqus.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'account',
  data() {
    return {
      opsPage: 1,
      operationsAmount: 10,
    };
  },
  components: {
    OperationTextShort,
    OperationLink,
    PublicKey,
    AccountNumber,
    OperationsList,
    Pagination,
    Pascal,
    BlockNumber,
    InfoValue,
    Social,
    Disqus,
    Loading,
  },
  methods: {
    newAccountNumber(acc) {
      return new AccountNumberObj(acc);
    },
    onPageChange(page) {
      this.opsPage = page;
      this.redirect(this.account.account.account);
    },
    redirect(account) {
      this.$router.push({
        name: 'account',
        params: {
          account,
        },
        query: {
          ops_page: this.opsPage,
        },
      });
    },
    fetchData(account) {
      this.fetchOperations({
        account,
        operationsPage: this.opsPage,
        operationsAmount: this.operationsAmount,
      });

      return this.fetchAccountData({
        account,
        operationsPage: this.opsPage,
        operationsAmount: this.operationsAmount,
      });
    },
    ...mapActions('account', [
      'fetchAccountData',
      'fetchOperations',
    ]),
  },
  watch: {
    accountCount() {
      if (this.accountCount >= parseInt(this.$router.currentRoute.params.account, 10) && this.doesNotExist === true) {
        this.fetchData(this.$router.currentRoute.params.account);
      }
    },
  },
  computed: {
    ...mapState({
      doesNotExist: state => state.account.doesNotExist,
      account: state => state.account.account,
      operations: state => state.account.operations,
      accountCount: state => state.accountCount,
    }),
  },
  created() {
    this.opsPage = parseInt(this.$route.query.ops_page, 10) || 1;
    this.fetchData(this.$route.params.account);
  },
  beforeRouteUpdate(to, from, next) {
    this.opsPage = parseInt(to.query.ops_page, 10) || 1;
    if (to.params.account !== this.account.account.account) {
      this.fetchData(to.params.account).then(() => {
        next();
      });
    } else {
      this.fetchOperations({
        account: to.params.account,
        operationsPage: this.opsPage,
        operationsAmount: this.operationsAmount,
      }).then(() => {
        next();
      });
    }
  },
};
</script>

<style scoped lang="scss">
  @import "./../assets/settings";
  .page-header {
    background-color: $pasc-color-account;
  }
</style>
