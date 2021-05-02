import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TableHeaderRow from "../../components/TableHeaderRow/TableHeaderRow"
import TableEntryRow from "../../components/TableEntryRow/TableEntryRow"

import classes from "./ManageStoresPage.module.scss";

const ManageStorePage = (props) => {
    const storeEntries = props.displayedStores.map((entry, index) => {
        return (        
        <TableEntryRow
            key={index}
            index={index}
            font_size_1={14}
            font_size_2={14}
            entry_1={entry["StoreName"]}
            entry_2={entry["address"]}
            entry_3={entry["Orders"]}
            entry_4={entry["Employees"]}
            entry_5={entry["Total"]}
        />
        );
    });

    // Fetch chain name and stores from server


    
    const storeOptions = props.stores.map((store,index) => {
        return (<option value={store} key={index} style={{fontSize:15}}>{store}</option>);
    });

    return (
        <div className={classes.ManageStoresPage}>
            <div className={classes.content}>
                <h1 className={classes.title}>Manage Chain's Stores</h1>
                <div className={classes.top_section}>
                    <div className={classes.top_left}>
                        <div className={classes.chain_entry}>
                            <h2 className={classes.chain_label}>Chain: </h2>
                            <input className={classes.chain_input} disabled value={props.chainName}/>
                        </div>
                        <div className={classes.store_entry}>
                            <h2 className={classes.store_label}>Store: </h2>
                            <select className={classes.store_droplist} style={{fontSize:15}} name="store_name" onChange={props.onEnter}>{storeOptions}</select>
                        </div>
                    </div>
                    <div className={classes.top_right}>
                        <div className={classes.range_entry}>
                            <h2 className={classes.range_label}>Total Range: </h2>
                            <input className={classes.range_input} name="min_range" onChange={props.onEnter}/>
                            <h2 className={classes.slash}>-</h2>
                            <input className={classes.range_input} name="max_range" onChange={props.onEnter}/>
                        </div>
                        <div className={classes.sort_by_entry}>
                            <h2 className={classes.sort_by_label}>Sort by: </h2>
                            <select className={classes.sort_by_droplist} onChange={props.onSort}>
                                <option value="None">None</option>
                                <option value="NameUp">Name &#8593;</option>
                                <option value="NameDown">Name &#8595;</option>
                                <option value="AddressUp">Address &#8593;</option>
                                <option value="AddressDown">Address &#8595;</option>
                                <option value="OrdersUp">Orders &#8593;</option>
                                <option value="OrdersDown">Orders &#8595;</option>
                                <option value="EmployeesUp">Employees &#8593;</option>
                                <option value="EmployeesDown">Employees &#8595;</option>
                                <option value="TotalUp">Total &#8593;</option>
                                <option value="TotalDown">Total &#8595;</option>
                            </select>
                            <button className={classes.btn_filter} onClick={props.onFilter}>Filter</button>
                        </div>
                    </div>
                </div>

                <TableHeaderRow 
                    header_1="Name"
                    header_2="Address"
                    header_3="Orders"
                    header_4="Employees"
                    header_5="Total"
                />

                <div className={classes.displayed_stores_container}>
                    {storeEntries}
                </div>
                <div className={classes.btn_row}>
                    <button className={classes.btn_back}>
                        <Link className={classes.link_back} to="/home">Back</Link>
                    </button>

                    <button className={classes.btn_reset} onClick={props.onReset}>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default ManageStorePage;