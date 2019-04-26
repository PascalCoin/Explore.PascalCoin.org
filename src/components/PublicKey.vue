<template>
  <div>
    <a href="#" v-on:click.stop.prevent="isVisible = !isVisible">Show Public Key</a>
    <div class="modal fade" :class="{ show: isVisible }" id="noticeModal" tabindex="-1" role="dialog" :style="{display: isVisible ? 'block' : 'none'}" aria-hidden="false">
      <div class="modal-dialog modal-notice" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="title mt-0 mb-1">Public Key</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="isVisible = !isVisible">
              <i class="material-icons">clear</i>
            </button>
          </div>
          <div class="modal-body">
            <div class="instruction">
              <div class="row">
                <div class="col-md-12">
                  <h6 class="title mt-0 mb-0">HexaString</h6>
                  <p>{{pubkey.encode().toHex()}}</p>
                  <h6 class="title mt-0 mb-0">Base 58</h6>
                  <p>{{pubkey.toBase58()}}</p>
                  <h6 class="title mt-0 mb-0">Curve</h6>
                  <p>{{pubkey.curve.name}}<br />
                  <b>XL:</b> {{pubkey.xl}}<br />
                  <b>X:</b> {{pubkey.x.toHex()}}<br />
                  <b>YL:</b> {{pubkey.yl}}<br />
                  <b>Y:</b> {{pubkey.y.toHex()}}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer text-center">
            <button type="button" class="btn btn-info btn-round" data-dismiss="modal" v-on:click="isVisible = !isVisible">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'public-key',
  props: ['pubkey'],
  data() {
    return {
      isVisible: false,
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
  a {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: bold;
  }
  &.open {
  }
  .pubkey_value {
    word-break: break-all;
  }
}

</style>
