import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import classes from "./ViewCustomerPage.module.scss";

const ViewCustomerPage = (props) => {

    const [allUserList, setAllUserList] = useState([]);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const constructTable = (list) => {
        if (list.length === 0) return "";
        return list.map((user, index) => {
            return (
            <ul className={index % 2 === 1 ? classes.drone_entry_odd : classes.drone_entry_even}>
                <li className={classes.username_entry}>{user["Username"]}</li>
                <li className={classes.name_entry}>{user["FullName"]}</li>
                <li className={classes.address_entry}>{user["Address"]}</li>
            </ul>);
        })
    };

    const updateUserList = () => {
        axios.post("http://localhost:5000/admin/view/customers", {
            lastName: lname,
            firstName: fname,
        }).then((response) => {
            setFname("");
            setLname("");
            setAllUserList(response.data.result);
            document.getElementById("fname_input").value = "";
            document.getElementById("lname_input").value = "";
        }).catch((err) => {
            alert(err.response.data.message);
        });
    };

    useEffect(() => {
        async function userList() {
            axios.post("http://localhost:5000/admin/view/customers", {
                lastName: lname,
                firstName: fname,
            }).then((response) => {
                setAllUserList(response.data.result);
            }).catch((err) => {
                alert(err.response.data.message);
            })
        };
        userList();
    }, []);



    return (
        <div className={classes.ViewCustomerPage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Admin View Customers</h1>
                <div className={classes.top_entry_row}>
                    <h2 className={classes.customer_label}>
                        Customer
                    </h2>
                    <input
                        className={classes.input_entry}
                        name="fname"
                        type="text"
                        id="fname_input"
                        placeholder="first name"
                        onChange={(event) => {setFname(event.target.value)}}
                    />
                    <input
                        className={classes.input_entry}
                        name="lname"
                        id="lname_input"
                        type="text"
                        placeholder="last name"
                        onChange={(event) => {setLname(event.target.value)}}
                    />
                </div>
                <ul className={classes.header_row}>
                    <li className={classes.username_header}>Username</li>
                    <li className={classes.name_header}>Name</li>
                    <li className={classes.address_header}>Address</li>
                </ul>
                <div className={classes.displayed_customers_container}>
                    {constructTable(allUserList)}
                </div>
                <div className={classes.buttons}>
                    <button className={classes.back}>
                        <Link to="/home" className={classes.link_back}>
                            Back
                        </Link>
                    </button>
                    <button className={classes.filter} onClick={updateUserList}>
                        Filter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCustomerPage;