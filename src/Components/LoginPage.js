import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Config/url";
import { useAuth } from "./AuthContext";
const LoginPage = () => {
  const { isLoggedIn, login } = useAuth();

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem
        ? `Bearer ${localStorage.getItem("token")}`
        : null,
    },
  });
  const navigate = useNavigate();
  const data = {
    email: "",
    password: "",
    rememberMe: false,
  };
  const [userLogin, setUserLogin] = useState({ ...data });
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
    setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleRememberMe = (e) => {
    const { name, checked } = e.target;
    setRemember(checked);
    setUserLogin({ ...userLogin, [name]: checked });
    if (checked) {
      localStorage.setItem("email", userLogin.email);
      localStorage.setItem("password", userLogin.password);
    }
  };
  //   useEffect(() => {
  //     const rememberedEmail = localStorage.getItem("rememberedEmail");
  //     const rememberedPassword = localStorage.getItem("rememberedPassword");
  //     if (rememberedEmail && rememberedPassword) {
  //       setUserLogin({
  //         ...userLogin,
  //         email: rememberedEmail,
  //         password: rememberedPassword,
  //       });
  //     }
  //   }, []);

  const LoginUser = async (e) => {
    try {
      e.preventDefault();
      const isValid = validation();
      if (isValid) {
        const userData = await axiosInstance.post("/login", userLogin);
        console.log(userData, "d");
        if (userData.data.sucess) {
          localStorage.setItem("token", userData.data.token);
          localStorage.setItem("isLoggedIn", "true");
          setUserLogin({ ...data });
          login();
          navigate("/home");
        } else {
          console.log(userData.data.message);
        }
      }
      console.log(userLogin);
    } catch (error) {
      console.log(error);
    }
  };
  const validation = () => {
    const newError = {};
    if (!userLogin.email) {
      newError.email = "email is required";
    }
    if (!userLogin.password) {
      newError.password = "password is required";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };
  return (
    <>
      <div className="loginbox">
        <div className="login-content">
          <h3 className="heading">Login ...</h3>
          <div className="email">
            <label>Email</label>
            <input
              type="email"
              autoComplete="off"
              name="email"
              value={userLogin.email}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <span className="error">{error.email}</span>
          </div>
          <div className="password">
            <label>Password</label>
            <input
              type="password"
              autoComplete="off"
              name="password"
              value={userLogin.password}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <span className="error">{error.password}</span>
          </div>
          <div
            className="remember"
            style={{ color: remember ? "#FF7F00" : "unset" }}
          >
            <label>Remember Me</label>
            <input
              type="checkbox"
              name="rememberMe"
              onChange={(e) => handleRememberMe(e)}
              style={{ color: remember ? "#FF7F00" : "unset" }}
            ></input>
          </div>
          <Button
            type="submit"
            className="btntxt"
            onClick={(e) => LoginUser(e)}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
