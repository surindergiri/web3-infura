var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var nodeUrl = 'https://kovan.infura.io/v3/d7145880fb554b8788856147b1d9efc8';

//console.log(Web3.modules);

var myWallet = '0x3314bf4b1286f495b1fe8908f7d0f05d8818b168';


if(typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
}else{
    web3 = new Web3( new Web3.providers.HttpProvider(nodeUrl));
}
//var a = web3.eth.accounts.create();
//console.log(a);

async function get_Balance(wallet){
    //Get Balance
    var bal = await web3.eth.getBalance(wallet);
    console.log(bal)
}

get_Balance(myWallet);

var contractAdrs = '0xB9641a1E4017B64724B6b51Eb6e4CF4e7451C408'; //Kovan
//Interact with Smart Contract
var myContract = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimalFactor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
, contractAdrs);

//myContract.options;
// myContract.options =  {
//     //address: '0xe5bc1fc510e418dafa292e5daba98c2f72746b4b',
//     //jsonInterface: [],
//     from: '0x3314bf4b1286f495b1fe8908f7d0f05d8818b168',
//     gasPrice: '10000000000000',
//     gas: 1000000
// }

var AtulAddress = '0x5d034cdeffbc9a73754f823f7c44129420174403';
myContract.options.from = AtulAddress; // default from address
myContract.options.gasPrice = '20000000000000'; // default gas price in wei
myContract.options.gas = 5000000; // provide as fallback always 5M gas

async function getName(){
    //console.log(myContract);
    var d = await myContract.methods.name().call({from: AtulAddress},function(error,result){
        console.log("result",result);
    });
}

async function getCount(){
    var d = await myContract.methods.totalSupply().call({from: AtulAddress},function(error,result){
        console.log("totalSupply",result);
    });
}

async function signERC20Transaction(){

    //Get sender Balance
    console.log("Atul address:",AtulAddress);
    var balance = await web3.eth.getBalance(AtulAddress);
    console.log("eth balance",balance);
    var balInEth =  web3.utils.fromWei(balance.toString(18));
    console.log("balInEth",balInEth);

    //return true;


    var to = '0x3314bf4b1286f495b1fe8908f7d0f05d8818b168'; //send tokens to this address
    var val = 10*1e5; //tokens
    var signData = await myContract.methods.transfer(to,val).encodeABI();
    console.log("signData",signData);

    var rawTx = {
        to: contractAdrs,
        data: signData,
        gasPrice: 5000000000,
        gasLimit: 23000,
    }
    var privateKey = new Buffer('18d67a9514d3bf6ba1a128cd4733dbe4f7b9e69890df4ddc20f3d6237c4ebbc9','hex'); //Atul address private key
    var tx = new Tx(rawTx);
    console.log("tx",tx);

    tx.sign(privateKey);
    var serializedTx = tx.serialize();
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('receipt', console.log);
}
getName();
getCount();
signERC20Transaction();