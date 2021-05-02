import React from "react";
import { Link } from "react-router-dom";

import classes from "./HomePage.module.scss";

const HomePage = (props) => {
  var identity = localStorage.getItem("identity");
  var text = `${identity} Home Page`;

  let html;

  if (identity === "Customer") {
    html = (
      <div className={classes.buttons}>
        <button className={classes.button_click}>
          <Link
            className={classes.link_click}
            style={{ paddingTop: 15, paddingBottom: 15 }}
            to="/customer/changeCCInfo"
          >
            Change Credit Card Information
          </Link>
        </button>
        <button className={classes.button_click}>Review Order</button>
        <button
          className={classes.button_click}
          onClick={props.onEnterViewOrderHistory}
        >
          <Link
            className={classes.link_click}
            style={{ paddingTop: 15, paddingBottom: 15 }}
            to="/customer/view/orderhistory"
          >
            View Order History
          </Link>
        </button>
        <button className={classes.button_click}>View Store Item</button>
      </div>
    );
  } else if (identity === "Drone Tech") {
    html = (
      <div className={classes.buttons}>
        <button className={classes.button_click}>View Store Orders</button>
        <button className={classes.button_click}>Track Drone Deliery</button>
      </div>
    );
  } else if (identity === "Manager") {
    html = (
      <div className={classes.buttons}>
        <button className={classes.button_click}>
          <Link
            className={classes.link_click}
            to="/manager/view/dronetechnicians"
          >
            View Drone Technicians
          </Link>
        </button>
        <button
          className={classes.button_click}
          onClick={props.onEnterViewDrones}
        >
          <Link
            className={classes.link_click}
            style={{ paddingTop: 15, paddingBottom: 15 }}
            to="/manager/view/drones"
          >
            View Drones
          </Link>
        </button>
        <button className={classes.button_click}>
          <Link className={classes.link_click} to="/manager/create/chainitem">
            Create Chain Item
          </Link>
        </button>
        <button className={classes.button_click}>
            <Link className={classes.link_click} to="/manager/manage/stores" onClick={props.onEnterManageStores}>
                Manage Stores
          </Link>
        </button>
      </div>
    );
  } else if (identity === "Admin") {
    html = (
      <div className={classes.buttons}>
        <button className={classes.button_click}>
          <Link className={classes.link_click} to="/admin/create/item">
            Create Item
          </Link>
        </button>
        <button className={classes.button_click}>
          <Link className={classes.link_click} to="/admin/create/drone">
            Create Drone
          </Link>
        </button>
        <button className={classes.button_click}>
          <Link className={classes.link_click} to="/admin/view/customers">
            View Customer Info
          </Link>
        </button>
        <button className={classes.button_click}>
          <Link className={classes.link_click} to="/admin/create/grocerychain">
            Create Grocery Chain
          </Link>
        </button>
        <button className={classes.button_click}>
          <Link className={classes.link_click} to="/admin/create/store">
            Create Store
          </Link>
        </button>
      </div>
    );
  }

  return (
    <div className={classes.HomePage}>
      <div className={classes.content}>
        <h2 className={classes.title}>{text}</h2>
        {html}
      </div>
    </div>
  );
};

export default HomePage;
