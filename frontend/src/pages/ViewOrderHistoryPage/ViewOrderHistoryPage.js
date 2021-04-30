import React from "react";
import { Link } from "react-router-dom";

import classes from "./ViewOrderHistoryPage.module.scss";

const ViewOrderHistoryPage = (props) => {
    return (
        <div className={classes.ViewOrderHistoryPage}>
            <div className={classes.content}>
                <h1 className={classes.title}>View Order History</h1>

            </div>
        </div>
    );
};

export default ViewOrderHistoryPage;