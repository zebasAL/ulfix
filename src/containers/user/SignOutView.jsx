import React, { useEffect } from 'react';
import { Spinner, toaster } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import { Users } from '../../Firebase';

const SignOutView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      Users.logOutUser()
        .then(() => {
          navigate('./signin');
          toaster.success('You have logout successfully');
        })
        .catch(() => {
          toaster.warning('Something went wrong');
        });
    };
    handleLogout();
  }, []);

  return (
    <div>
      <Spinner marginX="auto" marginTop="50px" />
    </div>
  );
};

export default SignOutView;
