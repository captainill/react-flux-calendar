var React = require('react');
var { Route, DefaultRoute, Redirect } = require('react-router');
var App = require('./components/App');
var Calendar = require('./components/Calendar');
var Week = require('./components/Week');
var Month = require('./components/Month');
var Event = require('./components/Event');

module.exports = (
  <Route name="app" path="/" handler={App}>
  	<Route name="calendar" path="calendar" handler={Calendar}>
  		<Route name="month" path="calendar/month" handler={Month}/>
  		<DefaultRoute name="week" handler={Week}/>
  	</Route>
    <Route name="event" path="event/:id" handler={Event}/>
    <Redirect from="/" to="calendar"/>
  </Route>
);