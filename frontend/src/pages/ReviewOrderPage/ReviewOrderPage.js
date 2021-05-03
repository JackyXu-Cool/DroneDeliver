import React, { useEffect, useState } from "react";
import { Link, useHistory} from "react-router-dom";
import Dropdown from "react-dropdown";
import axios from 'axios';

import classes from "./ReviewOrderPage.module.scss";

const ReviewOrderPage = (props) => {

    const history = useHistory();

    const [orderInfo, setOrderInfo] = useState([]);

    useEffect(() => {
        async function getReviewOrder() {
            axios.get(`http://localhost:5000/customer/review/order/?username=${localStorage.getItem("username")}`)
            .then((res) => {
                setOrderInfo(res.data.result);
            }).catch((err) => {
                alert(err.response.data.message);
            });
        }
        getReviewOrder();
    });

    const changeQuantity = (event) => {
        var temp = orderInfo;
        temp.forEach((t) => {
            if (t["ItemName"] === event.value) {
                t["Quantity"] = event.label;
            }
        });
        setOrderInfo(temp);
        axios.post('http://localhost:5000/customer/update/order', {
            username: localStorage.getItem("username"),
            quantity: event.label,
            itemName: event.value
        }).then(() => {
            alert("Successfully update quantity");
        }).catch(() => {
            alert("Fail to update quantity");
        })
    };

    const confirmOrder = () => {
        axios.post(`http://localhost:5000/customer/confirm/order`, {
            username: localStorage.getItem("username")
        }).then(() => {
            history.push(`/home`);
        }).catch((err) => {
            alert(err.response.data.message);
        })
    };
    
    const cancelOrder = () => {
        axios.delete(`http://localhost:5000/customer/cancel/order/?username=${localStorage.getItem("username")}`,)
        .then(() => {
            history.push("/home");
        }).catch(err => {
            alert(err.response.data.message);
        })
    }

    const constructTable = (list) => {
        if (list.length === 0) return "";
        return list.map((item) => {
            const quantities = [];
            for (let i = 1; i <= item["orderlimit"]; i++) {
                quantities.push({label: i, value: item["ItemName"]});
            }
            return (
            <ul className={classes.item_entry_even}>
                <li className={classes.name_entry}>{item["ItemName"]}</li>
                <li className={classes.quantity_entry}>
                    <Dropdown
                        name={item["ItemName"]}
                        key={item["ItemName"]}
                        options={quantities}
                        value={{label: item["Quantity"], value: item["ItemName"]}}
                        onChange={changeQuantity}
                    />
                </li>
                <li className={classes.cost_entry}>{item["Price"]}</li>
            </ul>);
        })
    };


    return (
        <div className={classes.ReviewOrderPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Customer Review Order</h1>
                <div className={classes.entrybox}>
                    <div className={classes.entry}>
                        <h2 className={classes.label}>Chain: </h2>
                        <input
                            className={classes.input}
                            name={"chain"}
                            type={"text"}
                            value={localStorage.getItem("chainName")}
                            disabled={true}
                        />
                    </div>
                    <div className={classes.entry}>
                        <h2 className={classes.label}>Store: </h2>
                        <input
                            className={classes.input}
                            name={"store"}
                            type={"text"}
                            value={localStorage.getItem("storeName")}
                            disabled={true}
                        />
                    </div>
                </div>
                <ul className={classes.header_row}>
                    <li className={classes.header_1}>Item</li>
                    <li className={classes.header_2}>Quantity</li>
                    <li className={classes.header_3}>Unit Cost</li>
                </ul>
                <div className={classes.displayed_items_container}>
                    {constructTable(orderInfo)}
                </div>
                <div className={classes.buttons}>
                    <button className={classes.back} onClick={cancelOrder}>
                        Cancel
                    </button>
                    <button className={classes.create} onClick={confirmOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ReviewOrderPage;