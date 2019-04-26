export default {
  namespaced: true,
  state: {
    accounts: [],
  },
  mutations: {
    setAccounts(state, accounts) {
      // eslint-disable-next-line
      state.accounts = accounts;
    },
  },
  actions: {
    async fetchAccounts({ commit, dispatch }, { accountsPage, accountsAmount }) {
      const accounts = await dispatch('listAccounts', {
        page: accountsPage,
        amount: accountsAmount,
      }, { root: true });

      commit('setAccounts', accounts);
    },
  },
};
