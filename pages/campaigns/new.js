import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
function Index() {
  const [minimumContribution, setMinimumContribution] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [items, setItems] = useState([]);
  const createCampaign = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsError(false);
    const accounts = await web3.eth.getAccounts();
    factory.methods
      .createCampaign(minimumContribution)
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
        renderCampaigns();
        Router.pushRoute("/");
        console.log("contractaddress --- ", receipt);
      })
      .catch((er) => console.log(er));
  };
  useEffect(() => {
    renderCampaigns();
  }, []);
  const renderCampaigns = () => {
    factory.methods
      .getDeployedCompaigns()
      .call()
      .then((res) => {
        const items = res.map((address) => ({
          header: address,
          description: <a>View Campaign</a>,
          fluid: true,
        }));
        setItems(items);
      })
      .catch((er) => console.log(er));
  };
  return (
    <Layout>
      <h3>New Campaign</h3>
      {isError && (
        <Message negative>
          <Message.Header>Oops!</Message.Header>
          <p>{errorMsg}</p>
        </Message>
      )}
      <Form onSubmit={createCampaign}>
        <Form.Field>
          <label>Minimum Wei To Contribute Into Campaign</label>
          <Input
            type="number"
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(e) => {
              setMinimumContribution(e.target.value);
            }}
          />
        </Form.Field>
        <Button type="submit" primary loading={isLoading}>
          Create!
        </Button>
      </Form>
      {/* {items.length ? <Card.Group style={{marginTop:"1rem"}} items={items} /> : ""} */}
    </Layout>
  );
}

export default Index;
