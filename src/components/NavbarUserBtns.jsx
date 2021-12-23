import React from 'react';
import {
  Popover, Pane, Button, UserIcon, Icon,
} from 'evergreen-ui/';
import { Link } from 'react-router-dom';

const NavbarUserBtns = () => {
  const options = (
    <Pane
      paddingX={0}
    >
      <div className="user-login-options">
        <Button is={Link} id="profile-btn" to="/profile">Profile</Button>
        <Button is={Link} id="logout-btn" to="/logout">Log out</Button>
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
