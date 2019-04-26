<template>
  <div>
    <a href="" :class="{ open: open }" v-on:click="openClose($event)">{{hash.encode().toHex()}}</a>
    <div v-if="open">
      <b>Block:</b> {{hash.block}}<br />
      <b>Account:</b> {{hash.account.toString()}}<br />
      <b>#Operation:</b> {{hash.nOperation}}<br />
      <b>MD160:</b> {{hash.md160}}<br />
    </div>
  </div>
</template>

<script>
export default {
  name: 'operation-hash',
  props: ['hash'],
  data() {
    return {
      open: false,
    };
  },
  methods: {
    openClose(e) {
      e.preventDefault();
      this.open = !this.open;
      return false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../assets/settings.scss";

div {
  cursor: pointer;
}

</style>
