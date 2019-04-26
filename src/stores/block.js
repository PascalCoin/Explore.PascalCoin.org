import Currency from 'pascalcoin/src/Types/Currency';

export default {
  namespaced: true,
  state: {
    block: null,
    operations: [],
    accounts: [],
    doesNotExist: false,
},
  mutations: {
    setBlock(state, block) {
      // eslint-disable-next-line
      if(block !== null) {
        if (block.raw.explorer.stats.volume !== undefined) {
          block.raw.explorer.stats.volume = Currency.fromMolina(block.raw.explorer.stats.volume);
        } else {
          block.raw.explorer.stats = {
            volume: new Currency(-1),
          };
        }
      }

      state.block = block;
    },
    setOperations(state, operations) {
      // eslint-disable-next-line
      // eslint-disable-next-line
      state.operations = operations.map((op) => {
        let state_before = {
          balance: new Currency(-1),
        };
        let state_after = {
          balance: new Currency(-1),
        };
        if (op.raw.explorer.state_before !== null) {
          state_before = op.raw.explorer.state_before;
          state_before.balance = new Currency(state_before.balance);
        }

        if (op.raw.explorer.state_after !== null) {
          state_after = op.raw.explorer.state_after;
          state_after.balance = new Currency(state_after.balance);
        }
        op.raw.explorer = {
          state_before, state_after,
        };
        return op;
      });
    },
    setAccounts(state, accounts) {
      // eslint-disable-next-line
      state.accounts = accounts;
    },
    setDoesNotExist(state, doesNotExist) {
      // eslint-disable-next-line
      state.doesNotExist = doesNotExist;
    },
  },
  actions: {
    async fetchBlockData({ commit, dispatch }, { blockNumber }) {
      commit('setDoesNotExist', false);
      commit('setBlock', null);
      dispatch('fetchBlock', blockNumber, { root: true }).then((block) => {
        commit('setBlock', block);
        dispatch('fetchAccounts', block.createdAccounts, { root: true }).then((accounts) => {
          commit('setAccounts', accounts);
        });
      }).catch(() => {
        commit('setDoesNotExist', true);
      });
    },
    async fetchBlockOperations({ commit, dispatch }, { blockNumber, operationsPage, operationsAmount }) {
      dispatch('fetchBlockOperations', {
        blockNumber,
        page: operationsPage,
        amount: operationsAmount,
      }, { root: true }).then((operations) => {
        commit('setOperations', operations);
      });
    },
  },
};
