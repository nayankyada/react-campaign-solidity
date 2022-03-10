const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json")



// url to rinkeby provider
// mnemonic is wallet address to use ether for gas
const provider = new HDWalletProvider({
  mnemonic:
    "blossom chunk room panel undo crack size reward churn verb grape include",
  url: "https://rinkeby.infura.io/v3/c42cdaff77b14d8aa379fd73d2585210",
});

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  const factory = await new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory["CampaignFactory"].abi)))
    .deploy({ data: JSON.parse(
        JSON.stringify(compiledFactory["CampaignFactory"].evm.bytecode.object)
      )})
    .send({ from: accounts[0], gas: "3000000" });
  console.log("deployed contract address", factory.options.address,factory.methods);
};
deploy();

// rimix is a tool which help us to deploy contract or we can interact with deployed contract
// to interrect with deployed contract we need deplyed contract address
// go to https://remix.ethereum.org/
// step1  -> goto 3rg option (deploye and transaction) set environment to injected web3 and sign
// step2  -> select account with ether
// step3  -> find input box with At Address text and past here deployed contract addredd and click on At Address