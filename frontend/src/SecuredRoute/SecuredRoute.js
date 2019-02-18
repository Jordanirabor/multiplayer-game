import React from 'react';
import { Route } from 'react-router-dom';
import auth0Client from '../Auth';

function SecuredRoute(props) {
  const { component: Component, path, checkingSession } = props;
  return (
    <Route
      path={path}
      render={() => {
        if (checkingSession)
          return <p style={{ padding: '50vh' }}>Validating session...</p>;
        if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div style={{ padding: 0 }} />;
        }
        return <Component />;
      }}
    />
  );
}

export default SecuredRoute;
