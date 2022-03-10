// SPDX-License-Identifier: GPL-3.0

// assume there are two contracts A , B
// address newContract = new B()
// any msg.sender statement inside contract B is not sender address but it is address of contract A

pragma solidity >=0.7.0 < 0.9.0;

contract CampaignFactory{
    address[] public deployedCampaigns;
    function createCampaign(uint _minimum) public {
        address newCampaign = address(new Campaign(_minimum,msg.sender)); // retrun address 
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCompaigns() public view returns(address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;

    }
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount = 0;
    mapping(uint => Request) temp;

    constructor(uint minimum,address creator){
        manager = creator;
        minimumContribution=minimum;
    }

    modifier minContribution(){
        require(msg.value > minimumContribution,"Minimum Contribution Required");
        _;
    }

    modifier onlyOwner{
        require(msg.sender == manager,"Only Manager Can Access");
        _;
    }

    function contribute() public payable minContribution {
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string memory _description,uint _value,address payable _recipient) public onlyOwner{
        Request storage newRequest = requests.push();
       
            newRequest.description=_description;
            newRequest.value=_value;
            newRequest.recipient=_recipient;
            newRequest.complete=false;
            newRequest.approvalCount=0;

    }

    function approveRequest(uint index) public{
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;

    }

    function finalizedRequest(uint index) public onlyOwner{
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}

