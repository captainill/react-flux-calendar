import React from 'react';
import HourCell from './HourCell';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';
import EventStore from '../stores/EventStore';
import connectToStores from '../utils/connectToStores';
import CalendarUtils from '../utils/CalendarUtils';

function getState(props) {
  const serialDateNum = CalendarUtils.generateSerialForDate(props.date);
  const events = EventStore.getEventsForSerialDate(serialDateNum);

  return {
    events
  }
}

const stores = [EventStore];
@connectToStores(stores, getState)
export default class DayWeek extends React.Component{
	
	constructor(){
		super();

		this.addEvent = this.addEvent.bind(this);
	}

	renderHours(){
		let cells = [];
		for(let i = 0; i < 24; i++){
      let hourEvent;
      this.props.events.forEach((event) => {
        if(event.hour == i){
          hourEvent = event;
        }
      })
			cells.push(<HourCell hour={i} event={hourEvent} addEvent={this.addEvent} />);
		}
		return cells;
	}

  render() {
    const active = (CalendarUtils.isToday(this.props.date)) ? ' active' : '';
    return (
      <div className={"day week" + active}>
      	{this.renderHours()}
      </div>
    );
  }

  addEvent(e, hour, off, event){
  	//Can use LayerY to determine half hour or full hour
    const top = window.innerHeight - off - 54; //54 is a hack (can be replaced with function) for the parent offsets that need to be substracted
  	const left = e.pageX - e.layerX - 20; //20 is just a shift like Gc
    const mode = (event) ? 'edit' : 'create';

  	CalendarActionCreators.showEventPopup({
      payload: {
        position:{
          top: top,
          left: left
        },
        hour: hour,
        date: this.props.date,
        id: (event) ? event.id : 'e_' + Date.now(),
        mode: mode,
        event: event
      }
  	});
  }

};
