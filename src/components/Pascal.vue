<template>
  <span>
  <span class="pasc" v-if="lif != amount.value.toFixed(0)">{{amount.value.toFixed(decimals !== undefined ? decimals : 4)}} PASC</span>
  <span v-if="lif == amount.value.toFixed(0)">{{liflabel}}</span>
    </span>
</template>

<script>
export default {
  name: 'pascal',
  props: ['amount', 'decimals', 'lif', 'liflabel'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    code {
        font-family: inherit;
    }
</style>
