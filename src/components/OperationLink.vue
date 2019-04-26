<template>
  <router-link
          :to="{name: 'operation', params: { ophash: ophash.encode().toHex() }}">
    {{label}}
  </router-link>
</template>

<script>
export default {
  name: 'operation-link',
  props: ['ophash', 'label'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/settings.scss";

a {
  font-family: "Roboto Slab", "Times New Roman", serif;
  font-weight: bold;
  color: $pasc-color-operations;
  &.complement {
    color: white;
  }
}
</style>
