<template>
  <div class="insite">
      <social></social>
    <div class="page-header header-filter">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h1 class="title">Accounts</h1>
            <p>
              {{accountCount}} accounts available until block
              <block-number :block="latestBlock" :complement="true"></block-number>
            </p>
            <pagination
                    :total-pages="Math.ceil(accountCount / accountsAmount)"
                    :total="accountCount"
                    :per-page="accountsAmount"
                    :current-page="accountsPage"
                    @pagechanged="onPageChange"
                    class="accounts"
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
              <accounts-list v-bind:accounts="accounts"></accounts-list>
              <pagination
                      :total-pages="Math.ceil(accountCount / 10)"
                      :total="accountCount"
                      :per-page="10"
                      :current-page="accountsPage"
                      @pagechanged="onPageChange"
                      class="accounts"
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
import AccountsList from '../components/AccountsList.vue';
import Pagination from '../components/Pagination.vue';
import BlockNumber from '../components/BlockNumber.vue';
import Social from '../components/Social.vue';

export default {
  name: 'accounts',
  data() {
    return {
      accountsPage: 1,
      accountsAmount: 10,
    };
  },
  components: {
    BlockNumber,
    AccountsList,
    Pagination,
    Social,
  },
  methods: {
    onPageChange(page) {
      this.accountsPage = page;
      this.redirect();
    },
    redirect() {
      this.$router.push({
        name: 'accounts',
        query: {
          accounts_page: this.accountsPage,
        },
      });
    },
    fetchData() {
      return this.fetchAccounts({
        accountsPage: this.accountsPage,
        accountsAmount: this.accountsAmount,
      });
    },
    ...mapActions('accounts', [
      'fetchAccounts',
    ]),
  },
  watch: {
    accountCount() {
      this.fetchData();
    },
  },
  computed: {
    ...mapState({
      accounts: state => state.accounts.accounts,
      accountCount: state => state.accountCount,
      latestBlock: state => state.latestBlock,
    }),
  },
  created() {
    this.accountsPage = parseInt(this.$route.query.accounts_page, 10) || 1;
    this.fetchData();
  },
  beforeRouteUpdate(to, from, next) {
    this.accountsPage = parseInt(to.query.accounts_page, 10) || 1;
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
    background-color: $pasc-color-account;
  }
</style>
