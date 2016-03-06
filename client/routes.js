import React from 'react';
import { Route } from 'react-router';

import Landing from 'components/Landing';
import Auth from 'components/Auth';
import AccountActivation from 'components/AccountActivation';

const routes = (
  <Route path='/' component={Landing}>
  	<Route path='auth' component={Auth}/>
  	<Route path='account_activation' component={AccountActivation}/>
  </Route>
);

export default routes;
