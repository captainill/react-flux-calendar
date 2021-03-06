import * as CalendarActionCreators from '../actions/CalendarActionCreators';

export function getAllEvents(){
	var events = JSON.parse(localStorage.getItem('events'));
	if(!events)
		return
	//simulated
  CalendarActionCreators.addAllEvents({payload:events});

}

export function updateEvent(payload){
  return new Promise(function(resolve, reject){

		var events = JSON.parse(localStorage.getItem('events')) || [];
		events.forEach((event) => {
			if(event.id == payload.id){
				event = payload.event;
			}
		})
	  localStorage.setItem('events',  JSON.stringify(events))
      
    resolve();
  })
}

export function createEvent(payload){
  return new Promise(function(resolve, reject){

		var events = JSON.parse(localStorage.getItem('events')) || [];
		events.push(payload);
	  localStorage.setItem('events',  JSON.stringify(events))
      
    resolve();
  })
}

export function deleteEvent(id){
  return new Promise(function(resolve, reject){

		let events = JSON.parse(localStorage.getItem('events')) || [];
		events = events.filter((event) => {
			return event.id != id;
		})
	  localStorage.setItem('events',  JSON.stringify(events))
      
    resolve();
  })
}

