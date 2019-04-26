import Currency from 'pascalcoin/src/Types/Currency';

export default {
  namespaced: true,
  state: {
    blocks: [],
  },
  mutations: {
    setBlocks(state, blocks) {
      // eslint-disable-next-line
      state.blocks = blocks.map((b) => {
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
  },
  actions: {
    async fetchBlocks({ commit, dispatch }, { latestBlock, blocksPage, blocksAmount }) {
      const blocks = await dispatch('listBlocks', {
        total: latestBlock,
        page: blocksPage,
        amount: blocksAmount,
      }, { root: true });

      commit('setBlocks', blocks);
    },
  },
};
