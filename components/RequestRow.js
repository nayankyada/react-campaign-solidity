import React, { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
function RequestRow({ setErrorMsg, setIsError, getAllRequest, ...props }) {
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isFinalizeLoading, setIsFinalizeLoading] = useState(false);
  const isreadyToFinalize = props.data.approvalCount > props.approversCount / 2;
  const onApprove = async () => {
    const accounts = await web3.eth.getAccounts();
    campaign(props.address)
      .methods.approveRequest(props.index)
      .send({
        from: accounts[0],
        gas: "3000000",
      })
      .once("sending", function (payload) {
        setIsApproveLoading(true);
        console.log("sending --- ", payload);
      })
      .once("sent", function (payload) {
        console.log("sent --- ", payload);
      })
      .once("transactionHash", function (hash) {
        console.log("transactionHash --- ", hash);
      })
      .once("receipt", function (receipt) {
        console.log("receipt --- ", receipt);
      })
      .on("error", function (error) {
        setIsApproveLoading(false);
        setErrorMsg(error.message);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      })
      .then(function (receipt) {
        setIsApproveLoading(false);
        getAllRequest();
        console.log("contractaddress --- ", receipt);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onFinalize = async () => {
    const accounts = await web3.eth.getAccounts();
    campaign(props.address)
      .methods.finalizedRequest(props.index)
      .send({
        from: accounts[0],
        gas: "3000000",
      })
      .once("sending", function (payload) {
        setIsFinalizeLoading(true);
        console.log("sending --- ", payload);
      })
      .once("sent", function (payload) {
        console.log("sent --- ", payload);
      })
      .once("transactionHash", function (hash) {
        console.log("transactionHash --- ", hash);
      })
      .once("receipt", function (receipt) {
        console.log("receipt --- ", receipt);
      })
      .on("error", function (error) {
        setIsFinalizeLoading(false);
        setErrorMsg(error.message);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      })
      .then(function (receipt) {
        setIsFinalizeLoading(false);
        getAllRequest();
        console.log("contractaddress --- ", receipt);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Table.Row disabled={props.data.complete} positive={isreadyToFinalize && !props.data.complete}>
      <Table.Cell>{props.index}</Table.Cell>
      <Table.Cell>{props.data.description}</Table.Cell>
      <Table.Cell>{web3.utils.fromWei(props.data.value, "ether")}</Table.Cell>
      <Table.Cell>{props.data.recipient}</Table.Cell>
      <Table.Cell>
        {props.data.approvalCount}/{props.approversCount}
      </Table.Cell>
      <Table.Cell>
        {props.data.complete ? null : (
          <Button
            color="green"
            basic
            onClick={onApprove}
            loading={isApproveLoading}
          >
            Approve
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>
        {props.data.complete ? null : (
          <Button
            color="teal"
            basic
            onClick={onFinalize}
            loading={isFinalizeLoading}
          >
            Finalize
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  );
}

export default RequestRow;
