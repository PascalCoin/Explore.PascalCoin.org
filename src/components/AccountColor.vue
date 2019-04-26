<template>
  <div :style="style"></div>
</template>

<script>
const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
];

export default {
  name: 'account-color',
  data() {
    return {
      style: {
        width: '10px',
        height: '10px',
      },
    };
  },
  props: ['age'],
  methods: {
    setColorForPercentage(pct) {
      for (let i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
          break;
        }
      }
      const lower = percentColors[i - 1];
      const upper = percentColors[i];
      const range = upper.pct - lower.pct;
      const rangePct = (pct - lower.pct) / range;
      const pctLower = 1 - rangePct;
      const pctUpper = rangePct;
      const color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
      };
      this.style.backgroundColor = `rgb(${[color.r, color.g, color.b].join(',')})`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
