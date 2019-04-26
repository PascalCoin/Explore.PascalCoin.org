<template>
    <span>
        <span v-if="value.toHex().length > 0" style="cursor: pointer;">
            <a href="#" v-on:click.stop.prevent="isVisible = !isVisible">Show Payload</a>
        </span>
        <span v-if="value.toHex().length === 0">
            <i class="fas fa-minus"></i>
        </span>
    <div class="modal fade" :class="{ show: isVisible }" id="noticeModal" tabindex="-1" role="dialog" :style="{display: isVisible ? 'block' : 'none'}" aria-hidden="false">
        <div class="modal-dialog modal-notice" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="title mt-0 mb-1">Payload</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="isVisible = !isVisible">
                <i class="material-icons">clear</i>
              </button>
            </div>
            <div class="modal-body">
              <div class="instruction">
                <div class="row">
                  <div class="col-md-12">
                    <h6 class="title mt-0 mb-0">HexaString</h6>
                    <code class="mb-0" style="word-break: break-all; white-space:normal">{{value.toHex()}}</code>
                  </div>
                </div>
              </div>
              <div class="instruction">
                <div class="row">
                  <div class="col-md-12">
                    <h6 class="title mt-0 mb-0">String</h6>
                    <code class="mb-0" style="word-break: break-all; white-space:normal">{{value.toString()}}</code>
                  </div>
                </div>
              </div>
              <div class="instruction">
                <div class="row">
                  <div class="col-md-12">
                    <h6 class="title mt-0 mb-0">Decrypted</h6>
                    <p>
                        Password: <input v-model="password" placeholder="enter password..">
                      </p>
                    <code class="mb-0" style="word-break: break-all; white-space:normal">{{decrypted}}</code>
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
    </span>

</template>

<script>
import Payload from 'pascalcoin/src/Crypto/Payload';

export default {
  data() {
    return {
      isVisible: false,
      password: '',
    };
  },
  name: 'payload',
  props: ['value'],
  computed: {
    decrypted() {
      const decrypted = Payload.decrypt(this.value.toHex(), this.password);
      if (decrypted === false || decrypted.length === 0) {
        return 'Unable to decrypt payload.';
      }
      return decrypted.toString();
    },
  },
};
</script>
