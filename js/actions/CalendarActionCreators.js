import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import CalendarStore from '../stores/CalendarStore';
import EventStore from '../stores/EventStore';
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
	let event = EventStore.get(payload.id);
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

export function closePopup(payload){
	AppDispatcher.dispatch(AppConstants.HIDE_EVENT_POPUP, payload);
}