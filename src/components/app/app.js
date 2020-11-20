import React, { useState } from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../../context/user';
import PrivateRoute from '../private-route';

import Navbar from '../navbar';
import Footer from '../footer';
import HomePage from '../home-page';
import PrinterPage from '../printer-page';
import PricingPage from '../pricing-page';
import FilamentPage from '../filament-page';
import RegisterPage from '../register-page';
import LoginPage from '../login-page';

export default function App() {
  const existingID = JSON.parse(localStorage.getItem("userID"));
  const [userID, setUserID] = useState(existingID);

  const setID = (data) => {
    localStorage.setItem("userID", JSON.stringify(data));
    setUserID(data);
  }

  const clearID = () => {
    localStorage.removeItem("userID");
    setUserID();
  }

  return (
    <UserContext.Provider value={{ userID, setUserID: setID, clearUserID: clearID}}>
      <div className="page-container">
        <div className="content-wrap">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/filaments" component={FilamentPage} />
            <PrivateRoute path="/printers" component={PrinterPage} />
            <PrivateRoute path="/calculator" component={PricingPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}
