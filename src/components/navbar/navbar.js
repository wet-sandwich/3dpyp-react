import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">3D PYP</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <NavLink to="/calculator" className="nav-link">Calculator</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/filaments" className="nav-link">Filament</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/printers" className="nav-link">Printers</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/hotends" className="nav-link">Hotends</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
