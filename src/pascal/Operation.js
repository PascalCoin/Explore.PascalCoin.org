import PascalOperation from 'pascalcoin/src/Types/Operation';

const P_STATE_BEFORE = Symbol('state_before');
const P_STATE_AFTER = Symbol('state_after');

export default class Operation extends PascalOperation {
  constructor(data) {
    super(data);

    if (!data.explorer) {
      return;
    }

    this[P_STATE_BEFORE] = data.explorer.state_before;
    this[P_STATE_AFTER] = data.explorer.state_after;
  }
}
