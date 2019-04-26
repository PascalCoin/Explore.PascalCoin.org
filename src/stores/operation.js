import PublicKey from 'pascalcoin/src/Keys/PublicKey';
import Currency from 'pascalcoin/src/Types/Currency';
import AccountNumber from 'pascalcoin/src/Types/AccountNumber';
import OperationHash from 'pascalcoin/src/Types/OperationHash';
import ByteCollection from 'pascalcoin/src/ByteCollection';

export default {
  namespaced: true,
  state: {
    operation: null,
    block: null,
  },
  mutations: {
    setOperation(state, operation) {
      // eslint-disable-next-line
      if(operation !== null) {
        if (operation.raw.explorer.account_states) {
          Object.keys(operation.raw.explorer.account_states)
            .forEach((account) => {
              operation.raw.explorer.account_states[account].before.balance = new Currency(operation.raw.explorer.account_states[account].before.balance);
              operation.raw.explorer.account_states[account].after.balance = new Currency(operation.raw.explorer.account_states[account].after.balance);
              operation.raw.explorer.account_states[account].before.account = new AccountNumber(operation.raw.explorer.account_states[account].before.account);
              operation.raw.explorer.account_states[account].after.account = new AccountNumber(operation.raw.explorer.account_states[account].after.account);
              operation.raw.explorer.account_states[account].before.enc_pubkey = PublicKey.decode(ByteCollection.fromHex(operation.raw.explorer.account_states[account].before.enc_pubkey));
              operation.raw.explorer.account_states[account].after.enc_pubkey = PublicKey.decode(ByteCollection.fromHex(operation.raw.explorer.account_states[account].after.enc_pubkey));
            });
        }
      }
      state.operation = operation;
    },
    setBlock(state, block) {
      // eslint-disable-next-line
      state.block = block;
    },
  },
  actions: {
    async fetchOperationData({ commit, dispatch }, { ophash }) {
      commit('setOperation', null);
      dispatch('fetchOperation', ophash, { root: true }).then((operation) => {
        commit('setOperation', operation);
        dispatch('fetchBlock', operation.block, { root: true }).then((block) => {
          commit('setBlock', block);
        });
      });
    },
  },
};
