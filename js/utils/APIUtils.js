import * as CalendarActionCreators from '../actions/CalendarActionCreators';

export function getAllEvents(){
	var events = JSON.parse(localStorage.getItem('events'));
	if(!events)
		return
	//simulated
  CalendarActionCreators.addAllEvents({payload:events});

}

export function createEvent(payload){
  return new Promise(function(resolve, reject){

		var events = JSON.parse(localStorage.getItem('events')) || [];
		events.push(payload);
	  localStorage.setItem('events',  JSON.stringify(events))
      
    resolve();
  })
}