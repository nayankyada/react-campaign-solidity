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
  "0x6BCcc3F7A21B3079Eb848c21F9C0c87B449f2F33"
);
export default instance;
