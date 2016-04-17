import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import MasterStore from 'stores/masterStore';

// System
import Root from 'components/Root';
import NoMatch from 'components/NoMatch';
import Index from 'components/Index';

// Welcome
import Welcome from 'components/welcome/Welcome';

// Account
import UserSignIn from 'components/account/user/UserSignIn';
import UserSignUp from 'components/account/user/UserSignUp';
import AdminAuth from 'components/account/AdminAuth';
import AccountActivation from 'components/account/AccountActivation';
import AuthComplete from 'components/account/AuthComplete';
import UserSignOut from 'components/account/UserSignOut';
import AdminSignOut from 'components/account/AdminSignOut';

// Admin
import AdminDashboard from 'components/admin/AdminDashboard';
import AdminEventsContainer from 'components/admin/events/EventsContainer';
import AdminEvent from 'components/admin/events/Event';
import AdminReport from 'components/admin/reports/Report';

// User
import UserDashboard from 'components/user/dashboard/UserDashboard';
import UserEventsContainer from 'components/user/events/UserEventsContainer';
import UserEvent from 'components/user/events/UserEvent';
import UserReport from 'components/user/reports/UserReport';
import UserTask from 'components/user/tasks/UserTask';
import UserAccount from 'components/user/account/UserAccount';

const router = (
  <Router history={browserHistory}>
    <Route path='/' component={Root}>
      <IndexRoute component={Index}/>
      <Route path='welcome' component={Welcome}/>
    	<Route path='admin_auth' component={AdminAuth}/>
      <Route path='account_activation' component={AccountActivation}/>
      <Route path='auth_complete' component={AuthComplete}/>
    	<Route path='admin'>
        <Route path='dashboard' component={AdminDashboard}/>
        <Route path='sign_out' component={AdminSignOut}/>
        <Route path='events' component={AdminEventsContainer}/>
        <Route path='events/:eventId' component={AdminEvent}/>
        <Route path='events/:eventId/reports/:reportId' component={AdminReport}/>
      </Route>
      <Route path='user'>
        <Route path='dashboard' component={UserDashboard}/>
        <Route path='events' component={UserEventsContainer}/>
        <Route path='events/:eventId' component={UserEvent}/>
        <Route path='events/:eventId/reports/:reportId' component={UserReport}/>
        <Route path='events/:eventId/tasks/:taskId' component={UserTask}/>
        <Route path='account' component={UserAccount}/>
        <Route path='sign_in' component={UserSignIn}/>
        <Route path='sign_up' component={UserSignUp}/>
        <Route path='sign_out' component={UserSignOut}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
);

export default router;
