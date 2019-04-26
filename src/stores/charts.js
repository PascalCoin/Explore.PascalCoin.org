import axios from 'axios';

export default {
  namespaced: true,
  state: {
    daily: null,
    weekly: null,
    monthly: null,
    yearly: null,
  },
  mutations: {
    setDaily(state, daily) {
      // eslint-disable-next-line
      state.daily = daily;
    },
    setMonthly(state, monthly) {
      // eslint-disable-next-line
      state.monthly = monthly;
    },
    setWeekly(state, weekly) {
      // eslint-disable-next-line
      state.weekly = weekly;
    },
    setYearly(state, yearly) {
      // eslint-disable-next-line
      state.yearly = yearly;
    },
  },
  actions: {
    async fetchData({ commit }, type) {
      let data = await axios.get(`http://46.101.96.95/server/api/timeline/${type}.php`);
      data = data.data;
      switch (type) {
        case 'daily':
          commit('setDaily', data);
          break;
        case 'weekly':
          commit('setWeekly', data);
          break;
        case 'monthly':
          commit('setMonthly', data);
          break;
        case 'yearly':
          commit('setYearly', data);
          break;
      }
    },
  },
};
