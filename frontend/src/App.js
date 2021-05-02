import React, { useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from "axios";

import LoginPage from "./pages/LoginPage/LoginPage";
import StartPage from "./pages/StartPage/StartPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import CreateGroceryChainPage from "./pages/CreateGroceryChainPage/CreateGroceryChainPage";
import ChangeCreditCardPage from "./pages/ChangeCreditCardPage/ChangeCreditCardPage";
import CreateStorePage from "./pages/CreateStorePage/CreateStorePage";
import CreateItemPage from "./pages/CreateItemPage/CreateItemPage";
import CreateDronePage from "./pages/CreateDronePage/CreateDronePage";
import ViewOrderHistoryPage from "./pages/ViewOrderHistoryPage/ViewOrderHistoryPage";
import ViewDronesPage from "./pages/ViewDronesPage/ViewDronesPage";
import ViewCustomerPage from "./pages/ViewCustomerPage/ViewCustomerPage";
import ManageStoresPage from "./pages/ManageStoresPage/ManageStoresPage";
import CreateChainItemPage from "./pages/CreateChainItemPage/CreateChainItemPage";
import ViewDroneTechniciansPage from "./pages/ViewDroneTechniciansPage/ViewDroneTechniciansPage";
import ViewStoreItemPage from "./pages/ViewStoreItemPage/ViewStoreItemPage";
import ReviewOrderPage from "./pages/ReviewOrderPage/ReviewOrderPage";

import states from "./assets/states";
import types from "./assets/types";
import initialItems from "./assets/InitialItems";

import classes from "./App.module.scss";

const App = () => {
  //global states
  const [dummy, setDummy] = useState(0);

  // login page states
  const [login, setLogin] = useState({ loginUsername: "", loginPassword: "" });
  const [canLogin, setCanLogin] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  //register page states
  const [register, setRegister] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    confirm: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    role: "Customer",
    cardnumber: "",
    cvv: "",
    exp: "",
    chainname: "",
    storename: "",
  });
  const [canRegister, setCanRegister] = useState(false);
  const basicFields = [
    "fname",
    "lname",
    "username",
    "password",
    "confirm",
    "street",
    "city",
    "state",
    "zip",
  ];
  const [actualRole, setActualRole] = useState("Customer");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Change Credit Card Information page states
  const [ccInfo, setCCInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    ccNumber: "",
    cvv: "",
    exp_date: "",
  });

  // Create Grocery Chain State
  const [chainName, setChainName] = useState("");

  // Create Store State
  const [createStoreInfo, setCreateStoreInfo] = useState({
    storeName: "",
    chainName: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  // Create Item State
  const [createItemInfo, setCreateItemInfo] = useState({
    itemName: "",
    type: "",
    organic: "",
    origin: "",
  });

  const [generalItems, setGeneralItems] = useState(initialItems);

  // View drones State
  const [droneFilters, setDroneFilters] = useState({
    droneID: "",
    radius: "",
  });

  const [displayedDrones, setDisplayedDrones] = useState([]);

  // View drones State
  const [customerViewOrdeRIDs, setCustomerViewOrdeRIDs] = useState([]);
  const [customerViewOrderInfo, setCustomerViewOrderInfo] = useState({
    total_amount: "",
    total_items: "",
    orderdate: "",
    droneID: "",
    dronetech: "",
    orderstatus: "",
  });

  // Manage stores state
  const [manageStoresChainName, setManageStoresChainName] = useState("");
  const [managedStores, setManagedStores] = useState([]);
  const [managedStoresFilters, setManagedStoresFilters] = useState({
    store_name: "",
    min_range: "",
    max_range: "",
  });
  const [displayedManagedStores, setDisplayedManagedStores] = useState([]);

  // Manager create chain item state
  const [newChainItem, setNewChainItem] = useState({
    chainname: "",
    item: "",
    quantityavailable: "",
    limitperorder: "",
    plunumber: "",
    priceperunit: "",
  });
  const [canCreateChainItem, setCanCreateChainItem] = useState(false);
  const [createChainItemSuccess, setCreateChainItemSuccess] = useState(false);

  /*------------------------------ login page handlers ------------------------------*/
  // enter login data
  const enterLogin = (event) => {
    var temp = login;
    temp[event.target.name] = event.target.value;
    if (login.loginUsername !== "" && login.loginPassword !== "") {
      setCanLogin(true);
    }
    setLogin(temp);
  };

  //log in when clicking login button
  const loginOnClick = async (event) => {
    console.log(login);
    if (canLogin) {
      axios
        .post("http://localhost:5000/user/login", {
          username: login.loginUsername,
          password: login.loginPassword,
        })
        .then((response) => {
          localStorage.clear();
          localStorage.setItem(
            "identity",
            response.data.information["identity"]
          );
          localStorage.setItem("username", login.loginUsername);
          if (response.data.information["identity"] === "Manager") {
            localStorage.setItem(
              "chainname",
              response.data.information["chainname"]
            );
          }
          setLoginSuccess(true);
        })
        .catch((error) => {
          setLoginSuccess(false);
          alert(error.response.data.message);
        });
    }
  };

  /*------------------------------ register page handlers ------------------------------*/
  //enter register fields
  const enterRegister = (event) => {
    var temp = register;
    if (event.target === undefined) {
      temp["state"] = event.value;
    } else {
      temp[event.target.name] = event.target.value;
    }
    setRegister(temp);

    var basic = register.confirm === register.password;
    for (var i = 0; i < basicFields.length; i++) {
      if (register[basicFields[i]] === "") {
        basic = false;
        break;
      }
    }

    if (!basic) {
      setCanRegister(false);
    } else {
      if (register.role === "Customer") {
        setCanRegister(
          register.cardnumber !== "" &&
            register.cvv !== "" &&
            register.exp !== ""
        );
      } else {
        setCanRegister(register.chainname !== "");
      }
    }
  };

  //select register role from navigation
  const switchRegisterRole = (event) => {
    var temp = register;
    temp.role = event.target.value;
    setRegister(temp);
    setDummy(dummy + 1);

    var basic = register.confirm === register.password;
    for (var i = 0; i < basicFields.length; i++) {
      if (register[basicFields[i]] === "") {
        basic = false;
        break;
      }
    }

    if (!basic) {
      setCanRegister(false);
    } else {
      if (register.role === "Customer") {
        setCanRegister(
          register.cardnumber !== "" &&
            register.cvv !== "" &&
            register.exp !== ""
        );
      } else {
        setCanRegister(register.chainname !== "" && register.storename !== "");
      }
    }
  };

  //register when clicking register button
  const registerOnClick = async (event) => {
    if (canRegister) {
      if (register.role === "Customer") {
        console.log(register);
        axios
          .post("http://localhost:5000/user/register/customer", {
            username: register.username,
            password: register.password,
            fname: register.fname,
            lname: register.lname,
            street: register.street,
            city: register.city,
            state: register.state,
            zipcode: register.zip,
            ccnumber: register.cardnumber,
            cvv: register.cvv,
            exp_date: register.exp,
          })
          .then((response) => {
            setRegisterSuccess(true);
            console.log(response);
          })
          .catch((error) => {
            setRegisterSuccess(false);
            console.log(error);
          });
      } else if (register.storename === "") {
        axios
          .post("http://localhost:5000/user/register/manager", {
            username: register.username,
            password: register.password,
            fname: register.fname,
            lname: register.lname,
            street: register.street,
            city: register.city,
            state: register.state,
            zipcode: register.zip,
            chainName: register.chainname,
          })
          .then((response) => {
            setRegisterSuccess(true);
            setActualRole("Manager");
            console.log(response);
          })
          .catch((error) => {
            setRegisterSuccess(false);
            console.log(error);
          });
      } else {
        axios
          .post("http://localhost:5000/user/register/dronetech", {
            username: register.username,
            password: register.password,
            fname: register.fname,
            lname: register.lname,
            street: register.street,
            city: register.city,
            state: register.state,
            zipcode: register.zip,
            storeName: register.storename,
            chainName: register.chainname,
          })
          .then((response) => {
            setRegisterSuccess(true);
            setActualRole("Drone Technician");
            console.log(response);
          })
          .catch((error) => {
            setRegisterSuccess(false);
            console.log(error);
          });
      }
    }
  };

  /*------------------------------ create grocery chain page handlers ------------------------------*/
  const createChainHandler = (event) => {
    setChainName(event.target.value);
  };

  const createChain = async (event) => {
    axios
      .post("http://localhost:5000/admin/create/grocerychain", {
        chainName: chainName,
      })
      .then(() => {
        alert("successfully created a new chain");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  /* ------------------- Create new store handler -----------------------------*/
  const onCreateStore = (event) => {
    var temp = createStoreInfo;
    if (event.target === undefined) {
      if (states.includes(event.value)) {
        temp["state"] = event.value;
      } else {
        temp["chainName"] = event.value;
      }
    } else {
      temp[event.target.name] = event.target.value;
    }
    setCreateStoreInfo(temp);
  };

  const submitCreateStore = async () => {
    if (
      createStoreInfo.storeName === "" ||
      createStoreInfo.chainName === "" ||
      createStoreInfo.street === "" ||
      createStoreInfo.street === "" ||
      createStoreInfo.city === "" ||
      createStoreInfo.state === "" ||
      createStoreInfo.zipcode === ""
    ) {
      alert("Please fill in all the information!");
      return;
    }
    axios
      .post("http://localhost:5000/admin/create/store", {
        storeName: createStoreInfo.storeName,
        chainName: createStoreInfo.chainName,
        street: createStoreInfo.street,
        zipcode: createStoreInfo.zipcode,
        city: createStoreInfo.city,
        state: createStoreInfo.state,
      })
      .then(() => {
        alert("successfully created a new store");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  /** --------------- Admin create new item handler ------------------------------*/
  const onCreateNewItem = (event) => {
    var temp = createItemInfo;
    if (event.target === undefined) {
      if (types.includes(event.value)) {
        temp["type"] = event.value;
      } else {
        temp["organic"] = event.value;
      }
    } else {
      temp[event.target.name] = event.target.value;
      var temp1 = generalItems;
      temp1.push(event.target.name);
      setGeneralItems(temp1);
    }
    setCreateItemInfo(temp);
  };

  const submitNewItem = () => {
    if (
      createItemInfo.origin === "" ||
      createItemInfo.type === "" ||
      createItemInfo.itemName === "" ||
      createItemInfo.organic === ""
    ) {
      alert("Please fill in all the information!");
      return;
    }
    axios
      .post("http://localhost:5000/admin/create/item", {
        itemName: createItemInfo.itemName,
        type: createItemInfo.type,
        organic: createItemInfo.organic,
        origin: createItemInfo.origin,
      })
      .then(() => {
        alert("successfully created a new item");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  /*------------------------------ manager view drones page handlers ------------------------------*/
  const enterDroneFilter = (event) => {
    var temp = droneFilters;
    temp[event.target.name] = event.target.value;
    setDroneFilters(temp);
  };

  const onViewDroneScreen = async () => {
    setDroneFilters({
      droneID: "",
      radius: "",
    });

    // Previous set droneFilter statement always lag behind 1 button click for some reason
    // (i.e. after clicking once, droneFilter does not get reset, after another click it get reset)
    // thus making get request with hardcoded parameters instead of calling onFilter(). Same reason for functions below
    axios
      .get("http://localhost:5000/manager/get/filteredDrones", {
        params: {
          username: localStorage.username,
          droneID: "",
          radius: "",
        },
      })
      .then((res) => {
        setDisplayedDrones(res.data.result);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const onFilterDrones = async () => {
    axios
      .get("http://localhost:5000/manager/get/filteredDrones", {
        params: {
          username: localStorage.username,
          droneID: droneFilters.droneID,
          radius: droneFilters.radius,
        },
      })
      .then((res) => {
        setDisplayedDrones(res.data.result);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const onResetDroneFilters = async () => {
    axios
      .get("http://localhost:5000/manager/get/filteredDrones", {
        params: {
          username: localStorage.username,
          droneID: "",
          radius: "",
        },
      })
      .then((res) => {
        setDisplayedDrones(res.data.result);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const onSelectDroneSortBy = (event) => {
    let sort_by = event.target.value;
    let temp = displayedDrones;
    if (sort_by === "DroneIDUp") {
      temp.sort((a, b) => a.ID - b.ID);
    } else if (sort_by === "DroneIDDown") {
      temp.sort((a, b) => b.ID - a.ID);
    } else if (sort_by === "RadiusUp") {
      temp.sort((a, b) => a.Radius - b.Radius);
    } else if (sort_by === "RadiusDown") {
      temp.sort((a, b) => b.Radius - a.Radius);
    } else if (sort_by === "ZipcodeUp") {
      temp.sort((a, b) => a.Zip - b.Zip);
    } else if (sort_by === "ZipcodeDown") {
      temp.sort((a, b) => b.Zip - a.Zip);
    } else if (sort_by === "StatusUp") {
      temp.sort((a, b) => (a.DroneStatus > b.DroneStatus ? 1 : -1));
    } else if (sort_by === "StatusDown") {
      temp.sort((a, b) => (a.DroneStatus > b.DroneStatus ? -1 : 1));
    }

    setDisplayedDrones(temp);
    setDummy(dummy + 1);
  };

  /*------------------------------ manager create new chain item handlers ------------------------------*/
  const enterChainItem = (event) => {
    var temp = newChainItem;
    if (event.target === undefined) {
      temp["item"] = event.value;
    } else {
      temp[event.target.name] = event.target.value;
    }
    setNewChainItem(temp);
    if (
      temp.chainname !== "" &&
      temp.item !== "" &&
      temp.item !== "Select Item" &&
      temp.quantityavailable !== "" &&
      temp.limitperorder !== "" &&
      temp.plunumber !== "" &&
      temp.priceperunit !== ""
    ) {
      setCanCreateChainItem(true);
    } else {
      setCanCreateChainItem(false);
    }
  };

  /*------------------------------ manager manage stores page handlers ------------------------------*/
  const onManageStoresScreen = () => {
    setManagedStoresFilters({
      store_name: "",
      min_range: "",
      max_range: "",
    });
    axios
      .get("http://localhost:5000/manager/get/stores", {
        params: {
          username: localStorage.username,
        },
      })
      .then((res) => {
        let temp = res.data.res;
        setManageStoresChainName(temp[0].ChainName);
        temp = temp.map((entry) => {
          if (entry.StoreName) {
            return entry.StoreName;
          }
        });
        temp = ["All", ...temp];
        setManagedStores(temp);
      })
      .catch((error) => {
        alert(error);
      });

    axios
      .get("http://localhost:5000/manager/manage/stores", {
        params: {
          userName: localStorage.username,
          storeName: "All",
          minTotal: "",
          maxTotal: "",
        },
      })
      .then((res) => {
        setDisplayedManagedStores(res.data.result);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onEnterManagedStoresFilters = (event) => {
    var temp = managedStoresFilters;
    temp[event.target.name] = event.target.value;
    setManagedStoresFilters(temp);
  };

  const onFilterManagedStores = async () => {
    axios
      .get("http://localhost:5000/manager/manage/stores", {
        params: {
          userName: localStorage.username,
          storeName: managedStoresFilters.store_name,
          minTotal: managedStoresFilters.min_range,
          maxTotal: managedStoresFilters.max_range,
        },
      })
      .then((res) => {
        setDisplayedManagedStores(res.data.result);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onResetManagedStoresFilter = async () => {
    setManagedStoresFilters({
      store_name: "",
      min_range: "",
      max_range: "",
    });
    axios
      .get("http://localhost:5000/manager/manage/stores", {
        params: {
          userName: localStorage.username,
          storeName: "",
          minTotal: "",
          maxTotal: "",
        },
      })
      .then((res) => {
        setDisplayedManagedStores(res.data.result);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onSelectManagedStoresSortBy = async (event) => {
    let sort_by = event.target.value;
    let temp = displayedManagedStores;
    if (sort_by === "NameUp") {
      temp.sort((a, b) => (a.StoreName > b.StoreName ? 1 : -1));
    } else if (sort_by === "NameDown") {
      temp.sort((a, b) => (a.StoreName > b.StoreName ? -1 : 1));
    } else if (sort_by === "AddressUp") {
      temp.sort((a, b) => (a.address > b.address ? 1 : -1));
    } else if (sort_by === "AddressDown") {
      temp.sort((a, b) => (a.address > b.address ? -1 : 1));
    } else if (sort_by === "OrdersUp") {
      temp.sort((a, b) => a.Orders - b.Orders);
    } else if (sort_by === "OrdersDown") {
      temp.sort((a, b) => b.Orders - a.Orders);
    } else if (sort_by === "EmployeesUp") {
      temp.sort((a, b) => (a.Employees > b.Employees ? 1 : -1));
    } else if (sort_by === "EmployeesDown") {
      temp.sort((a, b) => (a.Employees > b.Employees ? -1 : 1));
    } else if (sort_by === "TotalUp") {
      temp.sort((a, b) => (a.Total > b.Total ? 1 : -1));
    } else if (sort_by === "TotalDown") {
      temp.sort((a, b) => (a.Total > b.Total ? -1 : 1));
    }

    setDisplayedManagedStores(temp);
    setDummy(dummy + 1);
  };

  /*------------------------------ change credit card info page handlers ------------------------------*/
  const onCreateChainItem = async (event) => {
    if (canCreateChainItem) {
      axios
        .post("http://localhost:5000/manager/create/chainItem", {
          chainName: newChainItem.chainname,
          itemName: newChainItem.item,
          quantity: parseInt(newChainItem.quantityavailable),
          orderLimit: parseInt(newChainItem.limitperorder),
          PLU: parseInt(newChainItem.plunumber),
          price: parseFloat(newChainItem.priceperunit),
        })
        .then((response) => {
          setCreateChainItemSuccess(true);
          console.log(response);
        })
        .catch((error) => {
          setCreateChainItemSuccess(false);
          console.log(error);
        });
    }
  };

  /*------------------------------ customer change credit card info page handlers ------------------------------*/
  const enterCCInfo = (event) => {
    var temp = ccInfo;
    temp[event.target.name] = event.target.value;
    setCCInfo(temp);
  };

  const submitCCInfo = () => {
    console.log({
      username: localStorage.username,
      ccNumber: ccInfo.ccNumber,
      cvv: ccInfo.cvv,
      exp_date: ccInfo.exp_date,
    });

    let today = new Date();
    console.log(today.getTime());
    console.log(Date.parse());

    if (ccInfo.ccNumber === "") {
      alert("Credit Card Number must not be empty");
      return;
    }
    if (ccInfo.cvv === "") {
      alert("Security Code must not be empty");
      return;
    }
    if (ccInfo.exp_date === "") {
      alert("Expiration Date must not be empty");
      return;
    }
    if (Date.parse(new Date()) >= Date.parse(ccInfo.exp_date)) {
      alert("Card must not be expired");
      return;
    }

    axios
      .post("http://localhost:5000/customer/change/ccinfo", {
        username: localStorage.username,
        ccNumber: ccInfo.ccNumber,
        cvv: ccInfo.cvv,
        exp_date: ccInfo.exp_date,
      })
      .then(() => {
        alert("successfully updated credit card information");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  /*------------------------------ customer view order history page handler ------------------------------*/
  const onViewOrderHistoryScreen = async () => {
    axios
      .get("http://localhost:5000/customer/get/orderIDs", {
        params: {
          username: localStorage.username,
        },
      })
      .then((res) => {
        let temp = res.data.res.map((entry) => entry.ID).sort();
        setCustomerViewOrdeRIDs(temp);
        if (temp.length > 0) {
          let id = temp[0];
          axios
            .get("http://localhost:5000/customer/get/orderInfo", {
              params: {
                username: localStorage.username,
                orderId: id,
              },
            })
            .then((res) => {
              let order_detail_info = res.data.result[0];
              let order_date = order_detail_info.orderdate;
              order_detail_info.orderdate = order_date.substring(0, 10);

              setCustomerViewOrderInfo(order_detail_info);
            })
            .catch((error) => {
              alert(error);
            });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onViewOrderHistory = async () => {
    axios
      .get("http://localhost:5000/customer/get/orderIDs", {
        params: {
          username: localStorage.username,
        },
      })
      .then((res) => {
        let temp = res.data.res.map((entry) => entry.ID).sort();
        setCustomerViewOrdeRIDs(temp);
        if (temp.length > 0) {
          let id = temp[0];
          axios
            .get("http://localhost:5000/customer/get/orderInfo", {
              params: {
                username: localStorage.username,
                orderId: id,
              },
            })
            .then((res) => {
              let order_detail_info = res.data.result[0];
              let order_date = order_detail_info.orderdate;
              order_detail_info.orderdate = order_date.substring(0, 10);

              setCustomerViewOrderInfo(order_detail_info);
            })
            .catch((error) => {
              alert(error);
            });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onSelectViewOrderID = async (event) => {
    let order_id = event.target.value;
    axios
      .get("http://localhost:5000/customer/get/orderInfo", {
        params: {
          username: localStorage.username,
          orderId: order_id,
        },
      })
      .then((res) => {
        let order_detail_info = res.data.result[0];
        let order_date = order_detail_info.orderdate;
        order_detail_info.orderdate = order_date.substring(0, 10);

        setCustomerViewOrderInfo(order_detail_info);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <BrowserRouter className={classes.app}>
      <Route path={"/"} exact>
        <StartPage />
      </Route>
      <Route path={"/login"} exact>
        {loginSuccess ? (
          <Redirect to="/home" />
        ) : (
          <LoginPage
            login={login}
            canLogin={canLogin}
            loginSuccess={loginSuccess}
            enterLogin={enterLogin}
            loginOnClick={loginOnClick}
          />
        )}
      </Route>
      <Route path={"/register"} exact>
        <RegisterPage
          role={register.role}
          canRegister={canRegister}
          actualRole={actualRole}
          registerSuccess={registerSuccess}
          switchRegisterRole={switchRegisterRole}
          enterRegister={enterRegister}
          registerOnClick={registerOnClick}
        />
      </Route>
      <Route path={"/home"} exact>
        <HomePage
          onEnterManageStores={onManageStoresScreen}
          onEnterViewDrones={onViewDroneScreen}
          onEnterViewOrderHistory={onViewOrderHistoryScreen}
        />
      </Route>
      <Route path={"/admin/create/grocerychain"} exact>
        <CreateGroceryChainPage
          onCreateChainHandler={createChainHandler}
          createChain={createChain}
        />
      </Route>
      <Route path={"/admin/create/store"} exact>
        <CreateStorePage
          onCreateStore={onCreateStore}
          createStore={submitCreateStore}
        />
      </Route>
      <Route path={"/admin/create/item"} exact>
        <CreateItemPage
          onCreateItem={onCreateNewItem}
          submitCreateNewItem={submitNewItem}
        />
      </Route>
      <Route path={"/admin/create/drone"} exact>
        <CreateDronePage />
      </Route>
      <Route path={"/admin/view/customers"} exact>
        <ViewCustomerPage />
      </Route>
      <Route path={"/manager/view/drones"} exact>
        <ViewDronesPage
          droneFilters={droneFilters}
          onEnter={enterDroneFilter}
          onFilter={onFilterDrones}
          onSort={onSelectDroneSortBy}
          displayedDrones={displayedDrones}
          onReset={onResetDroneFilters}
        />
      </Route>
      <Route path={"/manager/manage/stores"}>
        <ManageStoresPage
          chainName={manageStoresChainName}
          stores={managedStores}
          displayedStores={displayedManagedStores}
          onEnter={onEnterManagedStoresFilters}
          onFilter={onFilterManagedStores}
          onReset={onResetManagedStoresFilter}
          onSort={onSelectManagedStoresSortBy}
        />
      </Route>
      <Route path={"/customer/changeCCInfo"} exact>
        <ChangeCreditCardPage
          username={localStorage.username}
          onEnter={enterCCInfo}
          onSubmit={submitCCInfo}
        />
      </Route>
      <Route path={"/customer/view/orderhistory"} exact>
        <ViewOrderHistoryPage
          username={localStorage.username}
          orderIDs={customerViewOrdeRIDs}
          orderInfo={customerViewOrderInfo}
          onSelect={onSelectViewOrderID}
        />
      </Route>
      <Route path={"/manager/create/chainitem"} exact>
        <CreateChainItemPage
          generalItems={generalItems}
          canCreateChainItem={canCreateChainItem}
          createChainItemSuccess={createChainItemSuccess}
          enterChainItem={enterChainItem}
          onCreateChainItem={onCreateChainItem}
        />
      </Route>
      <Route path={"/manager/view/dronetechnicians"} exact>
        <ViewDroneTechniciansPage
          chainname={localStorage.chainname}
          userName={localStorage.username}
        />
      </Route>
      <Route path={"/customer/view/store/items"} exact>
          <ViewStoreItemPage

          />
      </Route>
      <Route path={"/customer/review/order"} exact>
          <ReviewOrderPage 
          />
      </Route>
    </BrowserRouter>
  );
};

export default App;
