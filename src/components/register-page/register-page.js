import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/user';
import LoginSignup from '../login-signup';

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [error, setError] = useState("");
  const { userID, setUserID } = useUser();

  const signupInputs = [
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
    }, {
      label: "Confirm Password",
      type: "password",
      name: "password2",
      value: confirmPW,
      update: setConfirmPW,
    },
  ];

  function submit(event) {
    event.preventDefault();
    axios.post("/auth/register", {
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
      });
  }

  if (userID) {
    return <Redirect to="/calculator" />;
  }

  return (
    <LoginSignup
      title={"Sign Up"}
      inputs={signupInputs}
      submitForm={submit}
      disable={email === "" || password !== confirmPW || password === ""}
      login={false}
      error={error}
    />
  );
}
