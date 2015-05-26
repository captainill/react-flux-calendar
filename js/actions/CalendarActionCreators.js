import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import CalendarStore from '../stores/CalendarStore';
import EventStore from '../stores/EventStore';
import PopupStore from '../stores/PopupStore';
import * as APIUtils from '../utils/APIUtils';
import CalendarUtils from '../utils/CalendarUtils';


/*
	Calendar Page Actions
*/

export function showEventPopup(payload) {
  AppDispatcher.dispatch(AppConstants.SHOW_EVENT_POPUP, payload);
}

export function editEventPopup(){
	AppDispatcher.dispatch(AppConstants.HIDE_EVENT_POPUP);
}

export function addAllEvents(events){
	AppDispatcher.dispatch(AppConstants.RECIEVE_EVENTS, events);
}

export function hideEventPopup(events){
	AppDispatcher.dispatch(AppConstants.HIDE_EVENT_POPUP);
}

export function previousWeek(){
	AppDispatcher.dispatch(AppConstants.PREVIOUS_WEEK);
}

export function nextWeek(){
	AppDispatcher.dispatch(AppConstants.NEXT_WEEK);
}

/*
	Event Page Actions
*/
export function saveEvent(payload){
	//save locally
	AppDispatcher.dispatch(AppConstants.SAVE_EVENT, {
		payload: payload.event
	});

	//persist to 'DB'
	APIUtils.updateEvent(payload.event).then(() => {
		return payload.router.transitionTo('calendar');
	});
}

/*
	Popup Actions
*/
export function saveEventPopup(payload){
	let event = PopupStore.getEvent();
	event.isSaved = true;
	event.details = payload.details;
	event.serialDate = CalendarUtils.generateSerialForDate(event.date);

	//save locally
	AppDispatcher.dispatch(AppConstants.SAVE_EVENT, {
		payload: event
	});

	//persist to 'DB'
	APIUtils.createEvent(event).then(() => {
		return payload.router.transitionTo('event', {id: payload.id});
	});
}

export function deleteEventPopup(payload){
	//save locally
	AppDispatcher.dispatch(AppConstants.DELETE_EVENT, {
		payload: payload.id
	});

	APIUtils.deleteEvent(payload.id).then(() => {
		return true;
	});	
}

export function closePopup(payload){
	AppDispatcher.dispatch(AppConstants.HIDE_EVENT_POPUP, payload);
}