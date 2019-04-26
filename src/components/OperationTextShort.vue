<template>
<span>
  <span v-if="operation.isBlockchainReward()">
    Blockchain Reward
  </span>
  <span v-if="operation.isTransaction()">

    <span v-if="operation.subtype === 12">
      <i class="fas fa-arrow-right"></i>
      <account-number :account="operation.receivers[0].account"></account-number> received
      <pascal :amount="operation.receivers[0].amount"></pascal> from
      <account-number :account="operation.senders[0].account"></account-number>.
    </span>
    <span v-if="operation.subtype === 11">
      <i class="fas fa-arrow-left"></i>
      <account-number :account="operation.senders[0].account"></account-number> sent
      <pascal :amount="operation.receivers[0].amount"></pascal> to
      <account-number :account="operation.receivers[0].account"></account-number>.
    </span>
   </span>
  <span v-if="operation.isChangeKey()">
    <i class="fas fa-user-lock"></i> Changed key of <account-number :account="operation.changers[0].account"></account-number> to a {{operation.changers[0].newPublicKey.curve.name}} key.
  </span>
  <span v-if="operation.isRecoverFunds()">
    Recover funds
  </span>
  <span v-if="operation.isListForSale()">
    <i class="fas fa-shopping-cart"></i> Account <account-number :account="operation.changers[0].account"></account-number> listed for <pascal
          :amount="operation.changers[0].accountPrice"></pascal>
  </span>
  <span v-if="operation.isDelist()">
    <span class="fa-stack fa-2x">
      <i class="fas fa-shopping-cart fa-stack-1x"></i>
      <i class="fas fa-ban fa-stack-2x" style="color:Tomato"></i>
    </span>
    Account <account-number :account="operation.changers[0].account"></account-number> delisted.
  </span>
  <span v-if="operation.isBuy()">
    <i class="fas fa-cash-register"></i> Account <account-number
          :account="operation.changers[0].account"></account-number> bought by
      <account-number :account="operation.account"></account-number> for <pascal
          :amount="operation.receivers[1].amount"></pascal>
    from <account-number
          :account="operation.receivers[1].account"></account-number>.
  </span>
  <span v-if="operation.isChangeKeyAccount()">
    <i class="fas fa-user-lock"></i> Changed key of account <account-number
          :account="operation.changers[0].account"></account-number> by <account-number
          :account="operation.signerAccount"></account-number>
    to {{operation.changers[0].newPublicKey.curve.name}}.
  </span>
  <span v-if="operation.isChangeAccountInfo()">
    <i class="fas fa-cogs"></i> Account <account-number
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
  </span>
  <span v-if="operation.isMultiOperation()">
    <i class="fas fa-exchange-alt"></i> {{operation.senders.length}} accounts (
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
  name: 'operation-text-short',
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
