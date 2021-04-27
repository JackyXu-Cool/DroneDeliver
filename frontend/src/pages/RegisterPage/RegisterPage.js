import React from "react";
import { Link } from "react-router-dom";

import RegisterOption from "../../components/RegisterOption/RegisterOption";
import classes from "./RegisterPage.module.scss";

const RegisterPage = (props) => {
  const leftCol = [
    ["First Name: ", "fname"],
    ["Last Name: ", "lname"],
    ["Username: ", "username"],
    ["Password: ", "password"],
    ["Confirm: ", "confirm"],
  ];
  const rightCol = [
    ["Street: ", "street"],
    ["City: ", "city"],
    ["State: ", "state"],
    ["Zip: ", "zip"],
  ];

  const leftEntries = leftCol.map((text) => {
    return (
      <div id={text[1]} className={classes.left_entry}>
        <h2 className={classes.left_entry_label}>{text[0]}</h2>
        <input
          className={classes.left_entry_input}
          name={text[1]}
          onChange={props.enterRegister}
        />
      </div>
    );
  });

  const rightEntries = rightCol.map((text) => {
    return (
      <div id={text[1]} className={classes.right_entry}>
        <h2 className={classes.right_entry_label}>{text[0]}</h2>
        <input
          className={classes.right_entry_input}
          name={text[1]}
          onChange={props.enterRegister}
        />
      </div>
    );
  });

  let success = "";
  if (props.registerSuccess) {
    success = "register success: " + props.actualRole;
  }

  return (
    <div className={classes.registerPage}>
      <div className={classes.content}>
        <h1 className={classes.title}>Register</h1>
        <div className={classes.entries}>
          <div className={classes.left_col}>{leftEntries}</div>
          <div className={classes.right_col}>{rightEntries}</div>
        </div>
        <div className={classes.role_options}>
          <RegisterOption
            role={props.role}
            switchRegisterRole={props.switchRegisterRole}
            enterRegister={props.enterRegister}
          />
        </div>
        <button className={classes.button_register}>
          <Link
            to={"/register"}
            className={classes.link_register}
            onClick={props.registerOnClick}
          >
            Register
          </Link>
        </button>
        <button className={classes.back}>
          <Link to="/login" className={classes.link_back}>
            back
          </Link>
        </button>
        <h2 className={classes.success}>{success}</h2>
      </div>
    </div>
  );
};

export default RegisterPage;
