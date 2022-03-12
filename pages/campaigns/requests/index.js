import React from "react";
import { Button, Table } from "semantic-ui-react";
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
  console.log("All Requests",requests);
  return { address, requests, requestCount };
};
function RequestIndex(props) {
  return (
    <Layout>
      <h3>Request</h3>
      <Link route={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
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
          {props.requests.map((req,index) => (
            <RequestRow data={req} index={index}/>
          ))}
        </Table.Body>
      </Table>
    </Layout>
  );
}

export default RequestIndex;
