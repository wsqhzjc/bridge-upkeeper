// app/extend/application.js
const Web3 = require('web3');
const WEB3 = Symbol('Application#web3');
const WEB3ONETH = Symbol('Application#web3OnETH');
const PLEDGEBRIDGEBSCCONTRACT = Symbol('Application#pledgBridgeBSCContract');

const pledgeBridgeBSCAbi = require("../abis/pledgeBridgeBSC.json");
const pledgeBridgeBSCAddress = "0xac146f0BfecE6C48e4ac65BbcE687A6c3cC10878";

// Bridge 相关
const privateKey =  "6ba7a8b95da1d52c70cfa11d92bc888555ec243289b79d7548e9b713cde197b7";//process.env.PRIVATE_KEY;

module.exports = {
  get web3() {
    if (!this[WEB3]) {
      let web3 = new Web3(Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545");

      // 添加 Bridge 账号
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      web3.eth.accounts.wallet.add(account);
      web3.eth.defaultAccount = account.address;
        
      this[WEB3] = web3;
    }
    return this[WEB3];
  },
  get web3OnETH() {
    if (!this[WEB3ONETH]) {
      let web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");

      // // 添加 Bridge 账号
      // const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      // web3.eth.accounts.wallet.add(account);
      // web3.eth.defaultAccount = account.address;
        
      this[WEB3ONETH] = web3;
    }
    return this[WEB3ONETH];
  },
  get pledgBridgeBSCContract() {
    if (!this[PLEDGEBRIDGEBSCCONTRACT]) {
      const contract = new this.web3.eth.Contract(pledgeBridgeBSCAbi, pledgeBridgeBSCAddress);
      this[PLEDGEBRIDGEBSCCONTRACT] = contract;
    }
    return this[PLEDGEBRIDGEBSCCONTRACT];
  },
};
