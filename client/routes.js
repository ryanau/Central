import React from 'react';
import { Route } from 'react-router';

import Landing from 'components/Landing';
import Auth from 'components/session/Auth';
import AdminAuth from 'components/session/AdminAuth';
import AccountActivation from 'components/session/AccountActivation';
import EventsContainer from 'components/admin/events/EventsContainer';

const routes = (
  <Route path='/' component={Landing}>
  	<Route path='auth' component={Auth}/>
  	<Route path='admin_auth' component={AdminAuth}/>
  	<Route path='account_activation' component={AccountActivation}/>
  	<Route path='events' component={EventsContainer}/>
  </Route>
);

export default routes;
