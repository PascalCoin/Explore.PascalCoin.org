import PascalBlock from 'pascalcoin/src/Types/Block';
import Currency from 'pascalcoin/src/Types/Currency';

const P_EXPLORER_STATS = Symbol('explorer_stats');

export default class Block extends PascalBlock {
  constructor(data) {
    super(data);

    this[P_EXPLORER_STATS] = {};
    if (data.explorer === undefined) {
      return;
    }

    this[P_EXPLORER_STATS] = data.explorer.stats;
    this[P_EXPLORER_STATS].volume = Currency.fromMolina(this[P_EXPLORER_STATS].volume);
    this[P_EXPLORER_STATS].fee = Currency.fromMolina(this[P_EXPLORER_STATS].fee);
    this[P_EXPLORER_STATS].reward = Currency.fromMolina(this[P_EXPLORER_STATS].reward);
  }

  get explorerStats() {
    return this[P_EXPLORER_STATS];
  }
}
