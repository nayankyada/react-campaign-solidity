import React, { useState, useEffect } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";
function Address(props) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getSummary();
  }, []);
  const getSummary = async () => {
    const address = props.address;
    let summary = await campaign(address).methods.getSummary().call();
    console.log(summary);
    const items = [
      {
        header: summary[4],
        meta: "Address of Manager",
        description:
          "Ther manager created this campaign and can create request.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: summary[1],
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver.",
      },
      {
        header: summary[2],
        meta: "No of Requests",
        description:
          "A request tries to withdraw money from the contract. Request Must be approve by approver.",
      },
      {
        header: summary[3],
        meta: "No of Approvers",
        description: "No of people who have already doneted for this campaign.",
      },
      {
        header: web3.utils.fromWei(summary[0], "ether"),
        meta: "Campaign Balance(ether)",
        description:
          "This balance is how much monet this compaign has left to spent",
      },
    ];
    setItems(items);
  };

  return (
    <Layout>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            {items.length > 0 ? <Card.Group items={items}></Card.Group> : ""}
          </Grid.Column>
          <Grid.Column width={4}>
            <ContributeForm address={props.address} getSummary={getSummary} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row width12>
          <Grid.Column>
          <Link route={`/campaigns/${props.address}/requests`}>
            <a>
              <Button primary>View Requests</Button>
            </a>
          </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

Address.getInitialProps = async (ctx) => {
  const address = ctx.query.address;
  return {
    address: address,
  };
};
export default Address;
