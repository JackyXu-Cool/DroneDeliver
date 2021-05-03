import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ShortEntry from "../../components/ShortEntry/ShortEntry";
import classes from "./ViewDroneTechniciansPage.module.scss";

const ViewDroneTechniciansPage = (props) => {
  const [technicians, setTechnicians] = useState([]);
  const [filters, setFilters] = useState({
    chainName: props.chainname,
    droneTech: null,
    storeName: null,
  });
  const [stores, setStores] = useState([]);

  const onChangeParameters = (event) => {
    var temp = filters;
    if (event.target === undefined) {
      temp["storeName"] = event.value;
      if (event.value === "null") {
        temp["storeName"] = null;
      }
    } else {
      temp[event.target.name] = event.target.value;
    }
    setFilters(temp);
  };

  const technicianList = async () => {
    axios
      .get("http://localhost:5000/manager/view/technicians", {
        params: {
          chainName: props.chainname,
          droneTech: filters.droneTech,
          storeName: filters.storeName,
        },
      })
      .then((response) => {
        setTechnicians(response.data.result);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getStoreLocations = async () => {
    axios
      .get("http://localhost:5000/manager/get/stores", {
        params: {
          userName: props.userName,
        },
      })
      .then((response) => {
        var temp = ["null"];
        for (var i = 0; i < response.data.res.length; i++) {
          temp.push(response.data.res[i].StoreName);
        }
        setStores(temp);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    getStoreLocations();
    if (props.chainname) {
      technicianList();
    }
  }, []);

  const onFilter = async (event) => {
    console.log(filters);
    if (props.chainname) {
      axios
        .get("http://localhost:5000/manager/view/technicians", {
          params: {
            chainName: props.chainname,
            droneTech: filters.droneTech,
            storeName: filters.storeName,
          },
        })
        .then((response) => {
          setTechnicians(response.data.result);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  const constructTable = (list) => {
    if (list.length === 0) return null;
    return list.map((user, index) => {
      return (
        <div
          key={index}
          className={
            index % 2 == 1 ? classes.element_odd : classes.element_even
          }
        >
          <div className={classes.element_user}>
            <h3 className={classes.h3}>{user["Username"]}</h3>
          </div>
          <div className={classes.element_name}>
            <h3 className={classes.h3}>{user["FullName"]}</h3>
          </div>
          <div className={classes.element_location}>
            <h3 className={classes.h3}>{user["StoreName"]}</h3>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes.viewDroneTechniciansPage}>
      <div className={classes.content}>
        <h1 className={classes.title}>Chain Manager View Drone Technicians</h1>
        <div className={classes.input}>
          <div className={classes.input_left}>
            <div className={classes.item}>
              <h2 className={classes.chain}>Chain: {props.chainname}</h2>
            </div>
            <div className={classes.item}>
              <ShortEntry
                text={"Location: "}
                name="storeName"
                dropdown
                data={stores}
                onChange={onChangeParameters}
              />
            </div>
          </div>
          <div className={classes.input_right}>
            <div className={classes.item}>
              <ShortEntry
                text={"UserName: "}
                name="droneTech"
                type="text"
                onChange={onChangeParameters}
              />
            </div>
            <div className={classes.item}>
              <button className={classes.filter} onClick={onFilter}>
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className={classes.table}>
          <div className={classes.username}>
            <h2 className={classes.h2}>Username</h2>
          </div>
          <div className={classes.name}>
            <h2 className={classes.h2}>Name</h2>
          </div>
          <div className={classes.location}>
            <h2 className={classes.h2}>Location</h2>
          </div>
          <div className={classes.technicians_wrapper}>
            {constructTable(technicians)}
          </div>
        </div>
        <button className={classes.btn_back}>
          <Link className={classes.link_back} to="/home">Back</Link>
        </button>
      </div>
    </div>
  );
};

export default ViewDroneTechniciansPage;
