import React, { useState, useEffect } from 'react';
import { Spinner, Alert, toaster } from 'evergreen-ui';
import { Users } from '../Firebase';

const SignOutView = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLogout = () => {
      setIsLoading(true);

      Users.logOutUser()
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          toaster.warning('Something went wrong');
        });
    };
    handleLogout();
  }, []);

  if (isLoading) return <Spinner marginX="auto" marginTop="50px" />;

  return (
    <div>
      <Alert
        intent="success"
        title="Logged out successfully"
        marginBottom={32}
        marginTop={30}
      />
    </div>
  );
};

export default SignOutView;
