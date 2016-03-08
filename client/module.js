import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from 'routes';
import './assets/app.css';

React.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('content'))
