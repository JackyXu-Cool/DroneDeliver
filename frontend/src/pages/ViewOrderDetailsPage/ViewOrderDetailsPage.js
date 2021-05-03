import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import classes from "./ViewOrderDetailsPage.module.scss";

const ViewOrderDetailsPage = (props) => {

    const [username, setUsername] = useState("");
    const [orderID, setOrderID] = useState("");
    const [amount, setAmount] = useState("");
    const [total_items, setTotalItems] = useState("");
    const [date, setDate] = useState("");
    const [droneID, setDroneID] = useState("");
    const [dronetech, setDroneTech] = useState("");
    const [orderstatus, setOrderStatus] = useState("");
    const [storeAddress, setStoreAddress] = useState("");
    const [items, setItems] = useState([]);

    const constructTable = (list) => {
        if (list.length === 0) return "";
        return list.map((item, index) => {
            return (
            <ul className={index % 2 === 1 ? classes.drone_entry_odd : classes.drone_entry_even}>
                <li className={classes.item_entry}>{item["Item"]}</li>
                <li className={classes.count_entry}>{item["Count"]}</li>
            </ul>);
        })
    };

    useEffect(() => {
        async function getDetails() {
            let response = await fetch(`http://localhost:5000/dronetech/get/order/details/?id=10015&username=${localStorage.getItem("username")}`);
            response = await response.json();
            setUsername(response.Details["Customer_name"]);
            setOrderID(response.Details["OrderID"]);
            setAmount(response.Details["Total_Amount"]);
            setTotalItems(response.Details["Total_Items"]);
            setDate(response.Details["Date_Of_Purchase"]);
            setDroneID(response.Details["Drone_ID"]);
            setDroneTech(response.Details["Store_Associate"]);
            setOrderStatus(response.Details["Order_Status"]);
            setStoreAddress(response.Details["Address"]);
            setItems(response.Details["Items"]);
        }
        getDetails();
    });

    return (
        <div className={classes.ViewOrderDetailsPage}>
            <div className={classes.content}>
                <h1 className={classes.title}>Order Details</h1>
                <div className={classes.row}>
                    <h2 className={classes.label}>Customer Name:</h2>
                    <input className={classes.entry} value={username} disabled />
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Order ID: </h2>
                    <input className={classes.entry} value={orderID} disabled />
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Total Amount: </h2>
                    <input className={classes.entry} value={amount} disabled />
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Total Items: </h2>
                    <input className={classes.entry} value={total_items} disabled />
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Date of Purchase: </h2>
                    <input className={classes.entry} value={date} disabled />
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Drone ID: </h2>
                    <input className={classes.entry} value={droneID} disabled />
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Store Associate: </h2>
                    <input className={classes.entry} value={dronetech} disabled />
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Status: </h2>
                    <input className={classes.entry} value={orderstatus} disabled />
                </div>

                <div className={classes.row}>
                    <h2 className={classes.label}>Address: </h2>
                    <input className={classes.entry} value={storeAddress} disabled />
                </div>

                <ul className={classes.header_row}>
                    <li className={classes.header_1}>Items</li>
                    <li className={classes.header_2}>Count</li>
                </ul>

                <div className={classes.orders_container}>
                    {constructTable(items)}
                </div>

                <button className={classes.btn_back}>
                    <Link className={classes.link_back} to="/home">Back</Link>
                </button>
            </div>
        </div>
    );
};

export default ViewOrderDetailsPage;