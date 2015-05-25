import '../scss/main.scss';

import React from 'react';
import Router from 'react-router';
import routes from './routes';
import * as APIUtils from './utils/APIUtils';

window.React = React; // export for http://fb.me/react-devtools

//load up the events from localstorage
APIUtils.getAllEvents();

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});