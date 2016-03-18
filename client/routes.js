import React from 'react';
import { Route } from 'react-router';

import Landing from 'components/landing';
import Auth from 'components/session/Auth';
import AdminAuth from 'components/session/AdminAuth';
import AccountActivation from 'components/session/AccountActivation';

// Admin
import AdminEventsContainer from 'components/admin/events/EventsContainer';
import AdminEvent from 'components/admin/events/Event';
import AdminReport from 'components/admin/reports/Report';

// User
import UserEventsContainer from 'components/user/events/UserEventsContainer';
import UserEvent from 'components/user/events/UserEvent';
import UserReport from 'components/user/reports/UserReport';



const routes = (
  <Route path='/' component={Landing}>
  	<Route path='auth' component={Auth}/>
  	<Route path='admin_auth' component={AdminAuth}/>
  	<Route path='account_activation' component={AccountActivation}/>
  	<Route path='admin'>
	  	<Route path='events' component={AdminEventsContainer}/>
			<Route path='events/:eventId' component={AdminEvent}/>
			<Route path='events/:eventId/reports/:reportId' component={AdminReport}/>
  	</Route>
    <Route path='user'>
      <Route path='events' component={UserEventsContainer}/>
      <Route path='events/:eventId' component={UserEvent}/>
      <Route path='events/:eventId/reports/:reportId' component={UserReport}/>
    </Route>
  </Route>
);

export default routes;
