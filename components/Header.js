import React from "react";
import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "../routes";
function Header() {
  return (
    <Menu style={{ marginTop: "2rem" }}>
      <Link route="/">
        <a className="item">Crowd Coin</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}

export default Header;
