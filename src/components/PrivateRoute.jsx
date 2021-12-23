/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
  Navigate,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../Firebase';

const PrivateRoute = ({
  children,
}) => {
  const { user, loaded } = useContext(FirebaseContext);

  if (!user && loaded === true) return <Navigate to="/signin" />;

  if (user) return children;

  return <p style={{ margin: '30px', textAlign: 'center' }}>Loading...</p>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
