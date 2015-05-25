import React from 'react';
import CalendarUtils from '../utils/CalendarUtils';

export default class WeekHeader extends React.Component{

	renderHeader(){
		const dayNames = CalendarUtils.getDayNames();

		return (
			this.props.days.map(function(day, i){
				const dayShort = dayNames[i].slice(0,3);
				return (
					<div className="col-header" key={i}>
						<div className="col-head-label">{dayShort + ' ' +(day.getMonth() +1) + '/' + day.getDate()}</div>
						<div className="col-header-eventspace"></div>
					</div>
				);
			})
		);
	}

  render() {
    return (
      <div className="header-columns">
      	{ this.renderHeader() }
      </div>
    );
  }

};
