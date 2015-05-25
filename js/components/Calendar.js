import React from 'react';
import { RouteHandler, Link } from 'react-router';
import CalendarUtils from '../utils/CalendarUtils';
import CalendarStore from '../stores/CalendarStore';
import connectToStores from '../utils/connectToStores';
import AppDispatcher from '../dispatcher/AppDispatcher';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';

/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
  const view = CalendarStore.getView();

  return {
    view
  }
}

const stores = [CalendarStore];
@connectToStores(stores, getState)

export default class Calendar extends React.Component{
	
	componentWillMount(){
		CalendarActionCreators.startCalendar();
	}

  render() {
    return (
      <div className="calendar">
      	<RouteHandler 
      		view={this.props.view} />
      </div>
    );
  }

};
