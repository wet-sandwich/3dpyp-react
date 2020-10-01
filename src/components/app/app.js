import React from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../navbar';
import Footer from '../footer';
import HomePage from '../home-page';
import HotendPage from '../hotend-page';
import PrinterPage from '../printer-page';
import PricingPage from '../pricing-page';
import FilamentPage from '../filament-page';

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/filaments">
            <FilamentPage />
          </Route>
          <Route path="/printers">
            <PrinterPage />
          </Route>
          <Route path="/hotends">
            <HotendPage />
          </Route>
          <Route path="/calculator">
            <PricingPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
