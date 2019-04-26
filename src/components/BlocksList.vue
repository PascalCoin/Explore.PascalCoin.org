<template>
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th>Date</th>
                <th>Miner</th>
                <th class="text-right">Operations</th>
                <th class="text-right">Volume</th>
                <th class="text-right">Fee</th>
                <th class="text-right">Reward</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="block in blocks" :key="block.block">
                <td>
                    <block-number :block="block.block"></block-number>
                </td>
                <td>
                    <date :timestamp="block.timestamp"></date><br />
                    <small>Duration: {{ block.raw.explorer.stats.duration}} seconds.</small>
                </td>
                <td>{{block.payload}}</td>
                <td class="text-right">{{block.operations}}</td>
                <td class="text-right"><pascal :amount="block.raw.explorer.stats.volume" :lif="-1" liflabel="Unknown"></pascal></td>
                <td class="text-right"><pascal :amount="block.fee"></pascal></td>
                <td class="text-right"><pascal :amount="block.reward"></pascal></td>
            </tr>
            </tbody>
        </table>
        <div v-if="blocks.length === 0">No blocks</div>
    </div>
</template>

<script>

import Date from './Date';
import BlockNumber from './BlockNumber';
import Pascal from './Pascal';

export default {
  name: 'blocks-list',
  props: ['blocks'],
  components: {
    Date,
    BlockNumber,
    Pascal,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
