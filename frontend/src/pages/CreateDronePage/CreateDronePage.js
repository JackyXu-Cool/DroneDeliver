import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import Entry from "../../components/Entry/Entry";
import axios from "axios";

import classes from "./CreateDronePage.module.scss";

const CreateDronePage = (props) => {

    const [droneID, setDroneID] = useState(0);
    const [zipcodes, setZipcodes] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [CreateDroneInfo, setCreateDroneInfo] = useState({
        id: 0,
        zipcode: "",
        radius: 0,
        dronetech: ""
    });

    const onChangeHandler = async (event) => {
        var temp = CreateDroneInfo;
        if (event.target === undefined) {
            // When isNaN() returns true, it means that the input is not a number
            if (isNaN(event.value)) {
                temp["dronetech"] = event.value;
            } else {
                temp["zipcode"] = event.value;
                axios.post("http://localhost:5000/admin/get/usernameforstore", {
                    zipcode: CreateDroneInfo["zipcode"]
                })
                .then((response) => {
                    setEmployeeList(response.data.result);
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
            }
        } else {
          temp[event.target.name] = event.target.value;
        }
        setCreateDroneInfo(temp);
    };

    const onSubmitHandler = () => {
        if (CreateDroneInfo["id"] === 0 || CreateDroneInfo["zipcode"] === "" || CreateDroneInfo["radius"] === 0
            || CreateDroneInfo["dronetech"] === "") {
            alert("Please fill in all the information!");
            return;
        }
        axios.post("http://localhost:5000/admin/create/drone", {
            id: CreateDroneInfo["id"],
            radius: CreateDroneInfo["radius"],
            dronetech: CreateDroneInfo["dronetech"],
            zipcode: CreateDroneInfo["zipcode"]
        }).then(() => {
            alert("Succesfully created a new drone")
        }).catch((error) => {
            alert(error.response.data.message);
        });
    };

    useEffect(() => {
        async function fetchId() {
            let response = await fetch("http://localhost:5000/admin/get/droneid");
            response = await response.json();
            setDroneID(response["id"]);
            var temp = CreateDroneInfo;
            temp["id"] = response["id"]
            setCreateDroneInfo(temp);
        };
        fetchId();
    });

    useEffect(() => {
        async function fetchZipCodes() {
            let response = await fetch("http://localhost:5000/admin/get/zipcode");
            response = await response.json();
            setZipcodes(response["result"]);
        };
        fetchZipCodes();
    });

    return (
        <div className={classes.CreateDronePage}>  
            <div className={classes.content}>
                <h1 className={classes.title}>Admin Create Drone</h1>
                <div className={classes.entrybox}>
                    <div className={classes.entry}>
                        <h2 className={classes.label}>Drone ID: </h2>
                        <input
                            className={classes.input}
                            name={"id"}
                            type={"text"}
                            value={droneID}
                            disabled={true}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className={classes.right_entry}>
                        <h2 className={classes.right_entry_label}>Associated Zip Code: </h2>
                        <Dropdown 
                            name={"zipcode"} 
                            key={"zipcode"}
                            className={classes.right_entry_input} 
                            options={zipcodes}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <Entry 
                        text={"Radius: "}
                        name="radius"
                        type="text"
                        onChange={onChangeHandler}
                    />
                    <div className={classes.entry}>
                        <h2 className={classes.label}>Status: </h2>
                        <input
                            className={classes.input}
                            name={"status"}
                            type={"text"}
                            value={"Available"}
                            disabled={true}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className={classes.right_entry}>
                        <h2 className={classes.right_entry_label}>Store Associate: </h2>
                        <Dropdown 
                            key={"dronetech_username"}
                            name={"username"} 
                            className={classes.right_entry_input} 
                            options={employeeList}
                            onChange={onChangeHandler}
                        />
                    </div>
                </div>
                <div className={classes.buttons}>
                    <button className={classes.back}>
                        <Link to="/home" className={classes.link_back}>
                            Back
                        </Link>
                    </button>
                    <button className={classes.create} onClick={onSubmitHandler}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateDronePage;