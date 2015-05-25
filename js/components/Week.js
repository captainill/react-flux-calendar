import React from 'react';
import DayWeek from './DayWeek';
import DayMonth from './DayMonth';
import Hours from './Hours';
import WeekHeader from './WeekHeader';

export default class Week extends React.Component{

	renderWeek(){
		let Day = (this.props.view.type == 'week') ? DayWeek : DayMonth;
		return (
			this.props.view.days.map((day, i) => {
				return (
					<div className="col" key={i}>
						<Day date={day} view={this.props.view.type} />
					</div>
				);
			})
		);
	}

  render() {

    return (
    	<div className="calendar-body week">
    		<WeekHeader days={this.props.view.days} />
	      <div className="week-columns">
	      	<Hours />
	      	{ this.renderWeek() }
	      </div>
      </div>
    );
  }

};
