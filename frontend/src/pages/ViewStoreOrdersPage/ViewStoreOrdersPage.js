import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-dropdown";
import axios from "axios";

import classes from "./ViewStoreOrdersPage.module.scss";

const ViewStoreOrdersPage = (props) => {
  const [filters, setFilters] = useState({ start: null, end: null });
  const [orders, setOrders] = useState([]);
  const [currentID, setCurrentID] = useState(null);
  const [drones, setDrones] = useState([]);
  const status = ["In Transit", "Drone Assigned", "Delivered"];
  const operator = [props.userName];

  const enterFilters = (event) => {
    var temp = filters;
    var value = event.target.value;
    if (value === "") {
      value = null;
    }
    temp[event.target.name] = value;
    setFilters(temp);
  };

  const getOrders = async () => {
    axios
      .get("http://localhost:5000/dronetech/view/store/drones", {
        params: {
          username: props.userName,
          startDate: filters.start,
          endDate: filters.end,
        },
      })
      .then((response) => {
        setOrders(response.data.result);
        setCurrentID(response.data.result[0].ID);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getAvailableDrones = async () => {
    axios
      .get("http://localhost:5000/dronetech/get/available/drones", {
        params: {
          username: props.userName,
        },
      })
      .then((response) => {
        setDrones(response.data.dronesId);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const constructTable = (list) => {
    if (list.length === 0) return null;
    return list.map((order, index) => {
      if (order.Status === "Pending") {
        return (
          <div
            key={index}
            className={
              index % 2 === 1 ? classes.element_odd : classes.element_even
            }
            name={order.ID}
          >
            <div className={classes.element_id}>
              <h3 className={classes.h3}>{order["ID"]}</h3>
            </div>
            <div className={classes.element_operator}>
              <Dropdown
                name="Operator"
                placeholder={"NULL"}
                options={operator}
              />
            </div>
            <div className={classes.element_date}>
              <h3 className={classes.h3}>{order["Date"].substring(0, 10)}</h3>
            </div>
            <div className={classes.element_drone_id}>
              <Dropdown name="DroneID" placeholder={"NULL"} options={drones} />
            </div>
            <div className={classes.element_status}>
              <h3 className={classes.h3}>
                <Dropdown name="Status" placeholder={"NULL"} options={status} />
              </h3>
            </div>
            <div className={classes.element_total}>
              <h3 className={classes.h3}>{order["Total"]}</h3>
            </div>
            <div className={classes.element_selection}>
              <button
                className={
                  currentID === order.ID
                    ? classes.check_blue
                    : classes.check_white
                }
                name={order.ID}
                onClick={onSelectID}
              ></button>
            </div>
          </div>
        );
      } else {
        console.log(currentID);
        return (
          <div
            key={index}
            className={
              index % 2 === 1 ? classes.element_odd : classes.element_even
            }
            name={order.ID}
          >
            <div className={classes.element_id}>
              <h3 className={classes.h3}>{order["ID"]}</h3>
            </div>
            <div className={classes.element_operator}>
              <h3 className={classes.h3}>{order["Operator"]}</h3>
            </div>
            <div className={classes.element_date}>
              <h3 className={classes.h3}>{order["Date"].substring(0, 10)}</h3>
            </div>
            <div className={classes.element_drone_id}>
              <h3 className={classes.h3}>{order["DroneID"]}</h3>
            </div>
            <div className={classes.element_status}>
              <h3 className={classes.h3}>{order["Status"]}</h3>
            </div>
            <div className={classes.element_total}>
              <h3 className={classes.h3}>{order["Total"]}</h3>
            </div>
            <div className={classes.element_selection}>
              <button
                className={
                  currentID === order.ID
                    ? classes.check_blue
                    : classes.check_white
                }
                name={order.ID}
                onClick={onSelectID}
              ></button>
            </div>
          </div>
        );
      }
    });
  };

  const onFilter = (event) => {
    getOrders();
  };

  const onSelectID = (event) => {
    setCurrentID(parseInt(event.target.name));
  };

  const onSave = async (event) => {
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].ID === currentID) {
        axios
          .post("http://localhost:5000/dronetech/assign/drontech", {
            username: props.userName,
            droneid: orders[i].DroneID,
            orderid: orders[i].ID,
            status: orders[i].Status,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
      break;
    }
  };

  const onViewOrderDetails = (event) => {
    localStorage.setItem("orderID", currentID);
  };

  useEffect(() => {
    getOrders();
    getAvailableDrones();
  }, []);

  return (
    <div className={classes.viewStoreOrdersPage}>
      <div className={classes.content}>
        <h1 className={classes.title}>View Store Orders</h1>
        <div className={classes.dates}>
          <h2 className={classes.label}>Dates: </h2>
          <input
            className={classes.input}
            name="start"
            placeholder=" yyyy-mm-dd"
            onChange={enterFilters}
          />
          <h2 className={classes.line}>--</h2>
          <input
            className={classes.input}
            name="end"
            placeholder=" yyyy-mm-dd"
            onChange={enterFilters}
          />
        </div>
        <div className={classes.table}>
          <div className={classes.id}>
            <h2 className={classes.h2}>ID</h2>
          </div>
          <div className={classes.operator}>
            <h2 className={classes.h2}>Operator</h2>
          </div>
          <div className={classes.date}>
            <h2 className={classes.h2}>Date</h2>
          </div>
          <div className={classes.drone_id}>
            <h2 className={classes.h2}>Drone ID</h2>
          </div>
          <div className={classes.status}>
            <h2 className={classes.h2}>Status</h2>
          </div>
          <div className={classes.total}>
            <h2 className={classes.h2}>Total</h2>
          </div>
          <div className={classes.selection}></div>
          <div className={classes.wrapper}>{constructTable(orders)}</div>
        </div>
        <button className={classes.filter} onClick={onFilter}>
          Filter
        </button>
        <button
          className={classes.view_order_details}
          onClick={onViewOrderDetails}
        >
          View Order Details
        </button>
        <button className={classes.assign} onClick={onSave}>
          Save
        </button>
        <button className={classes.back}>
          <Link className={classes.link} to="/home">
            Back
          </Link>
        </button>
      </div>
    </div>
  );
};
export default ViewStoreOrdersPage;
