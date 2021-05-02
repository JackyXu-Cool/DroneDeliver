import React from "react";
import classes from "./TableHeaderRow.module.scss";

const TableHeaderRow = (props) => {
  return (
    <ul className={classes.header_row}>
        <li className={classes.header_1}>{props.header_1}</li>
        <li className={classes.header_2}>{props.header_2}</li>
        <li className={classes.header_3}>{props.header_3}</li>
        <li className={classes.header_4}>{props.header_4}</li>
        <li className={classes.header_5}>{props.header_5}</li>
    </ul>
  );
};

export default TableHeaderRow;