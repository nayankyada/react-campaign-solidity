import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
function ContributeForm(props) {
  const [amount, setAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const contribute = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await campaign(props.address)
      .methods.contribute()
      .send({
        from: accounts[0],
        value: web3.utils.toWei(amount,'ether'),
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
        setIsError(false)
        setErrorMsg("")
        setAmount(0)
        props.getSummary()
        console.log("contractaddress --- ", receipt);
      });
  };
  return (
    <div>
      {isError && (
        <Message negative>
          <Message.Header>Oops!</Message.Header>
          <p>{errorMsg}</p>
        </Message>
      )}
      <Form onSubmit={contribute}>
        <Form.Field>
          <label>Amount to Contribute</label>
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
        <Button type="submit" primary loading={isLoading}>
          Contribute!
        </Button>
      </Form>
    </div>
  );
}

export default ContributeForm;
