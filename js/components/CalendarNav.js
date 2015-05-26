import React from 'react';
import CalendarUtils from '../utils/CalendarUtils';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';

export default class CalendarNav extends React.Component{

	constructor(){
		super()

		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
	}

  render() {
    let weekDateSummary = CalendarUtils.getWeekSummaryFromDates(this.props.days);

    return (
      <div className="calendar-nav">
        <ul>
        	<li><a href="#" onClick={this.previous}>Previous</a></li>
        	<li><a href="#" onClick={this.next}>Next</a></li>
        </ul>
        <span className="calendar-nav-summary">{weekDateSummary}</span>
      </div>
    );
  }

  previous(){
    CalendarActionCreators.previousWeek();
  }

  next(){
    CalendarActionCreators.nextWeek();
  }

};
