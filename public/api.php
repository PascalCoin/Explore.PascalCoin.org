<?php

/**
 * Executes a single JSON RPC request and returns the 'result' key from the response or
 * throws an exception that will bring the faucet to an abrupt hold.
 *
 * @param string $method The name of the method.
 * @param array $params The list of parameters to send.
 * @throws \Exception
 * @return mixed
 */
function rpc(string $method, array $params = [])
{
    static $id = 0;

    $rpc = [
        'id' => $id++,
        'jsonrpc' => '2.0',
        'method' => $method,
        'params' => $params,
    ];

    $ch = curl_init('http://46.101.96.95/server/api/node.php');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($rpc));

    $response = curl_exec($ch);
    \curl_close($ch);
    if ($response === false) {
        die('Unable to connect to ' . getenv('NODE'));
    }

    $result = json_decode($response, true);
    if(isset($result['result'])) {
        return $result['result'];
    }

    if(isset($result['error'])) {
        throw new \Exception($result['error']['message'], $result['error']['code']);
    }

    die('Invalid result: ' . print_r($result, true));
}

switch($_SERVER['QUERY_STRING']) {
    case 'blockcount':
        echo rpc('getblockcount');
        exit;
    case 'coinsupply':
        $blockCount = rpc('getblockcount');
        $supply = (210239 * 100) + ($blockCount - 210238) * 50;
        echo $supply;
        exit;
    case 'accountsupply':
        $blockCount = rpc('getblockcount');
        echo $blockCount * 5;
        exit;

}
exit;
