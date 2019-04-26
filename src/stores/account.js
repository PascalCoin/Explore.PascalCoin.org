import PublicKey from 'pascalcoin/src/Keys/PublicKey';
import Currency from 'pascalcoin/src/Types/Currency';
import Operation from 'pascalcoin/src/Types/Operation';
import ByteCollection from 'pascalcoin/src/ByteCollection';

export default {
  namespaced: true,
  state: {
    account: null,
    operations: [],
    doesNotExist: false,
  },
  mutations: {
    setDoesNotExist(state, doesNotExist) {
      // eslint-disable-next-line
      state.doesNotExist = doesNotExist;
    },
    setAccount(state, account) {
      // eslint-disable-next-line
      state.account = account;

      if(account !== null) {
        account.raw.explorer.public_keys = account.raw.explorer.public_keys.map((pk) => {
          pk.enc_pubkey = PublicKey.decode(ByteCollection.fromHex(pk.enc_pubkey));
          if (pk.op !== undefined) {
            pk.op = new Operation(pk.op);
          }
          return pk;
        });
      }
    },
    setOperations(state, operations) {
      // eslint-disable-next-line
      state.operations = operations;
    },
  },
  actions: {
    async fetchAccountData({ commit, dispatch }, { account }) {
      commit('setDoesNotExist', false);
      commit('setAccount', null);
      Promise.all([
        dispatch('fetchAccount', account, { root: true }),
      ]).then((values) => {
        commit('setAccount', values[0]);
      }).catch(() => commit('setDoesNotExist', true));
    },
    async fetchOperations({ commit, dispatch }, { account, operationsPage, operationsAmount }) {
      dispatch('fetchAccountOperations', {
        account,
        page: operationsPage,
        amount: operationsAmount,
      }, { root: true }).then((values) => {
        commit('setOperations', values);
      });
    },
  },
};
