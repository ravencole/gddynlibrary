import React from 'react';
import { render } from 'react-dom';
import Routes from './Routes';

/* IMPORT SASS FOR WEBPACK TO COMPILE */
require('./styles/styles.scss');

render((
    <Routes />
    ), document.getElementById('app'));