import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../utils/auth';

export default (args) => {
  const {render, ...rest} = args;
  const user = auth.getUser();
  return (
    <Route {...rest} render={
      (props) => {
        const isLoggedIn = auth.isLoggedIn();
        const role = user && user.role;
        const pathname = window.location.pathname;

        if (isLoggedIn) {
          if (role === 'user' && pathname.indexOf('/admin') !== -1) {
            return <Redirect to={'/panel'}/>
          }
          return render(props);
        }
        return <Redirect to='/login'/>;
      }
    }
    />
  );
};
