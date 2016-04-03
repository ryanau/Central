import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from 'routes';
import './assets/app.css';
import './assets/fixed-data-table.min.css'

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('content'))
