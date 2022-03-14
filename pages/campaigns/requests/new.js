import React, { useState } from "react";
import { Button, Form, Message, Input } from "semantic-ui-react";
import Layout from "../../../components/Layout";

import campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

RequestNew.getInitialProps = async (ctx) => {
  const address = ctx.query.address;
  console.log(address)
  return { address };
};
function RequestNew(props) {
  const [des, setDes] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const createRequest = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    campaign(props.address)
      .methods.createRequest(des, web3.utils.toWei(amount, "ether"), recipient)
      .send({
        from: accounts[0],
        gas: "3000000",
      })
      .once("sending", function (payload) {
        setIsLoading(true);
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
        setIsLoading(false);
        setErrorMsg(error.message);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
        console.log("error --- ", error);
      })
      .then(function (receipt) {
        setIsLoading(false);
        Router.pushRoute(`/campaigns/${props.address}/requests`)
        console.log("contractaddress --- ", receipt);
      }).catch(e => {
        console.log(e)
      })
  };
  return (
    <Layout>
        <Link route={`/campaigns/${props.address}/requests`}>
            <a>
                Back
            </a>
        </Link>
      <h3>Create Request</h3>
      {isError && (
        <Message negative>
          <Message.Header>Oops!</Message.Header>
          <p>{errorMsg}</p>
        </Message>
      )}
      <Form onSubmit={createRequest}>
        <Form.Field>
          <label>Description</label>
          <Input
            type="text"
            value={des}
            onChange={(e) => {
              setDes(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Amount in Ether</label>
          <Input
            type="number"
            step="0.01"
            label="ether"
            labelPosition="right"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            type="text"
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
            }}
          />
        </Form.Field>
        <Button type="submit" primary loading={isLoading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

export default RequestNew;
