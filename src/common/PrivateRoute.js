import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <Route
    {...rest}
    render={props =>
      isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
  )
};

export default PrivateRoute;
