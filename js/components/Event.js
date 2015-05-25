import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import CalendarUtils from '../utils/CalendarUtils';
import EventStore from '../stores/EventStore';
import connectToStores from '../utils/connectToStores';


/**
 * Retrieves state from stores for current props.
 */
function getState(props) { // eslint-disable-line no-unused-vars
  const { params } = props;
  const eventID = params.id;
  const event = EventStore.get(eventID);
  
  return {
    event
  }
}

const stores = [EventStore];
@connectToStores(stores, getState)

export default class Event extends React.Component{
  render() {
    return (
      <div className="event-wrap">
        {this.props.event.id}
      </div>
    );
  }

};

Event.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
}