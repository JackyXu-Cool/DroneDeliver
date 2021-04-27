import React from "react";

import classes from "./RegisterOption.module.scss";

const RegisterOption = (props) => {
  let entries = null;
  console.log(props.role);

  if (props.role === "Customer") {
    entries = (
      <div className={classes.customer}>
        <div className={classes.card_number}>
          <h2 className={classes.card_number_label}>Card Number:</h2>
          <input
            className={classes.card_number_input}
            name="cardnumber"
            placeholder="**** **** **** ****"
            onChange={props.enterRegister}
          />
        </div>
        <div className={classes.card_info}>
          <h2 className={classes.cvv_label}>CVV:</h2>
          <input
            className={classes.cvv_input}
            name="cvv"
            placeholder="***"
            onChange={props.enterRegister}
          />
          <h2 className={classes.exp_label}>Exp: </h2>
          <input
            className={classes.exp_input}
            placeholder="MM/DD/YYYY"
            name="exp"
            onChange={props.enterRegister}
          />
        </div>
      </div>
    );
  } else {
    entries = (
      <div className={classes.employee}>
        <div className={classes.chain}>
          <h2 className={classes.chain_label}>Associated Grocery Chain: </h2>
          <input
            className={classes.chain_input}
            placeholder="Chain name"
            name="chainname"
            onChange={props.enterRegister}
          />
        </div>
        <div className={classes.store}>
          <h2 className={classes.store_label}>Associated Store Name: </h2>
          <input
            className={classes.store_input}
            placeholder="Store name"
            name="storename"
            onChange={props.enterRegister}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.register_option}>
      <div className={classes.navbar}>
        <button
          className={
            props.role === "Customer"
              ? classes.selection_blue
              : classes.selection
          }
          value="Customer"
          onClick={props.switchRegisterRole}
        >
          Customer
        </button>
        <button
          className={
            props.role === "Employee"
              ? classes.selection_blue
              : classes.selection
          }
          value="Employee"
          onClick={props.switchRegisterRole}
        >
          Employee
        </button>
      </div>
      {entries}
    </div>
  );
};

export default RegisterOption;
