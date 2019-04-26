<template>
<span>
  <span v-if="operation.isBlockchainReward()">
    Blockchain Reward
  </span>
  <span v-if="operation.isTransaction()">
    Account <account-number
          :account="operation.senders[0].account"> sent </account-number> <pascal
          :amount="operation.receivers[0].amount"></pascal> to
    <account-number :account="operation.receivers[0].account"></account-number>.
      <br/><br/>
      <span v-if="operation.fee.toMolina() < 0">
        <account-number :account="operation.signerAccount"></account-number> payed a total fee of <pascal
              :amount="operation.fee.toPositive()"></pascal>.
      </span>
      <span v-if="operation.fee.toMolina() === 0">
        <account-number :account="operation.signerAccount"></account-number> payed *no* fees.
      </span>
  </span>
  <span v-if="operation.isChangeKey()">
    The key of the account <account-number
          :account="operation.changers[0].account"></account-number> was changed by <account-number
          :account="operation.signerAccount"></account-number>
    to a {{operation.changers[0].newPublicKey.curve.name}} key.
      <br/><br/>
      <span v-if="operation.fee.toMolina() < 0">
        <account-number :account="operation.signerAccount"></account-number> payed a total fee of <pascal
              :amount="operation.fee.toPositive()"></pascal>.
      </span>
      <span v-if="operation.fee.toMolina() === 0">
        <account-number :account="operation.signerAccount"></account-number> payed *no* fees.
      </span>
  </span>
  <span v-if="operation.isRecoverFunds()">
    Recover funds
  </span>
  <span v-if="operation.isListForSale()">
    Account <account-number
          :account="operation.changers[0].account"></account-number> was listed for <pascal
          :amount="operation.changers[0].accountPrice"></pascal>.
    On purchase, the amount will be sent to <account-number
          :account="operation.changers[0].sellerAccount"></account-number>.
      <br/><br/>
      <span v-if="operation.fee.toMolina() < 0">
        <account-number :account="operation.signerAccount"></account-number> payed a total fee of <pascal
              :amount="operation.fee.toPositive()"></pascal>.
      </span>
      <span v-if="operation.fee.toMolina() === 0">
        <account-number :account="operation.signerAccount"></account-number> payed *no* fees.
      </span>
  </span>
  <span v-if="operation.isDelist()">
    Account <account-number
          :account="operation.changers[0].account"></account-number> is no longer listed for sale.
      <br/><br/>
      <span v-if="operation.fee.toMolina() < 0">
        <account-number :account="operation.signerAccount"></account-number> payed a total fee of <pascal
              :amount="operation.fee.toPositive()"></pascal>.
      </span>
      <span v-if="operation.fee.toMolina() === 0">
        <account-number :account="operation.signerAccount"></account-number> payed *no* fees.
      </span>
  </span>
  <span v-if="operation.isBuy()">
      Account <account-number
          :account="operation.changers[0].account"></account-number> was bought by
      <account-number :account="operation.account"></account-number> for <pascal
          :amount="operation.receivers[1].amount"></pascal>
    from <account-number
          :account="operation.receivers[1].account"></account-number>
      <br/><br/>
      <span v-if="operation.receivers[0].amount.toMolina() > 0">
        <account-number :account="operation.account"></account-number> payed <pascal
              :amount="operation.receivers[0].amount"></pascal> too much, that amount was transferred
        to the bought account <account-number
              :account="operation.changers[0].account"></account-number>.
      </span>
      <br/><br/>
      <span v-if="operation.fee.toMolina() < 0">
        <account-number :account="operation.signerAccount"></account-number> payed a total fee of <pascal
              :amount="operation.fee.toPositive()"></pascal>.
      </span>
      <span v-if="operation.fee.toMolina() === 0">
        <account-number :account="operation.signerAccount"></account-number> payed *no* fees.
      </span>

  </span>
  <span v-if="operation.isChangeKeyAccount()">
    The key of the account <account-number
          :account="operation.changers[0].account"></account-number> was changed by <account-number
          :account="operation.signerAccount"></account-number>
    to a {{operation.changers[0].newPublicKey.curve.name}} key.
      <br/><br/>
      <span v-if="operation.fee.toMolina() < 0">
        <account-number :account="operation.signerAccount"></account-number> payed a total fee of <pascal
              :amount="operation.fee.toPositive()"></pascal>.
      </span>
      <span v-if="operation.fee.toMolina() === 0">
        <account-number :account="operation.signerAccount"></account-number> payed *no* fees.
      </span>
  </span>
  <span v-if="operation.isChangeAccountInfo()">
    Account <account-number
          :account="operation.changers[0].account"></account-number>
    <span v-if="operation.changers[0].newName !== null && operation.changers[0].newType === null">
        changed it's name to <code>{{operation.changers[0].newName}}</code>
    </span>
    <span v-if="operation.changers[0].newName === null && operation.changers[0].newType !== null">
        changed it's type to <code>{{operation.changers[0].newType}}</code>
    </span>
    <span v-if="operation.changers[0].newName !== null && operation.changers[0].newType !== null">
      changed it's name to {{operation.changers[0].newName}} and it's type to {{operation.changers[0].newType}}
    </span>
      <br/><br/>
      <span v-if="operation.fee.toMolina() < 0">
        <account-number :account="operation.signerAccount"></account-number> payed a total fee of <pascal
              :amount="operation.fee.toPositive()"></pascal>.
      </span>
      <span v-if="operation.fee.toMolina() === 0">
        <account-number :account="operation.signerAccount"></account-number> payed *no* fees.
      </span>
  </span>
  <span v-if="operation.isMultiOperation()">
    {{operation.senders.length}} accounts (
    <span v-for="(sender, idx) in operation.senders">
      <account-number :account="sender.account"></account-number>
      <span v-if="idx + 1 < operation.senders.length">, </span>
    </span>)
    sent <pascal :amount="operation.amount"></pascal> to
    {{operation.receivers.length}} other accounts (
    <span v-for="(receiver, idx) in operation.receivers">
      <account-number :account="receiver.account"></account-number>
      <span v-if="idx + 1 < operation.receivers.length">, </span>
    </span>)
      <br/><br/>
      <span v-if="operation.fee.toMolina() < 0">
        A total fee of <pascal :amount="operation.fee.toPositive()"></pascal> was paid.
      </span>
      <span v-if="operation.fee.toMolina() === 0">
        No fee was paid.
      </span>
  </span>
  <span v-if="operation.isData()">
    Data Operation.
  </span>
</span>
</template>

<script>

import AccountNumber from './AccountNumber.vue';
import Pascal from './Pascal.vue';

export default {
  name: 'operation-text',
  props: ['operation'],
  components: {
    AccountNumber,
    Pascal,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
