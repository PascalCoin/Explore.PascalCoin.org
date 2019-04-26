<template>
  <span>
  <router-link
          :to="{name: 'account', params: { account: account.account }}"
          :class="{ complement }"
          v-if="!!!hidelink">
    {{account.toString()}}
  </router-link>
    <span v-if="!!hidelink">{{account.toString()}}</span>
    </span>
</template>

<script>
export default {
  name: 'account-number',
  props: ['account', 'complement', 'hidelink'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/settings.scss";
a {
  font-family: "Roboto Slab", "Times New Roman", serif;
  font-weight: bold;
  color: $pasc-color-account;
  &.complement {
    color: white;
  }
}
</style>
