<template>
    <div class="table-responsive">
        <table class="table table-striped" style="width: 100%;">
            <thead>
            <tr>
                <th>Op-Block</th>
                <th>Block</th>
                <th>Time</th>
                <th>Type</th>
                <th class="text-right">Amount</th>
                <th class="text-right">Fee</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="operation in operations">
            <tr>
                <td v-if="operation.isPending() && !operation.isBlockchainReward()" colspan="2">
                    <operation-link label="Pending" :ophash="operation.opHash"></operation-link>
                </td>
                <td v-if="!operation.isPending() && !operation.isBlockchainReward()">
                    <operation-link :label="operation.opblock + '/' + operation.block" :ophash="operation.opHash"></operation-link>
                </td>
                <td v-if="!operation.isPending() && operation.isBlockchainReward()">
                    <block-number :block="operation.block"></block-number>
                </td>
                <td v-if="!operation.isPending()">
                    <block-number :block="operation.block"></block-number>
                </td>
                <td>
                    <span v-if="operation.time === 0">XXX</span>
                    <date v-if="operation.time > 0" :timestamp="operation.time"></date>
                </td>
                <td width="100%">
                    <operation-type :operation="operation"></operation-type>
                    <payload v-if="operation.payload.length > 0" :value="operation.payload"></payload>
                </td>
                <td class="text-right">
                    <pascal :amount="operation.amount.toPositive()"></pascal>
                </td>
                <td><pascal :amount="operation.fee.toPositive()"></pascal></td>
            </tr>
            <tr>
                <td colspan="10"><strong><operation-text-short :operation="operation"></operation-text-short></strong></td>
            </tr>
            </template>
            </tbody>
        </table>
        <div v-if="operations.length === 0" class="alert bg-light">
            <div class="container">
                <div class="alert-icon">
                    <i class="material-icons">info_outline</i>
                </div>
                <b>Info:</b> No operations found.
            </div>
        </div>
    </div>

</template>

<script>
import Pascal from './Pascal.vue';
import OperationType from './OperationType.vue';
import Date from './Date.vue';
import BlockNumber from './BlockNumber.vue';
import OperationLink from './OperationLink.vue';
import OperationTextShort from './OperationTextShort.vue';
import Payload from './Payload.vue';

export default {
  name: 'operations-list',
  props: ['operations'],
  components: {
    BlockNumber,
    Pascal,
    OperationType,
    Date,
    OperationLink,
    Payload,
    OperationTextShort,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
