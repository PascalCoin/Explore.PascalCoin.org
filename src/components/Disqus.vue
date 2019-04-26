<template>
    <div class="row">
        <div class="col-md-12">
            <h3 class="title">Comments</h3>
            <button v-if="visible === false"  class="btn btn-primary" v-on:click="showComments">Show comments & load social sharing</button>
            <div v-if="visible === true" id="disqus_thread"></div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'disqus',
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showComments() {
      this.visible = true;
      const d = document; const
        s = d.createElement('script');
      s.src = 'https://pascalcoin-explorer.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    },
  },
};
</script>
