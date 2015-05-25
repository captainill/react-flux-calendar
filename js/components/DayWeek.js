import React from 'react';
import HourCell from './HourCell';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';

export default class DayWeek extends React.Component{
	
	constructor(){
		super();

		this.addEvent = this.addEvent.bind(this);
	}

	renderHours(){
		let cells = [];
		for(let i = 0; i < 24; i++){
			cells.push(<HourCell hour={i} addEvent={this.addEvent} />);
		}
		return cells;
	}

  render() {
    return (
      <div className="day week">
      	{this.renderHours()}
      </div>
    );
  }

  addEvent(event, hour, off){
  	//Can use LayerY to determine half hour or full hour
    const top = window.innerHeight - off - 54; //54 is a hack (can be replaced with function) for the parent offsets that need to be substracted
  	const left = event.pageX - event.layerX - 20; //20 is just a shift like Gc

  	CalendarActionCreators.showEventPopup({
      payload: {
        position:{
          top: top,
          left: left
        },
        hour: hour,
        date: this.props.date,
        id: 'e_' + Date.now()
      }
  	});
  }

};
