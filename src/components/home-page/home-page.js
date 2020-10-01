import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to Price Your Prints!</h1>
        <p className="lead">We offer utilities for pricing your prints, tracking filament cost, and more!</p>
        <hr className="my-4"/>
        <p>Enough already! Take me to the print cost calculator.</p>
        <Link to="/calculator" className="btn btn-primary btn-lg" role="button">Price Calculator</Link>
      </div>
    </div>
  );
}

export default HomePage;
