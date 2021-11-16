import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const [user] = useAuthState(auth);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (!user) {
          return <Redirect to={'/profile'} />;
        } else {
          return <RouteComponent {...routeProps} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
