import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import CalendarStore from '../stores/CalendarStore';
import EventStore from '../stores/EventStore';
import PopupStore from '../stores/PopupStore';
import * as APIUtils from '../utils/APIUtils';
import CalendarUtils from '../utils/CalendarUtils';


export function startCalendar() {
  AppDispatcher.dispatch(AppConstants.START_DATE_TICK);
}

export function showEventPopup(payload) {
  AppDispatcher.dispatch(AppConstants.SHOW_EVENT_POPUP, payload);
}

export function editEventPopup(payload){
	console.log('editEvent', payload);
	AppDispatcher.dispatch(AppConstants.SAVE_EVENT, payload);
}

export function addAllEvents(events){
	AppDispatcher.dispatch(AppConstants.RECIEVE_EVENTS, events);
}

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