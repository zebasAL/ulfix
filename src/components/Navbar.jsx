import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/horizontal-logo.png';
import NavbarUserBtns from './NavbarUserBtns';

const Navbar = () => (
  <div className="navbar-container">
    <Link to="/">
      <img
        className="pokemon-logo"
        src={logo}
        alt="logo"
      />
    </Link>
    <NavbarUserBtns />
  </div>
);

export default Navbar;
