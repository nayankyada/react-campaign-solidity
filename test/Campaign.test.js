const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  // here we deploye camaignFactory
  factory = await new web3.eth.Contract(
    JSON.parse(JSON.stringify(compiledFactory["CampaignFactory"].abi))
  )
    .deploy({
      data: JSON.parse(
        JSON.stringify(compiledFactory["CampaignFactory"].evm.bytecode.object)
      ),
    })
    .send({ from: accounts[0], gas: "3000000" });

  // it will create object of first campaign contract and it will push into array
  await factory.methods
    .createCampaign("100")
    .send({ from: accounts[0], gas: "1000000" });

  // here we will get address of the first campaign contract that we have created
  [campaignAddress] = await factory.methods.getDeployedCompaigns().call();

  // here we have address and byte code of the created contract so we can access this
  campaign = await new web3.eth.Contract(
    JSON.parse(JSON.stringify(compiledCampaign["Campaign"].abi)),
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("deploys a factory and campaign", () => {
    assert.ok(factory.options.address); // factory address
    assert.ok(campaign.options.address); // campaign address
  });

  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });

    // we can't get whole mapping we have to pass key
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert.ok(isContributor);
    console.log(await campaign.methods.approvers(accounts[1]).call());
  });

  it("requires a minimum contribution", async () => {
    try {
      const t = await campaign.methods.contribute().send({
        value: "50",
        from: accounts[2],
      });
      // if above transaction will not generate error that means test should fail
      // so we have to return assert false
      assert(false);
    } catch (e) {
      // if transaction generate error then we assert error msg
      assert(e);
    }
  });

  it("allows a manager to make a payment request", async () => {
    await campaign.methods
      .createRequest("Buy batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    // we cant get whole mapping but we have to pass key
    const request = await campaign.methods.requests(0).call()
    console.log(request)
  });

  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "3000000" });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "3000000",
    });

    await campaign.methods.finalizedRequest(0).send({
      from: accounts[0],
      gas: "3000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});
