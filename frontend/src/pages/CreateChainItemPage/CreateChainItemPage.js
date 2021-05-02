import React from "react";
import { Link } from "react-router-dom";

import ShortEntry from "../../components/ShortEntry/ShortEntry";
import classes from "./CreateChainItemPage.module.scss";

const CreateChainItemPage = (props) => {
  let create = null;
  if (props.canCreateChainItem) {
    create = (
      <button className={classes.create} onClick={props.onCreateChainItem}>
        Create
      </button>
    );
  } else {
    create = <button className={classes.create_inactive}>Create</button>;
  }

  return (
    <div className={classes.createChainItemPage}>
      <div className={classes.content}>
        <h1 className={classes.title}>Chain Manager Create Chain Item</h1>
        <div className={classes.info}>
          <ShortEntry
            text={"ChainName: "}
            name="chainname"
            type="text"
            onChange={props.enterChainItem}
          />
          <ShortEntry
            text={"Item: "}
            name="item"
            dropdown
            data={props.generalItems}
            onChange={props.enterChainItem}
          />
          <ShortEntry
            text={"Quantity Available: "}
            name="quantityavailable"
            type="text"
            onChange={props.enterChainItem}
          />
          <ShortEntry
            text={"Limit Per Order: "}
            name="limitperorder"
            type="text"
            onChange={props.enterChainItem}
          />
          <ShortEntry
            text={"PLU Number: "}
            name="plunumber"
            type="text"
            onChange={props.enterChainItem}
          />
          <ShortEntry
            text={"Price Per Unit ($): "}
            name="priceperunit"
            type="text"
            onChange={props.enterChainItem}
          />
        </div>
        <button className={classes.back}>
          <Link to="/home" className={classes.link_click}>
            Back
          </Link>
        </button>
        <h2 className={classes.message}>
          {props.createChainItemSuccess ? "success" : ""}
        </h2>
        {create}
      </div>
    </div>
  );
};

export default CreateChainItemPage;
