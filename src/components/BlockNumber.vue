<template>
  <router-link
          :to="{name: 'block', params: { block: block }}"
          :class="{ complement }">
    {{label || block}}
  </router-link>
</template>

<script>
export default {
  name: 'block-number',
  props: ['block', 'complement', 'label'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/settings.scss";

a {
  font-family: "Roboto Slab", "Times New Roman", serif;
  font-weight: bold;
  color: $pasc-color-block;
  &.complement {
    color: white;
  }
}
</style>
