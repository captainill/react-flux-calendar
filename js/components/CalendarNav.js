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
    return (
      <div className="calendar-nav">
        <ul>
        	<li><a href="#" onClick={this.previous}>Previous</a></li>
        	<li><a href="#" onClick={this.next}>Next</a></li>
        </ul>
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
