import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
console.log(JSON.parse(JSON.stringify(CampaignFactory["CampaignFactory"].abi)));
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
  "0x8E0e2cf80F2728E36AD25B18435CCd81770Eed0F"
);
export default instance;
