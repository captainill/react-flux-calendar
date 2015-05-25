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

  componentDidMount(){
    React.findDOMNode(this.refs.detailsInput).focus();
  }

  render() {
    return (
      <div className="event-wrap">
        <div className="back-link"><Link to="calendar">«back</Link></div>
        <input ref="detailsInput" type="text" defaultValue={this.props.event.details}/>
        <p>When: {this.props.event.when}</p>
      </div>
    );
  }

};

Event.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
}