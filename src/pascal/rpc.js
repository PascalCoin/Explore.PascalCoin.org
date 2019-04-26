/* eslint-disable */
import Client from 'pascalcoin/src/RPC/Client';
import Executor from 'pascalcoin/src/RPC/Executor';
import Caller from 'pascalcoin/src/RPC/Caller';

export default new Client(
  new Executor(
    new Caller('http://46.101.96.95/server/api/node.php'),
    100,
  ),
);
