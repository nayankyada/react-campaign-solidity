import React, { useState, useEffect } from "react";
import { Button, Message, Table } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";
RequestIndex.getInitialProps = async (ctx) => {
  const address = ctx.query.address;
  const requestCount = await campaign(address)
    .methods.getRequestsCount()
    .call();
  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => campaign(address).methods.requests(index).call())
  );
  const approversCount = await campaign(address)
    .methods.approversCount()
    .call();
  console.log("All Requests", requests);
  return { address, requests, requestCount, approversCount };
};
function RequestIndex(props) {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [allRequests, setAllRequests] = useState(props.requests);

  const getAllRequest = async () => {
    const requestCount = await campaign(props.address)
      .methods.getRequestsCount()
      .call();
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) =>
          campaign(props.address).methods.requests(index).call()
        )
    );
    setAllRequests(requests);
  };

  return (
    <Layout>
      <h3>Request</h3>
      <Link route={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{marginBottom:"1rem"}}>Add Request</Button>
        </a>
      </Link>
      {isError && (
        <Message negative>
          <Message.Header>Oops!</Message.Header>
          <p style={{overflow:"scroll"}}>{errorMsg}</p>
        </Message>
      )}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approval Count</Table.HeaderCell>
            <Table.HeaderCell>Approve</Table.HeaderCell>
            <Table.HeaderCell>Finalize</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allRequests.map((req, index) => (
            <RequestRow
              key={index}
              data={req}
              index={index}
              approversCount={props.approversCount}
              address={props.address}
              setErrorMsg={setErrorMsg}
              setIsError={setIsError}
              getAllRequest={getAllRequest}
            />
          ))}
        </Table.Body>
      </Table>
      <div>Found {allRequests.length} requests.</div>
    </Layout>
  );
}

export default RequestIndex;
