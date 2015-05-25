import AppDispatcher from '../dispatcher/AppDispatcher';
import CalendarUtils from '../utils/CalendarUtils';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
//import selectn from 'selectn';
import AppConstants from '../constants/AppConstants';

let _now = new Date();
let _currentWeekStart = CalendarUtils.getWeekStartForDay(_now);
let _currentDate = _now.getDate();
let _currentHour = _now.getHours();
let _view = 'week';
let _isPopupShowing = false;

let _tickInterval = -1;
let _intervalTime = 6000;

const CalendarStore = createStore({

  isPopupShowing(){
    return _isPopupShowing;
  },

  getView() {
    return {
      type: _view,
      days: (_view == 'week') ? CalendarStore.getWeekForDate(_currentWeekStart) : null
    }
  },

  getDaysInMonth(month, year){
    return CalendarUtils.getDaysInMonth(month, year);
  },

  getWeekForDate(date){
    return CalendarUtils.getWeekForDate(date);
  },

  getFirstDay(month, year){
    return CalendarUtils.getFirstDay(month, year);
  },

  //params: Date instance
  isCurrentCalendarDate(dateToCheck){
    _today.toDateString() === dateToCheck.toDateString()
  },

  //internal time checker to keep hour and date updated
  dateTick(){
    const now = new Date();

    if(_now.getHours != now.getHours()){
      _now = now; 
      _currentDate = _now.getDate();
      _currentHour = _now.getHours();

      CalendarStore.emitChange();
    }
  }

});

CalendarStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.type) {

    case AppConstants.PREVIOUS_WEEK:
        _currentWeekStart = new Date(_currentWeekStart.setDate(_currentWeekStart.getDate()-7));
        CalendarStore.emitChange();
    break;

    case AppConstants.NEXT_WEEK:
        _currentWeekStart = new Date(_currentWeekStart.setDate(_currentWeekStart.getDate()+7));
        CalendarStore.emitChange();
    break;    

    case AppConstants.START_DATE_TICK:
      _tickInterval = setInterval(CalendarStore.dateTick, _intervalTime);
    break;

    case AppConstants.STOP_DATE_TICK:
      removeInterval(_tickInterval);
    break; 

    default:
      // do nothing
  }

});


export default CalendarStore;
