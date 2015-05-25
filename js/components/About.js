import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CalendarUtils from '../utils/CalendarUtils';
import EventStore from '../stores/EventStore';
import connectToStores from '../utils/connectToStores';

export default class About extends React.Component{

  render() {
    return (
      <div className="event-wrap about">
      <p>About</p>
      <p>
        <Link to="event">Link to event</Link>
      </p>
      <p>
        <Link to="eventid" params={{id: 'e_1432519688931'}}>Link to with id</Link>
      </p>
      </div>
    );
  }

};