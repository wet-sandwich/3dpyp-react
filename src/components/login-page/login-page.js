import React, { useState } from 'react';
import {  Redirect } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/user';
import LoginSignup from '../login-signup';

export default function LoginPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userID, setUserID } = useUser();

  const loginInputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
      value: email,
      update: setEmail,
    }, {
      label: "Password",
      type: "password",
      name: "password",
      value: password,
      update: setPassword,
    },
  ];

  function submit(event) {
    event.preventDefault();
    axios.post("/auth/login", {
      email: email,
      password: password,
    }, { withCredentials: true })
      .then(result => {
        if (result.status === 200) {
          setUserID(result.data);
        } else {
          setError(result.data);
        }
      })
      .catch(err => {
        console.log(err);
        setError("Invalid log in credentials");
      });
  }

  if (userID) {
    return <Redirect to="/calculator" />;
  }

  return (
    <LoginSignup
      title={"Log In"}
      inputs={loginInputs}
      submitForm={submit}
      disable={email === "" || password === ""}
      login={true}
      error={error}
    />
  );
}
