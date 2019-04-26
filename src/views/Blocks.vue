<template>
  <div class="insite">
      <social></social>
    <div class="page-header header-filter">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h1 class="title">Blocks</h1>
            <p>Latest block {{latestBlock}}</p>
            <pagination
                    :total-pages="Math.floor(blockCount / 10)"
                    :total="blockCount"
                    :per-page="10"
                    :current-page="blocksPage"
                    @pagechanged="onPageChange"
                    class="blocks"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="main main-raised">
          <div class="row">
            <div class="col-md-12">
              <blocks-list v-bind:blocks="blocks"></blocks-list>
              <pagination
                      :total-pages="Math.floor(blockCount / 10)"
                      :total="blockCount"
                      :per-page="10"
                      :current-page="blocksPage"
                      @pagechanged="onPageChange"
                      class="blocks"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import BlocksList from '../components/BlocksList.vue';
import Pagination from '../components/Pagination.vue';
import Social from '../components/Social.vue';

export default {
  name: 'blocks',
  data() {
    return {
      blocksPage: 1,
      blocksAmount: 10,
    };
  },
  components: {
    BlocksList,
    Pagination,
    Social,
  },
  methods: {
    onPageChange(page) {
      this.blocksPage = page;
      this.redirect();
    },
    redirect() {
      this.$router.push({
        name: 'blocks',
        query: {
          blocks_page: this.blocksPage,
        },
      });
    },
    fetchData() {
      if (this.latestBlock > 0) {
        return this.fetchBlocks({
          blocksPage: this.blocksPage,
          blocksAmount: this.blocksAmount,
          latestBlock: this.latestBlock,
        });
      }
    },
    ...mapActions('blocks', [
      'fetchBlocks',
    ]),
  },
  watch: {
    latestBlock() {
      this.fetchData();
    },
  },
  computed: {
    ...mapState({
      blocks: state => state.blocks.blocks,
      blockCount: state => state.blockCount,
      latestBlock: state => state.latestBlock,
    }),
  },
  created() {
    this.blocksPage = parseInt(this.$route.query.blocks_page, 10) || 1;
    this.fetchData();
  },
  beforeRouteUpdate(to, from, next) {
    this.blocksPage = parseInt(to.query.blocks_page, 10) || 1;
    this.fetchData().then(() => {
      next();
    });
    // next();
  },
};
</script>

<style scoped lang="scss">
  @import "./../assets/settings";
  .page-header {
    background-color: $pasc-color-block;
  }
</style>
