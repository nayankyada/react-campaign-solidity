import React from "react";
import factory from "../ethereum/factory";
import "semantic-ui-css/semantic.min.css";
import { Button, Card } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Router, Link } from "../routes";
import web3 from "../ethereum/web3";
function Index(props) {
  const renderCampaigns = () => {
    const items = props.campaigns.map((address) => ({
      header: address,
      description: (
        <Link route={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    }));
    return <Card.Group items={items} />;
  };
  return (
    <Layout>
      {/* <Button
        onClick={async () => {
          await window.ethereum.request({ method: "eth_requestAccounts" });
        }}
      >Unlock</Button> */}
      <div>
        <h3>Open Campaigns</h3>

        <Button
          floated="right"
          content="Create Campaign"
          icon="add"
          labelPosition="left"
          primary
          onClick={() => {
            Router.pushRoute("/campaigns/new");
          }}
        />
        {renderCampaigns()}
      </div>
    </Layout>
  );
}

Index.getInitialProps = async (ctx) => {
  const address = await factory.methods
    .getDeployedCompaigns()
    .call()
    .then((res) => {
      return res;
    })
    .catch((er) => console.log(er));
  return { campaigns: address };
};
export default Index;
