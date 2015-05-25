import React, { PropTypes } from 'react';
import { Router, Link } from 'react-router';
import CalendarUtils from '../utils/CalendarUtils';
import EventStore from '../stores/EventStore';
import connectToStores from '../utils/connectToStores';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';
import RouterContainer from '../utils/RouterContainer';

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

  constructor(props){
    super(props)

    this.onClickSaveHandler = this.onClickSaveHandler.bind(this);
  }

  componentDidMount(){
    React.findDOMNode(this.refs.detailsInput).select();
    React.findDOMNode(this.refs.detailsInput).focus();
  }

  render() {
    return (
      <div className="event-wrap">
        <form>
          <div className="back-link"><Link to="calendar">«back</Link></div>
          <input ref="detailsInput" type="text" defaultValue={this.props.event.details}/>
          <p>When: {this.props.event.when}</p>
          <div>
            <input type="submit" value="Save Event" onClick={this.onClickSaveHandler} />
          </div>          
        </form>
      </div>
    );
  }

  getDetails(){
    let details = React.findDOMNode(this.refs.detailsInput).value;
    details = (details == '') ? 'No Details' : details;
    return details;
  }  

  onClickSaveHandler(e){

    let event = this.props.event;
    event.details = this.getDetails();

    CalendarActionCreators.saveEvent({
      event: event,
      router: RouterContainer.get()
    })

    e.preventDefault();
  }  

};

/*Event.contextTypes = {
  router: React.PropTypes.func.isRequired
};*/