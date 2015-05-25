import AppDispatcher from '../dispatcher/AppDispatcher';
import EventStore from './EventStore';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
import CalendarUtils from '../utils/CalendarUtils';
import * as TimerUtils from '../utils/TimerUtils';
//import selectn from 'selectn';
import AppConstants from '../constants/AppConstants';

let _position;
let _isPopupShowing;
let _event;

function _resestPopup(){
  _position = { top: 0, left: 0};  
  _isPopupShowing = false;
  _event = { mode: 'create' };
}
_resestPopup();

const PopupStore = createStore({

  isPopupShowing(){
    return _isPopupShowing;
  },

  getPosition(){
    return _position;
  },

  getEvent(){
    return _event;
  }

});

AppDispatcher.register(action => {
  //Let the EventStore set the current event before rendering the popup @ current position
  switch(action.type) {
    case AppConstants.SHOW_EVENT_POPUP:
      const when = CalendarUtils.convertDateToWhen(action.payload.date) + ',' + TimerUtils.convertHourToTime(action.payload.hour);
      const id = action.payload.id;
      _event = {
        id: id,
        when: when,
        date: action.payload.date,
        hour: action.payload.hour,
        mode: action.payload.mode,
        event: action.payload.event
      }
      _isPopupShowing = true;
      _position = action.payload.position;
      PopupStore.emitChange();
    break;
    
    case AppConstants.DELETE_EVENT:
    case AppConstants.SAVE_EVENT:
    case AppConstants.HIDE_EVENT_POPUP:
      _resestPopup();
      PopupStore.emitChange();
    break;

    default:
      // do nothing
  }

});


export default PopupStore;
