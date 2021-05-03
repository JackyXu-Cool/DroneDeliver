import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { Link, Redirect, useHistory } from "react-router-dom";
import types from "../../assets/types";
import axios from "axios";

import classes from "./ViewStoreItemPage.module.scss";

const ViewStoreItemPage = (props) => {

    const history = useHistory();

    const [items, setItems] = useState([]);
    const [itemsForOrder, setItemsForOrder] = useState([]);
    const [ViewStorePageInfo, setViewStorePageInfo] = useState({
        chainName: "",
        storeName: "",
        type: "",
        username: localStorage.getItem("username")
    });

    let newTypes = [...types];
    newTypes.push("ALL");
    const [chainList, setChainList] = useState([]);
    const [storeList, setStoreList] = useState([]);

    const constructTable = (list) => {
        if (list.length === 0) return "";
        return list.map((item) => {
            const quantities = [];
            for (let i = 1; i <= item["limit"]; i++) {
                quantities.push({value: item["name"], label: i});
            };
            return (
            <ul className={classes.item_entry_even}>
                <li className={classes.name_entry}>{item["name"]}</li>
                <li className={classes.quantity_entry}>
                    <Dropdown
                        name={item["name"]}
                        key={item["name"]} 
                        options={quantities}
                        onChange={onSelectQuantity}
                    />
                </li>
            </ul>);
        })
    };

    const onSelectQuantity = async (event) => {
        var temp = itemsForOrder;
        var obj = {name: "", quantity: ""};
        obj["name"] = event.value;
        obj["quantity"] = event.label;
        temp.push(obj);
        setItemsForOrder(temp);
        console.log(itemsForOrder);
    }

    const onInputChangeHandler = async (event) => {
        let temp = ViewStorePageInfo;
        if (chainList.includes(event.value)) {
            temp["chainName"] = event.value;

            // Fetch dropdown values of store names
            let res = await fetch(`http://localhost:5000/customer/get/zipcode/?username=${localStorage.getItem("username")}`);
            res = await res.json();

            let response = await fetch(`http://localhost:5000/customer/get/store/?zipcode=${res["zip"]}&chainName=${ViewStorePageInfo["chainName"]}`)
            response = await response.json();
            let tempStoreList = []
            response.result.forEach(r => {
                tempStoreList.push(r["storeName"]);
            });
            setStoreList(tempStoreList);

        } else if (newTypes.includes(event.value)) {
            temp["type"] = event.value;
        } else if (storeList.includes(event.value)) {
            temp["storeName"] = event.value;
        };
        setViewStorePageInfo(temp);
    };

    const searchStoreItem = async () => {
        if (ViewStorePageInfo["storeName"] === "" || ViewStorePageInfo["chainName"] === "" || ViewStorePageInfo["type"] === "") {
            alert("Choose the chain name or store name first");
            console.log(ViewStorePageInfo);
            return;
        }
        let store_name = ViewStorePageInfo["storeName"].replace(" ", "-");
        let chain_name = ViewStorePageInfo["chainName"].replace(" ", "-");
        let info = await fetch(`http://localhost:5000/customer/view/store/items/?type=${ViewStorePageInfo["type"]}&chainName=${chain_name}&storeName=${store_name}&username=${localStorage.getItem("username")}`)
        info = await info.json();
        let tempItems = [];
        if (info.result !== undefined) {
            info.result.forEach(r => {
                let obj = {};
                obj["name"] = r["ChainItemName"];
                obj["limit"] = r["Orderlimit"];
                tempItems.push(obj);
            });
            setItems(tempItems);
        }
    };

    const placeOrder = async () => {
        console.log(itemsForOrder);
        itemsForOrder.forEach((item) => {
            axios.post("http://localhost:5000/customer/preplace/order", {
                username: localStorage.getItem("username"),
                chainName: ViewStorePageInfo["chainName"],
                storeName: ViewStorePageInfo["storeName"],
                quantity: item["quantity"],
                itemName: item["name"]
            }).then(() => {
                console.log("success");
            }).catch((err) => {
                alert(err.response.data.message);
            });
        localStorage.setItem("chainName", ViewStorePageInfo["chainName"]);
        localStorage.setItem("storeName", ViewStorePageInfo["storeName"]);
        history.push(`/customer/review/order`);
        });
    };

    useEffect(() => {
        async function fetchChainsAndStores() {
            let res = await fetch(`http://localhost:5000/customer/get/zipcode/?username=${localStorage.getItem("username")}`);
            res = await res.json();

            let response = await fetch(`http://localhost:5000/customer/get/chain/?zipcode=${res["zip"]}`);
            response = await response.json();
            let tempChainList = []
            response.result.forEach(r => {
                tempChainList.push(r["chainName"]);
            });
            setChainList(tempChainList);
        };
        fetchChainsAndStores();
    }, []);

    return (
        <div className={classes.ViewStoreItemPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Customer View Store Page</h1>
                <div className={classes.entrybox}>
                    <div className={classes.entry}>
                        <h2 className={classes.label}>Username: </h2>
                        <input
                            className={classes.input}
                            name={"username"}
                            type={"text"}
                            value={localStorage.getItem("username")}
                            disabled={true}
                        />
                    </div>
                    <div className={classes.right_entry}>
                        <h2 className={classes.right_entry_label}>Chain: </h2>
                        <Dropdown 
                            name={"chainName"} 
                            key={"chainName"}
                            className={classes.right_entry_input} 
                            options={chainList}
                            onChange={onInputChangeHandler}
                        />
                    </div>
                    <div className={classes.right_entry}>
                        <h2 className={classes.right_entry_label}>Category: </h2>
                        <Dropdown 
                            name={"category"} 
                            key={"category"}
                            className={classes.right_entry_input} 
                            options={newTypes}
                            onChange={onInputChangeHandler}
                        />
                    </div>
                    <div className={classes.right_entry}>
                        <h2 className={classes.right_entry_label}>Store: </h2>
                        <Dropdown 
                            name={"storeName"} 
                            key={"store"}
                            className={classes.right_entry_input} 
                            options={storeList}
                            onChange={onInputChangeHandler}
                        />
                    </div>
                </div>
                <ul className={classes.header_row}>
                    <li className={classes.header_1}>Item</li>
                    <li className={classes.header_2}>Quantity</li>
                </ul>
                <div className={classes.displayed_items_container}>
                    {constructTable(items)}
                </div>
                <div className={classes.buttons}>
                    <button className={classes.back}>
                        <Link to="/home" className={classes.link_back}>
                            Cancel
                        </Link>
                    </button>
                    <button className={classes.search} onClick={searchStoreItem}>
                        Search
                    </button>
                    <button className={classes.create} onClick={placeOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewStoreItemPage;