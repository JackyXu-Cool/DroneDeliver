import React, { useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from "axios";

import LoginPage from "./pages/LoginPage/LoginPage";
import StartPage from "./pages/StartPage/StartPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";

import classes from "./App.module.scss";

const App = () => {
  //global states
  const [dummy, setDummy] = useState(0);

  // login page states
  const [login, setLogin] = useState({ loginUsername: "", loginPassword: "" });
  const [canLogin, setCanLogin] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginSuccessInfo, setLoginSuccessInfo] = useState({ information: {} });

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
          var info = {information: response.data.information};
          setLoginSuccess(true);
          setLoginSuccessInfo(info);
          console.log(response);
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
    temp[event.target.name] = event.target.value;
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
            information={loginSuccessInfo}
          />
      </Route>
    </BrowserRouter>
  );
};

export default App;
