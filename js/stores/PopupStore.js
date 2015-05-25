import AppDispatcher from '../dispatcher/AppDispatcher';
import EventStore from './EventStore';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
//import selectn from 'selectn';
import AppConstants from '../constants/AppConstants';

let _position = {
  top: 0,
  left: 0
};
let _isPopupShowing = false;
let _eventID = null;

function _resestPopup(){
  _isPopupShowing = false;
  _eventID = null;  
}

const PopupStore = createStore({

  isPopupShowing(){
    return _isPopupShowing;
  },

  getPosition(){
    return _position;
  },

  getEvent(){
    return EventStore.get(_eventID);
  }

});

AppDispatcher.register(action => {
  //Let the EventStore set the current event before rendering the popup @ current position
  switch(action.type) {
    case AppConstants.SHOW_EVENT_POPUP:
      AppDispatcher.waitFor([EventStore.dispatchToken]);
      _isPopupShowing = true;
      _position = action.payload.position;
      _eventID = action.payload.id;
      PopupStore.emitChange();
    break;

    case AppConstants.HIDE_EVENT_POPUP:
      //clean up unused saved data
      if(_eventID && !EventStore.get(_eventID).isSaved){
        EventStore.remove(_eventID);
      }
      _resestPopup();
      PopupStore.emitChange();
    break;   

    case AppConstants.SAVE_EVENT:
      _resestPopup()
      PopupStore.emitChange();
    break;   

    default:
      // do nothing
  }

});


export default PopupStore;
