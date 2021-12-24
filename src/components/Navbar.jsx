import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'evergreen-ui';
import logo from '../assets/horizontal-logo.png';
import NavbarUserBtns from './NavbarUserBtns';

const Navbar = () => {
  const location = useLocation();

  return (
    <div>
      {!(location.pathname === '/signin' || location.pathname === '/signup')
      && (
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/">
            <img
              className="pokemon-logo"
              src={logo}
              alt="logo"
            />
          </Link>
          <Button
            appearance="minimal"
            is={Link}
            to="/profiles"
            className="pokemon-logo"
            src={logo}
            alt="logo"
            margin={3}
          >
            All Users
          </Button>
          <NavbarUserBtns />
        </div>
      </nav>
      )}
    </div>
  );
};

export default Navbar;
