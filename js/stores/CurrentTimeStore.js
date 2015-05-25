import AppDispatcher from '../dispatcher/AppDispatcher';
import { createStore } from '../utils/StoreUtils';

let _now = new Date();
let _currentHour = _now.getHours();
let _currentMinute = _now.getMinutes()

let _intervalTime = 6000;
let _interval = -1;

const CurrentTimeStore = createStore({

  getHour(){
    return _currentHour;
  },

  getMinute(){
    return _currentMinute;
  },  
  
  //internal time checker to keep hour and date updated
  startTimer(){
    const now = new Date();

    if(_now.getHours != now.getHours()){
      _now = now; 
      _currentHour = _now.getHours();
      _currentMinute = _now.getMinutes();

      CurrentTimeStore.emitChange();
    }
  },

  killTimer(){
    removeInterval(_interval);
  }

});

_interval = setInterval(CurrentTimeStore.startTimer, _intervalTime);

export default CurrentTimeStore;
