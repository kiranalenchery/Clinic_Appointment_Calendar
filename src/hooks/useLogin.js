import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const email = "staff@clinic.com";
  const pass = "123456";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");

    let hasError = false;

    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    } else if (username !== email) {
      setUsernameError("Username is incorrect");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password !== pass) {
      setPasswordError("Password is incorrect");
      hasError = true;
    }

    if (hasError) return;

    localStorage.setItem("isAuthenticated", "true");
    navigate("/home");
  };
  return {
    username,
    setUsername,
    password,
    setPassword,
    usernameError,
    passwordError,
    handleSubmit,
  };
};

export default useLogin;
