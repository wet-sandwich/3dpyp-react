import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">3D PYP</Link>
      <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar" aria-controls="myNavbar" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="myNavbar">
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
