import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/user';
import './navbar.css';

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { userID, clearUserID } = useUser();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  function logout(event) {
    event.preventDefault();
    clearUserID();
    axios.get("/auth/logout");
  }

  const logoutButton = (
    <form className="form-inline" onSubmit={logout}>
      <button className="btn btn-outline my-2 my-sm-0" type="submit" name="submit">Logout</button>
    </form>
  );

  return (
    <nav className="navbar navbar-custom navbar-expand-lg">
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
        </ul>
        { userID ? logoutButton : ''}
      </div>
    </nav>
  );
}
