<template>
  <div>
  <span v-if="operation.isBlockchainReward()">
    Blockchain Reward
  </span>
    <span v-if="operation.isTransaction()">
    Transaction
    </span>
    <span v-if="operation.isChangeKey()">
    Change key
  </span>
    <span v-if="operation.isRecoverFunds()">
    Recover funds
  </span>
    <span v-if="operation.isListForSale()">
    List account for sale
  </span>
    <span v-if="operation.isDelist()">
    Delist
  </span>
    <span v-if="operation.isBuy()">
    Buy account
  </span>
    <span v-if="operation.isChangeKeyAccount()">
    Change key account
  </span>
    <span v-if="operation.isChangeAccountInfo()">
    Change account info
  </span>
    <span v-if="operation.isMultiOperation()">
    Multi-Operation
  </span>
    <span v-if="operation.isData()">
    Data
  </span>
  </div>
</template>

<script>

export default {
  name: 'operation-type',
  props: ['operation'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
