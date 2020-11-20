import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../../context/user';

export default function PrivateRoute({ component: Component, ...rest}) {
  const { userID } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        userID ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
