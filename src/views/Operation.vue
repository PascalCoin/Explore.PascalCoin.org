<template>
  <div>
    <div v-if="operation=== null" class="insite">
      <loading title="Operation" cls="operation"></loading>
    </div>
  <div v-if="operation !== null" class="insite">
      <social></social>
    <div class="page-header header-filter">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h1 class="title">Operation {{operation.block}}/{{operation.opblock}}</h1>
            <p>
              <span v-if="operation.isPending()">Pending - this operation was not included yet.</span>
              <span v-if="!operation.isPending()">
                created in block <block-number complement="true" :block="operation.block"></block-number>
              </span>
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
                    :to="{name: 'block', params: { block: operation.block} }"
                    class="btn btn-fab btn-account-color btn-round">
              <i class="fa fa-arrow-left"></i><div class="ripple-container"></div>
            </router-link>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h3 class="title mb-0 mt-0">Operation Data</h3>
              <div class="card mt-1 operation-bgcolor-dark">
                <div class="card-body ">
                  <div class="row">
                    <div class="col-md-6">
                      <dl>
                        <info-value :help="true">
                          <template slot="label">Type</template>
                          <template slot="help">The type of the operation.</template>
                          <template slot="value"><operation-type :operation="operation"></operation-type></template>
                        </info-value>
                        <info-value :help="true">
                          <template slot="label">Date</template>
                          <template slot="help">The date of the block.</template>
                          <template slot="value"><date :timestamp="operation.time" class="text-white"></date></template>
                        </info-value>
                        <info-value :help="true">
                          <template slot="label">Signer</template>
                          <template slot="help">The signing account of the operation.</template>
                          <template slot="value"><account-number :account="operation.signerAccount" :complement="true" ></account-number></template>
                        </info-value>
                      </dl>
                    </div>
                    <div class="col-md-6">
                      <info-value :help="true">
                        <template slot="label">Block</template>
                        <template slot="help">The block the operation was included.</template>
                        <template slot="value">
                          <block-number :block="operation.block"></block-number>
                        </template>
                      </info-value>
                      <info-value :help="true">
                        <template slot="label">Op Block</template>
                        <template slot="help">The position of the operation inside of the block.</template>
                        <template slot="value">Position {{operation.opblock}}<span v-if="block !== null"> of {{block.operations}} operations</span></template>
                      </info-value>
                      <info-value :help="true">
                        <template slot="label">Maturation</template>
                        <template slot="help">The number of blocks between the current and the last mined block.</template>
                        <template slot="value">{{operation.maturation}} Blocks</template>
                      </info-value>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <h4 class="title"><operation-type :operation="operation"></operation-type></h4>
              <operation-text :operation="operation"></operation-text>
            </div>
            <div class="col-md-12">
              <h3 class="title">Account States</h3>
              <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th>Account</th>
                  <th>Name</th>
                  <th class="text-right">Type</th>
                  <th>Public Key</th>
                </tr>
                </thead>
                <tbody v-for="(account_state, idx) in operation.raw.explorer.account_states" :key="idx">
                <tr>
                  <td><account-number :account="account_state.before.account"></account-number></td>
                  <td>{{ account_state.before.name }}</td>
                  <td class="text-right">{{ account_state.before.type }}</td>
                  <td class="pubkey"><public-key :pubkey="account_state.before.enc_pubkey"></public-key></td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>{{ account_state.after.name}}</td>
                  <td class="text-right">{{ account_state.after.type}}</td>
                  <td class="pubkey"><public-key :pubkey="account_state.after.enc_pubkey"></public-key></td>
                </tr>
               </tbody>
              </table>
              </div>
            </div>
            <div class="col-md-12">
              <div v-if="operation.isMultiOperation()">
                <h3 class="title">Senders</h3>
                <div class="table-responsive">

                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Payload</th>
                    <th class="text-right">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(sender, idx) in operation.senders" :key="idx">
                    <td><account-number :account="sender.account"></account-number></td>
                    <td><payload :value="sender.payload"></payload></td>
                    <td class="text-right"><pascal :amount="sender.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="subtotal">
                    <td></td>
                    <td class="text-right">Subtotal</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="fee">
                    <td></td>
                    <td class="text-right">Fee</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  <tr class="total">
                    <td></td>
                    <td class="text-right">Total</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>

                  </tbody>
                </table>
                </div>
                <h3 class="title">Receivers</h3>
                <div class="table-responsive">

                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Receiver</th>
                    <th>Payload</th>
                    <th class="text-right">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(receiver, idx) in operation.receivers" :key="idx">
                    <td><account-number :account="receiver.account"></account-number></td>
                    <td><payload :value="receiver.payload"></payload></td>
                    <td class="text-right"><pascal :amount="receiver.amount"></pascal></td>
                  </tr>
                  <tr class="subtotal">
                    <td></td>
                    <td class="text-right">Subtotal</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="fee">
                    <td></td>
                    <td class="text-right">Fee</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  <tr class="total">
                    <td></td>
                    <td class="text-right">Total</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  </tbody>
                </table>
                </div>

                <h3 class="title">Changers</h3>
                <div class="table-responsive">

                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Account</th>
                    <th>New Public Key</th>
                    <th>New name</th>
                    <th>New type</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(changer, idx) in operation.changers" :key="idx">
                    <td><account-number :account="changer.account"></account-number></td>
                    <td><public-key :pubkey="changer.newPublicKey"></public-key></td>
                    <td>{{changer.newName}}</td>
                    <td>{{changer.newType}}</td>
                  </tr>
                  </tbody>
                </table>
                </div>

              </div>
              <div v-if="operation.isChangeAccountInfo()">
                <h3 class="title">Changers</h3>
                <div class="table-responsive">

                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Account</th>
                    <th>New Name</th>
                    <th>New type</th>
                    <th>Payload</th>
                    <th class="text-right">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(changer, idx) in operation.changers" :key="idx">
                    <td><account-number :account="changer.account"></account-number></td>
                    <td>{{changer.newName}}</td>
                    <td>{{changer.newType}}</td>
                    <td><payload :value="operation.payload"></payload></td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="subtotal">
                    <td colspan="3"></td>
                    <td class="text-right">Subtotal</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="fee">
                    <td colspan="3"></td>
                    <td class="text-right">Fee</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  <tr class="total">
                    <td colspan="3"></td>
                    <td class="text-right">Total</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  </tbody>
                </table>
                </div>
              </div>
              <div v-if="operation.isDelist()">
                <h3 class="title">Changers</h3>
                <div class="table-responsive">

                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Signer</th>
                    <th>Account</th>
                    <th>Payload</th>
                    <th class="text-right">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(changer, idx) in operation.changers" :key="idx">
                    <td><account-number :account="operation.signerAccount"></account-number></td>
                    <td><account-number :account="changer.account"></account-number></td>
                    <td><payload :value="operation.payload"></payload></td>
                    <td class="text-right"><pascal :amount="operation.amount"></pascal></td>
                  </tr>
                  <tr class="subtotal">
                    <td colspan="2"></td>
                    <td class="text-right">Subtotal</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="fee">
                    <td colspan="2"></td>
                    <td class="text-right">Fee</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  <tr class="total">
                    <td colspan="2"></td>
                    <td class="text-right">Total</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  </tbody>
                </table>
                </div>
              </div>
                <div v-if="operation.isListForSale()">
                <h3 class="title">Changers</h3>
                  <div class="table-responsive">

                  <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Account</th>
                    <th>Seller</th>
                    <th>Price</th>
                    <th>Payload</th>
                    <th class="text-right">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(changer, idx) in operation.changers" :key="idx">
                    <td><account-number :account="changer.account"></account-number></td>
                    <td><account-number :account="changer.sellerAccount"></account-number></td>
                    <td><pascal :amount="changer.accountPrice"></pascal></td>
                    <td><payload :value="operation.payload"></payload></td>
                    <td class="text-right"><pascal :amount="operation.amount"></pascal></td>
                  </tr>
                  <tr class="subtotal">
                    <td colspan="3"></td>
                    <td class="text-right">Subtotal</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="fee">
                    <td colspan="3"></td>
                    <td class="text-right">Fee</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  <tr class="total">
                    <td colspan="3"></td>
                    <td class="text-right">Total</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  </tbody>
                </table>
                  </div>
              </div>
                <div v-if="operation.isTransaction()">
                <h3 class="title">Transfers</h3>
                  <div class="table-responsive">

                  <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Payload</th>
                    <th class="text-right">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(sender, idx) in operation.senders" :key="idx">
                    <td><account-number :account="sender.account"></account-number></td>
                    <td><account-number :account="operation.receivers[idx].account"></account-number></td>
                    <td><payload :value="sender.payload"></payload></td>
                    <td class="text-right"><pascal :amount="operation.receivers[idx].amount"></pascal></td>
                  </tr>
                  <tr class="subtotal">
                    <td colspan="2"></td>
                    <td class="text-right">Subtotal</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="fee">
                    <td colspan="2"></td>
                    <td class="text-right">Fee</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  <tr class="total">
                    <td colspan="2"></td>
                    <td class="text-right">Total</td>
                    <td class="text-right"><pascal :amount="operation.senders[0].amount.toPositive()"></pascal></td>
                  </tr>
                  </tbody>
                </table>
                  </div>
              </div>
              <div v-if="operation.isChangeKeyAccount()">
                <h3 class="title">Changes</h3>
                <div class="table-responsive">

                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Signer</th>
                    <th>Account</th>
                    <th>New Public Key</th>
                    <th>Payload</th>
                    <th>Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td><account-number :account="operation.signerAccount"></account-number></td>
                    <td><account-number :account="operation.changers[0].account"></account-number></td>
                    <td class="pubkey"><public-key :pubkey="operation.changers[0].newPublicKey"></public-key></td>
                    <td><payload :value="operation.payload"></payload></td>
                    <td><pascal :amount="operation.amount"></pascal></td>
                  </tr>
                  <tr class="subtotal">
                    <td colspan="3"></td>
                    <td class="text-right">Subtotal</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="fee">
                    <td colspan="3"></td>
                    <td class="text-right">Fee</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  <tr class="total">
                    <td colspan="3"></td>
                    <td class="text-right">Total</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>

                  </tbody>
                </table>
                </div>
              </div>
              <div v-if="operation.isChangeKey()">
                <h3 class="title">Changes</h3>
                <div class="table-responsive">

                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Account</th>
                    <th>New Public Key</th>
                    <th class="text-right">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td><account-number :account="operation.changers[0].account"></account-number></td>
                    <td class="pubkey"><public-key :pubkey="operation.changers[0].newPublicKey"></public-key></td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="subtotal">
                    <td></td>
                    <td class="text-right">Subtotal</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="fee">
                    <td></td>
                    <td class="text-right">Fee</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  <tr class="total">
                    <td></td>
                    <td class="text-right">Total</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  </tbody>
                </table>
                </div>
              </div>
              <div v-if="operation.isBuy()">
                <h3 class="title">Changes</h3>
                <div class="table-responsive">

                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Signer</th>
                    <th>Account</th>
                    <th>New Public Key</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(changer, idx) in operation.changers" :key="idx">
                    <td><account-number :account="operation.signerAccount"></account-number></td>
                    <td><account-number :account="changer.account"></account-number></td>
                    <td class="pubkey"><public-key :pubkey="changer.newPublicKey"></public-key></td>
                  </tr>
                  </tbody>
                </table>
                </div>
                <h3 class="title">Transfers</h3>
                <div class="table-responsive">

                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Signer</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Payload</th>
                    <th class="text-right">Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(receiver, idx) in operation.receivers" :key="idx">
                    <td><account-number :account="operation.signerAccount"></account-number></td>
                    <td><account-number :account="operation.senders[0].account"></account-number></td>
                    <td><account-number :account="receiver.account"></account-number></td>
                    <td><payload :value="receiver.payload"></payload></td>
                    <td class="text-right"><pascal :amount="receiver.amount"></pascal></td>
                  </tr>
                  <tr class="subtotal">
                    <td colspan="3"></td>
                    <td class="text-right">Subtotal</td>
                    <td class="text-right"><pascal :amount="operation.amount.toPositive()"></pascal></td>
                  </tr>
                  <tr class="fee">
                    <td colspan="3"></td>
                    <td class="text-right">Fee</td>
                    <td class="text-right"><pascal :amount="operation.fee.toPositive()"></pascal></td>
                  </tr>
                  <tr class="total">
                    <td colspan="3"></td>
                    <td class="text-right">Total</td>
                    <td class="text-right"><pascal :amount="operation.senders[0].amount.toPositive()"></pascal></td>
                  </tr>
                  </tbody>
                </table>
                </div>
              </div>
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
import AccountNumber from '../components/AccountNumber.vue';
import BlockNumber from '../components/BlockNumber.vue';
import Pascal from '../components/Pascal.vue';
import InfoValue from '../components/InfoValue.vue';
import Date from '../components/Date.vue';
import PublicKey from '../components/PublicKey.vue';
import OperationType from '../components/OperationType.vue';
import Payload from '../components/Payload.vue';
import OperationText from '../components/OperationText.vue';
import Social from '../components/Social.vue';
import Disqus from '../components/Disqus.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'operation',
  components: {
    OperationType,
    PublicKey,
    AccountNumber,
    Pascal,
    BlockNumber,
    InfoValue,
    Date,
    Payload,
    OperationText,
    Social,
    Disqus,
    Loading,
  },
  methods: {
    redirect(ophash) {
      this.$router.push({
        name: 'operation',
        params: {
          ophash,
        },
      });
    },
    fetchData(ophash) {
      return this.fetchOperationData({
        ophash,
      });
    },
    ...mapActions('operation', [
      'fetchOperationData',
    ]),
  },
  computed: {
    ...mapState({
      operation: state => state.operation.operation,
      block: state => state.operation.block,
    }),
  },
  created() {
    this.fetchData(this.$route.params.ophash);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.params.ophash).then(() => {
      next();
    });
  },
};
</script>

<style scoped lang="scss">
  @import "./../assets/settings";
  .page-header {
    background-color: $pasc-color-operations;
  }
</style>
