import React, { useContext } from 'react';
import {
  Popover, Pane, Button, UserIcon, Icon,
} from 'evergreen-ui/';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { FirebaseContext } from '../Firebase';

const NavbarUserBtns = ({
  userKey,
}) => {
  const { user } = useContext(FirebaseContext);

  const options = (
    <Pane
      paddingX={0}
    >
      <div className="user-login-options">
        {user
          ? (
            <>
              <Button is={Link} id="profile-btn" to={`/profiles/${userKey}`}>Your profile</Button>
              <Button is={Link} id="logout-btn" to="/logout">Log out</Button>
            </>
          )
          : (
            <>
              <Button is={Link} id="signin-btn" to="/signin">Sign In</Button>
              <Button is={Link} id="profile-btn" to="/profiles">Profiles</Button>
            </>
          )}
      </div>
    </Pane>
  );

  return (
    <div>
      <Popover
        content={options}
      >
        <Button className="remove-default-styles" id="user-btn">
          <Icon icon={UserIcon} size={25} />
        </Button>
      </Popover>
    </div>
  );
};

NavbarUserBtns.propTypes = {
  userKey: Proptypes.string.isRequired,
};

export default NavbarUserBtns;
