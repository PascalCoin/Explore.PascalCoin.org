import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import Operation from 'pascalcoin/src/Types/Operation';
import Account from 'pascalcoin/src/Types/Account';
import Block from 'pascalcoin/src/Types/Block';
import Currency from 'pascalcoin/src/Types/Currency';
import OperationStore from './stores/operation';
import AccountStore from './stores/account';
import AccountsStore from './stores/accounts';
import BlockStore from './stores/block';
import BlocksStore from './stores/blocks';
import ChartsStore from './stores/charts';
import rpc from './pascal/rpc';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account: AccountStore,
    accounts: AccountsStore,
    block: BlockStore,
    blocks: BlocksStore,
    operation: OperationStore,
    charts: ChartsStore,
  },
  state: {
    blockCount: 0,
    latestBlock: 0,
    latestBlocks: 0,
    last100: [],
    accountCount: 0,
    pendings: [],
    pendingCount: 0,
    searchVisible: true,
    supply: new Currency(0),
    allSupply: new Currency(46134321),
  },
  mutations: {
    setBlockCount(state, blockCount) {
      state.blockCount = blockCount;
      state.latestBlock = blockCount - 1;
      state.accountCount = state.latestBlock * 5 + 4;
      state.supply = new Currency((210240 * 100) + ((state.latestBlock - 210240) * 50));
    },
    setPendings(state, pendings) {
      // eslint-disable-next-line
      state.pendings = pendings;
    },
    setPendingCount(state, pendingCount) {
      state.pendingCount = pendingCount;
    },
    setLatestBlocks(state, latestBlocks) {
      state.latestBlocks = latestBlocks.map((b) => {
        if (b.raw.explorer) {
          b.raw.explorer.stats.volume = Currency.fromMolina(b.raw.explorer.stats.volume);
        } else {
          b.raw.explorer = {
            stats: {
              volume: new Currency(-1),
            },
          };
        }

        return b;
      });
    },
    setLast100Blocks(state, last100) {
      state.last100 = last100;
    },
  },
  actions: {
    fetchPendings(context, { total, page, amount }) {
      const request = rpc.getPendings();
      request.start = total > amount ? total - (page * amount) : 0;
      request.max = amount;
      request.executeTransformArray(Operation).then((pendings) => {
        context.commit('setPendings', pendings.reverse());
      });
    },
    fetchPendingCount(context) {
      const requestCount = rpc.getPendingsCount();
      requestCount.execute().then((pendingCount) => {
        context.commit('setPendingCount', pendingCount);
      });
    },
    fetchAccountOperations(context, { account, page, amount }) {
      const request = rpc.getAccountOperations(account, 10000000);
      request.start = page * amount - amount;
      request.max = amount;
      return request.executeTransformArray(Operation);
    },
    fetchAccount(context, account) {
      const request = rpc.getAccount(account);
      return request.executeTransformItem(Account);
    },
    fetchOperation(context, ophash) {
      const request = rpc.findOperation(ophash);
      return request.executeTransformItem(Operation);
    },
    fetchBlock(context, blockNumber) {
      const request = rpc.getBlock(blockNumber);
      return request.executeTransformItem(Block);
    },
    fetchBlockOperations(context, { blockNumber, page, amount }) {
      const request = rpc.getBlockOperations(blockNumber);
      request.start = page * amount - amount;
      request.max = amount;
      return request.executeTransformArray(Operation);
    },
    fetchAccounts(context, accounts) {
      return Promise.all(
        accounts.map(account => rpc.getAccount(account).executeTransformItem(Account)),
      );
    },
    listAccounts(context, { page, amount }) {
      const request = rpc.findAccounts();
      request.start = page * amount - amount;
      request.max = amount;
      return request.executeTransformArray(Account);
    },
    fetchLatestBlocks(context) {
      const request = rpc.getBlocks(5);
      request.executeTransformArray(Block).then((blocks) => {
        context.commit('setLatestBlocks', blocks);
      });
    },
    listBlocks(context, { total, page, amount }) {
      let start = total - (page * amount);
      let end = total - (page * amount) + amount;
      if (end > total) {
        end = total;
      }
      if (start <= 0) {
        start = 1;
      }
      const request = rpc.getBlocks(null, start, end);
      return request.executeTransformArray(Block);
    },
    async fetchLast100({ commit }) {
      commit('setLast100Blocks', (await axios.get('http://46.101.96.95/server/api/last100.php')).data);
    },
    async fetchBlockCount({ commit }) {
      const request = rpc.getBlockCount();
      commit('setBlockCount', await request.execute());
    },
  },
});
