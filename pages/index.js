import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";
function Index() {
  const [campaignAddress, setCampaignAddress] = useState("");
  const getDeployedCompaigns = async () => {
    console.log(factory);
    await factory.methods
      .getDeployedCompaigns()
      .call()
      .then((res) => {
        console.log(res);
        setCampaignAddress(res[0]);
      })
      .catch((er) => console.log(er));
  };
  useEffect(() => {
    getDeployedCompaigns();
  }, []);
  return <h1>{campaignAddress}</h1>;
}

export default Index;
