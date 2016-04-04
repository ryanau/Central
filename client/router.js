import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { Router, browserHistory } from 'react-router';

// System
import Root from 'components/Root';
import NoMatch from 'components/NoMatch';

// Session
import Auth from 'components/session/Auth';
import AdminAuth from 'components/session/AdminAuth';
import AccountActivation from 'components/session/AccountActivation';
import AuthComplete from 'components/session/AuthComplete';
import UserSignOut from 'components/session/UserSignOut';
import AdminSignOut from 'components/session/AdminSignOut';

// Admin
import AdminEventsContainer from 'components/admin/events/EventsContainer';
import AdminEvent from 'components/admin/events/Event';
import AdminReport from 'components/admin/reports/Report';

// User
import UserDashboard from 'components/user/UserDashboard';
import UserEventsContainer from 'components/user/events/UserEventsContainer';
import UserEvent from 'components/user/events/UserEvent';
import UserReport from 'components/user/reports/UserReport';
import UserTask from 'components/user/tasks/UserTask';


const router = (
  <Router history={browserHistory}>
  <Route path='/' component={Root}>
  	<Route path='auth' component={Auth}/>
  	<Route path='admin_auth' component={AdminAuth}/>
    <Route path='account_activation' component={AccountActivation}/>
    <Route path='auth_complete' component={AuthComplete}/>
  	<Route path='auth_complete' component={AuthComplete}/>
  	<Route path='admin'>
      <Route path='sign_out' component={AdminSignOut}/>
	  	<Route path='events' component={AdminEventsContainer}/>
			<Route path='events/:eventId' component={AdminEvent}/>
			<Route path='events/:eventId/reports/:reportId' component={AdminReport}/>
  	</Route>
    <Route path='user'>
      <Route path='sign_out' component={UserSignOut}/>
      <Route path='events' component={UserEventsContainer}/>
      <Route path='events/:eventId' component={UserEvent}/>
      <Route path='events/:eventId/reports/:reportId' component={UserReport}/>
      <Route path='events/:eventId/tasks/:taskId' component={UserTask}/>
    </Route>
    <Route path='dashboard' component={UserDashboard}/>
    <Route path="*" component={NoMatch}/>
  </Route>
  </Router>
);

export default router;
