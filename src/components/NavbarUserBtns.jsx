import React, { useContext } from 'react';
import {
  Popover, Pane, Button, UserIcon, Icon,
} from 'evergreen-ui/';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const NavbarUserBtns = () => {
  const { user } = useContext(FirebaseContext);

  const options = (
    <Pane
      paddingX={0}
    >
      <div className="user-login-options">
        <Button is={Link} id="profile-btn" to="/profiles">Profile</Button>
        {user
          ? (<Button is={Link} id="logout-btn" to="/logout">Log out</Button>)
          : (<Button is={Link} id="signin-btn" to="/signin">Sign In</Button>)}
      </div>
    </Pane>
  );

  return (
    <div>
      <Popover
        content={options}
      >
        <Button id="user-btn">
          <Icon icon={UserIcon} size={25} />
        </Button>
      </Popover>
    </div>
  );
};

export default NavbarUserBtns;
