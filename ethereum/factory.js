import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

// here i have deploy contract using remix and used abi from remix and address of contract
const instance = new web3.eth.Contract(
  [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_minimum",
          type: "uint256",
        },
      ],
      name: "createCampaign",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "deployedCampaigns",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getDeployedCompaigns",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  "0x2F04c1306B29BC99545B039fDdD54A9020A3e71F"
);
export default instance;
