import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from 'routes';

React.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('content'))
