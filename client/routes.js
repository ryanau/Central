import React from 'react';
import { Route } from 'react-router';

// System
import Landing from 'components/Landing';
import NoMatch from 'components/NoMatch';
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
import UserTask from 'components/user/tasks/UserTask';



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
      <Route path='events/:eventId/tasks/:taskId' component={UserTask}/>
    </Route>
    <Route path="*" component={NoMatch}/>
  </Route>
);

export default routes;
