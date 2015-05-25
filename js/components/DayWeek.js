import React from 'react';
import HourCell from './HourCell';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';
import EventStore from '../stores/EventStore';
import CurrentTimeStore from '../stores/CurrentTimeStore';
import connectToStores from '../utils/connectToStores';
import CalendarUtils from '../utils/CalendarUtils';

function getState(props) {
  const serialDateNum = CalendarUtils.generateSerialForDate(props.date);
  const events = EventStore.getEventsForSerialDate(serialDateNum);
  const hour = CurrentTimeStore.getHour();
  const minutes= CurrentTimeStore.getMinute();  

  return {
    events,
    hour,
    minutes
  }
}

const stores = [EventStore, CurrentTimeStore];
@connectToStores(stores, getState)
export default class DayWeek extends React.Component{
	
	constructor(){
		super();
    
    this.state = {hourHeight: 0};
		this.addEvent = this.addEvent.bind(this);
	}

  componentDidMount(){
    this.setState({
      hourHeight: React.findDOMNode(this).clientHeight
    })
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
		return <div>{cells}</div>;
	}

  render() {
    const isToday = CalendarUtils.isToday(this.props.date);
    const active = (isToday) ? ' active' : '';

    let activeBarPosition = {};

    if(isToday){
      activeBarPosition = {
        top: CalendarUtils.getCurrentMinutePositionFromElementHeight(this.state.hourHeight, this.props.hour, this.props.minutes)
      }
    }

    return (
      <div className={"day week" + active}>
          {isToday ?
              <span className="active-time-bar" style={activeBarPosition}></span>
            : null
          }
      	{this.renderHours()}
      </div>
    );
  }

  addEvent(e, hour, off, event){
  	//Can use LayerY to determine half hour or full hour
    const top = window.innerHeight - off - 84; //84 is a hack (can be replaced with function) for the parent offsets that need to be substracted
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

