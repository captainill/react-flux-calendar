import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
import CalendarUtils from '../utils/CalendarUtils';
import * as TimerUtils from '../utils/TimerUtils';
//import selectn from 'selectn';
import AppConstants from '../constants/AppConstants';
import {filter} from 'lodash';

let _events = {};

function _addAllEvents(events){
  events.forEach(function(event) {
    _events[event.id] = event;
  });  
}

const EventStore = createStore({

  isPopupShowing(){
    return _isPopupShowing;
  },

  get(id) {
    return _events[id];
  },

  remove(id){
    _events[id] = null;
  },

  getCurrentEvent(){
    return _currentEvent;
  },

  getEventsForSerialDate(serialDate){
    return filter(_events, (event) => {
      return event.serialDate == serialDate;
    })
  }

});

EventStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.type) {
    case AppConstants.SHOW_EVENT_POPUP:
      const when = CalendarUtils.convertDateToWhen(action.payload.date) + ',' + TimerUtils.convertHourToTime(action.payload.hour);
      const id = action.payload.id;
      _events[id] = {
        id: id,
        when: when,
        date: action.payload.date,
        hour: action.payload.hour
      }
      EventStore.emitChange();
    break;

    case AppConstants.HIDE_EVENT_POPUP:
      if(action.payload.remove){
        EventStore.remove(action.payload.id);
      }    
      EventStore.emitChange()
    break;

    case AppConstants.SAVE_EVENT:
      _events[action.payload.id] = action.payload
      EventStore.emitChange()
    break;

    case AppConstants.RECIEVE_EVENTS:
      _addAllEvents(action.payload);
      EventStore.emitChange()
    break;    

    default:
      // do nothing
  }

});


export default EventStore;
