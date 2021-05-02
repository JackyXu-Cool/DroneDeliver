import React from "react";
import classes from "./TableEntryRow.module.scss";

const TableEntryRow = (props) => {
  return (
        <ul className={props.index % 2 === 1 ? classes.entry_odd : classes.entry_even} key={props.entry_1}>
            <li className={classes.entry_1} style={{fontSize: props.font_size_1}}>{props.entry_1}</li>
            <li className={classes.entry_2} style={{fontSize: props.font_size_2}}>{props.entry_2}</li>
            <li className={classes.entry_3}>{props.entry_3}</li>
            <li className={classes.entry_4}>{props.entry_4}</li>
            <li className={classes.entry_5}>{props.entry_5}</li>
        </ul>
  );
};

export default TableEntryRow;