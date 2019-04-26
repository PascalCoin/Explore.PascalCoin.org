<template>
  <div id="app" :class="{ 'nav-open': menuVisible, 'nav-open-absolute': menuVisible }">
    <div id="bodyClick" v-if="menuVisible"></div>
    <nav class="navbar  bg-white   fixed-top  navbar-expand-lg " id="sectionsNav">
      <div class="container">
        <div class="navbar-translate">
          <router-link
                  :to="{name: 'home'}"
                  class="navbar-brand"
          >
            <img src="https://www.pascalcoin.org/images/logo.png" style="margin-top: -10px"/>
          </router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation" v-on:click="toggleMenu" :class="{ 'toggled': menuVisible }">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
            <span class="navbar-toggler-icon"></span>
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="search-toggler d-md-none" style="position: absolute; right: 55px;" v-on:click="toggleSearch"><i class="fas fa-search"></i>
          </a>
        </div>
        <div class="collapse navbar-collapse show">
          <p class="bootstrap-tagsinput rose-badge">
            <router-link
                    :to="{name: 'home'}"
                    class="tag badge"
                    v-on:click.native="toggleMenu && hideSearch()">
              Block: {{latestBlock}} &raquo; {{blockCount}} | Pendings: {{pendingCount}}
            </router-link>

          </p>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link
                      :to="{name: 'home'}"
                      class="nav-link"
                      v-on:click.native="toggleMenu && hideSearch()">
                <i class="fas fa-home"></i> Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                      :to="{name: 'blocks'}"
                      class="nav-link"
                      v-on:click.native="toggleMenu && hideSearch()">
                <i class="fa fa-square"></i> Blocks
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                      :to="{name: 'accounts'}"
                      class="nav-link"
                      :activeClass="'active'"
                      v-on:click.native="toggleMenu && hideSearch()">
                <i class="fa fa-user"></i> Accounts
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" v-on:click="toggleSearch()"><i class="fas fa-search"></i> Search</a>
            </li>
            <!--li class="dropdown nav-item" :class="{ show: chartsMenuOpen }">
              <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="true" v-on:click="chartsMenuOpen = !chartsMenuOpen">
                <i class="material-icons">apps</i> Statistics
                <div class="ripple-container"></div></a>
              <div class="dropdown-menu dropdown-with-icons" :class="{show: chartsMenuOpen}">
                <router-link
                        :to="{name: 'charts-operations'}"
                        class="dropdown-item"
                        v-on:click.native="chartsMenuOpen = !chartsMenuOpen">
                    <i class="fa fa-square" style="font-size:20px; margin-right: 18px;"></i> Operations
                    <div class="ripple-container"></div>
                </router-link>
                <a href="./index.html" class="dropdown-item">
                  <i class="material-icons">line_style</i> All Components
                </a>
                <a href="http://demos.creative-tim.com/material-kit-pro/docs/2.1/getting-started/introduction.html" class="dropdown-item">
                  <i class="material-icons">content_paste</i> Documentation
                </a>
              </div>
            </li-->
          </ul>
        </div>
      </div>
    </nav>
  <div style="background-color: #f0f0f0; margin-top: 75px;" v-if="searchVisible">
    <div class="container">
  <div class="row">
    <div class="col-md-12 ml-auto mr-auto">
      <h4 class="title mb-0">Search<i class="fas fa-times" style="float: right; cursor: pointer;" v-on:click="toggleSearch"></i></h4>
      <div class="card card-raised card-form-horizontal mt-0">
        <div class="card-body ">
          <form>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group bmd-form-group">
                  <input ref="searchField" v-model="search" type="text" value="" placeholder="Enter Block, Account, OpHash.." class="form-control search" style="">
                </div>
              </div>
            </div>
          </form>
          <h5 class="title mt-0 mb-0"><i class="fas fa-spinner fa-spin" v-if="searchOperationActive"></i> Operation</h5>
          <span v-if="searchOperationError !== null">{{searchOperationError}}</span>
          <span v-if="searchOperationError === null && searchOperation === null && search !== ''">No operation found.</span>
          <span v-if="searchOperationError === null && searchOperation === null && search === ''">Enter search above.</span>
          <div v-if="searchOperationError === null && searchOperation !== null" v-on:click="hideSearch()">
            <operation-link :label="searchOperation.opHash.encode().toHex()" :ophash="searchOperation.opHash"></operation-link> - <date :timestamp="searchOperation.time"></date><br />
          </div>
          <h5 class="title mt-0 mb-0"><i class="fas fa-spinner fa-spin" v-if="searchAccountsActive"></i> Accounts</h5>
          <span v-if="searchAccountsError !== null">{{searchAccountsError}}</span>
          <span v-if="searchAccountsError === null && this.searchAccounts.length === 0 && this.search !== ''">No accounts found.</span>
          <span v-if="searchAccountsError === null && this.searchAccounts.length === 0 && this.search === ''">Enter search above.</span>
          <ul v-if="searchAccountsError === null">
            <li v-for="searchAccount in searchAccounts" v-on:click="hideSearch()">
              <account-number :account="searchAccount.account"></account-number><span v-if="searchAccount.name !== ''"> - {{searchAccount.name}}</span>
            </li>
          </ul>
          <h5 class="title mt-0 mb-0"><i class="fas fa-spinner fa-spin" v-if="searchBlocksActive"></i>Blocks</h5>
          <span v-if="searchBlocksError !== null">{{searchBlocksError}}</span>
          <span v-if="searchBlocksError === null && this.searchBlocks.length === 0 && this.search !== ''">No blocks found.</span>
          <span v-if="searchBlocksError === null && this.searchBlocks.length === 0 && this.search === ''">Enter search above.</span>
          <ul v-if="searchBlocksError === null">
            <li v-for="searchBlock in searchBlocks" v-on:click="hideSearch()">
              <block-number :block="searchBlock.block"></block-number> - <date :timestamp="searchBlock.timestamp"></date>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
    <router-view/>
    <footer class="footer footer-white footer-big">
      <div class="container">
        <div class="content">
          <div class="row">
            <div class="col-md-12 text-center">
              <img src="https://www.pascalcoin.org/images/logo.png" />
              <hr />
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <h5>About Us</h5>
              <ul class="links-vertical">
                <li>
                  <a href="https://www.pascalcoin.org">
                    pascalcoin.org
                  </a>
                </li>
                <li>
                  <a href="https://freepasa.org">
                    Freepasa.org
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-4">
              <h5>Markets</h5>
              <ul class="links-vertical">
                <li>
                  <a href="https://www.poloniex.com">
                    Poloniex
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-4">
              <h5>Follow or Join Us</h5>
              <ul class="social-buttons">
                <li>
                  <a href="https://www.twitter.com/PascalCoin" class="btn btn-just-icon btn-link btn-twitter">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/PascalCoinOfficial/" class="btn btn-just-icon btn-link btn-facebook">
                    <i class="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/sJqcgtD" class="btn btn-just-icon btn-link btn-discord">
                    <i class="fab fa-discord"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.reddit.com/r/pascalcoin" class="btn btn-just-icon btn-link btn-reddit">
                    <i class="fab fa-reddit"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr>
        <div class="copyright pull-center">
          Copyright © 2019 pascalcoin.org
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

import AccountObj from 'pascalcoin/src/Types/Account';
import BlockObj from 'pascalcoin/src/Types/Block';
import OperationObj from 'pascalcoin/src/Types/Operation';
import { mapActions, mapState } from 'vuex';
import rpc from './pascal/rpc.js';
import AccountNumber from './components/AccountNumber.vue';
import BlockNumber from './components/BlockNumber.vue';
import Date from './components/Date.vue';
import OperationLink from './components/OperationLink.vue';
import OperationType from './components/OperationType.vue';

export default {
  data() {
    return {
      search: '',
      searchAccounts: [],
      searchAccountsActive: false,
      searchAccountsError: null,
      searchBlocks: [],
      searchBlocksError: null,
      searchBlocksActive: false,
      searchOperation: null,
      searchOperationActive: false,
      searchOperationError: null,
      timer: null,
      searchVisible: false,
      iv1: null,
      iv2: null,
      menuVisible: false,
      chartsMenuOpen: false,
    };
  },
  components: {
    OperationType,
    OperationLink,
    BlockNumber,
    AccountNumber,
    Date,
  },
  created() {
    this.fetchBlockCount();
    this.fetchPendingCount();
    if (this.iv1 === null) {
      this.iv1 = setInterval(() => this.fetchBlockCount(), 5000);
    }
    if (this.iv2 === null) {
      this.iv2 = setInterval(() => this.fetchPendingCount(), 5000);
    }
  },
  methods: {
    ...mapActions([
      'fetchBlockCount',
      'fetchPendingCount',
    ]),
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
      if (this.menuVisible) {
        // setTimeout(function() {
        //  $toggle.removeClass('toggled');
        // }, 550);
      } else {
        // setTimeout(function() {
        //  $toggle.addClass('toggled');
        // }, 580);
      }
    },
    toggleSearch() {
      this.searchVisible = !this.searchVisible;
      if (this.menuVisible) {
        this.menuVisible = false;
      }
      if (this.searchVisible) {
        setTimeout(() => this.$refs.searchField.focus(), 200);
      }
    },
    hideSearch() {
      this.searchVisible = false;

      if (this.menuVisible) {
        this.menuVisible = false;
      }
    },
    performSearch() {
      this.searchAccountsError = null;
      this.searchAccountsActive = false;
      this.searchBlockError = null;
      this.searchBlocksActive = false;
      this.searchAccounts = [];
      this.searchBlocks = [];
      this.searchOperation = null;
      this.searchOperationActive = false;
      this.searchOperationError = null;
      if (this.search.trim() === '') {
        return;
      }
      if (this.search.match(/^\d+$/)) {
        const num = parseInt(this.search, 10);
        if (num > this.latestBlock) {
          this.searchBlockError = `Number larger as the available number of blocks (${this.latestBlock}).`;
        } else {
          this.searchBlocksActive = true;
          const searchBlockNumbers = [num];
          for (let i = 1; i <= 4; i++) {
            const suggestion = parseInt(`${num}${'0'.repeat(i)}`, 10);
            if (suggestion < this.latestBlock) {
              searchBlockNumbers.push(suggestion);
            }
          }
          Promise.all(searchBlockNumbers.map(blockNumber => rpc.getBlock(blockNumber).executeTransformItem(BlockObj))).then((blocks) => {
            this.searchBlocksActive = false;
            this.searchBlocks = blocks;
          });
        }
        if (num > this.accountCount) {
          this.searchAccountsError = `Number larger as the available number of Accounts (${this.accountCount}).`;
        } else {
          this.searchAccountsActive = true;
          const searchAccountNumbers = [num];
          for (let i2 = 1; i2 <= 4; i2++) {
            const suggestion = parseInt(`${num}${'0'.repeat(i2)}`, 10);
            if (suggestion < this.accountCount) {
              searchAccountNumbers.push(suggestion);
            }
          }
          Promise.all(searchAccountNumbers.map(accountNumber => rpc.getAccount(accountNumber).executeTransformItem(AccountObj))).then((accounts) => {
            this.searchAccounts = accounts;
            this.searchAccountsActive = false;
          });
        }
      } else if (this.search.length === 64) {
        this.searchOperationError = null;
        this.searchOperationActive = true;
        rpc.findOperation(this.search).executeTransformItem(OperationObj).then((op) => {
          this.searchOperationActive = false;
          if (op === undefined) {
            this.searchOperationError = 'Operation not found.';
          } else {
            this.searchOperation = op;
          }
        });
      } else {
        this.searchOperationError = 'Not a valid operation hash.';
        this.searchAccountsActive = true;
        const request = rpc.findAccounts(this.search, -1, false, false);
        request.start = 0;
        request.max = 5;
        request.executeTransformArray(AccountObj).then((accounts) => {
          this.searchAccounts = accounts;
          this.searchAccountsActive = false;
        });
      }
    },
  },
  computed: {
    ...mapState({
      pendingCount: state => state.pendingCount,
      blockCount: state => state.blockCount,
      latestBlock: state => state.latestBlock,
      accountCount: state => state.accountCount,
    }),
  },
  watch: {
    search() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setTimeout(() => this.performSearch(), 250);
    },
  },
};

</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
@import "assets/material-kit";
@import "assets/settings";

body {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23a899bf' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}

.page-header {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  background-position: left top !important;
  background-size: inherit !important;
}

.home .page-header {
  @media (min-width: 768px) {
    height: 60vh;
  }
}

.text-white small {
  color: white !important;
}

.insite .page-header {
  h1 {
    margin-top: -15vh !important;
    margin-bottom: 0;
  }
  height: 42vh;
  @media (max-width: 768px) {
    height: 60vh;
    h1 {
      margin-top: -18vh !important;
    }
  }
}


.form-control.search {
  font-family: monospace;
  font-size: 1.1rem;
}

.btn i {
  margin-right: 10px;
}

dd {
  font-family: monospace;
}

dt {
  text-transform: uppercase;
}

td, th {
  white-space: nowrap;
}

td.pubkey {
  white-space: normal;
  word-break: break-all;
}

thead tr th {
  border-bottom: 3px solid #3C4858 !important;
}
tr th {
  font-weight: bold !important;
}


.pasc {
  font-family: 'Roboto Mono', monospace !important;
  font-weight: bold;
}
td .pasc {
  font-size: .9rem;
}

.info {
  max-width: none;
  padding: 0;
}

td {
  vertical-align: top !important;
}

.block-color {
  color: $pasc-color-block !important;
}
.block-bgcolor {
  background-color: $pasc-color-block !important;
  dt, dd {
    color: white !important;
  }
}
.block-color-dark {
  color: $pasc-color-block-dark !important;
}
.block-bgcolor-dark {
  background-color: $pasc-color-block-dark !important;
  dt, dd, small {
    color: white !important;
  }
}
.account-color {
  color: $pasc-color-account !important;
}
.account-bgcolor {
  background-color: $pasc-color-account !important;
}
.account-color-dark {
  color: $pasc-color-account-dark !important;
}
.account-bgcolor-dark {
  background-color: $pasc-color-operations-dark !important;
}
.operation-color {
  color: $pasc-color-operations !important;
}
.operation-bgcolor {
  background-color: $pasc-color-operations !important;
}
.operation-color-dark {
  color: $pasc-color-operations-dark !important;
}
.operation-bgcolor-dark {
  background-color: $pasc-color-operations-dark !important;
  dt, dd, small {
    color: white !important;
  }
}

.btn-block-color {
    background-color: $pasc-color-block;
}
.btn-account-color {
    background-color: $pasc-color-account;
}

dt.help i {
  cursor: pointer !important;
}

dd.help {
  color: $pasc-color-misc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: .7rem;
}

.card-body {
  padding: 15px !important;
}

table tr.subtotal {
  border-top: 3px solid #3C4858 !important;
  font-weight: bold;
}
table tr.fee {
  font-weight: bold;
}
table tr.total {
  border-top: 3px solid $pasc-color-operations !important;
  font-weight: bold;
  color: $pasc-color-operations;
}

.main.main-raised {
  margin-top: -25vh;
  min-height: 200px;
  padding: 40px;
  @media (max-width: 768px) {
    padding: 40px 10px;
    margin-top: -30vh;
  }
  box-shadow: 0 8px 12px 1px rgba(0, 0, 0, 0.14), 0 3px 15px 2px rgba(0, 0, 0, 0.12), 0 4px 5px -2px rgba(0, 0, 0, 0.2);
}
  .btn-discord i {
    color: #7289DA;
  }

.modal .modal-dialog {
  margin-top: 75px;
}
@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
}
</style>
