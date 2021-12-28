import React, { useEffect, useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'evergreen-ui';
import logo from '../assets/horizontal-logo.png';
import NavbarUserBtns from './NavbarUserBtns';
import { Users, FirebaseContext } from '../Firebase';

const Navbar = () => {
  const [userKey, setUserKey] = useState('');
  const { user } = useContext(FirebaseContext);
  const location = useLocation();

  useEffect(() => {
    let unsubscribeProfile;
    if (user?.email) {
      unsubscribeProfile = Users.getProfileByEmail(user.email, (snapshot) => {
        const profile = snapshot.val();
        // setLoaded(true);
        if (profile) {
          const data = Object.entries(snapshot.val());
          const listOfTodos = data.map(([key]) => key);
          setUserKey(listOfTodos[0]);
        } else {
          setUserKey('');
        }
      });
    }

    return () => {
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, [user?.email]);

  return (
    <div>
      {!(location.pathname === '/signin' || location.pathname === '/signup')
      && (
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/">
            <img
              id="logo"
              src={logo}
              alt="logo"
            />
          </Link>
          <Button
            appearance="minimal"
            is={Link}
            to="/profiles"
            className="remove-default-styles"
            id="users-button"
            src={logo}
            alt="logo"
            margin={3}
          >
            All Users
          </Button>
          <NavbarUserBtns userKey={userKey} />
        </div>
      </nav>
      )}
    </div>
  );
};

export default Navbar;
