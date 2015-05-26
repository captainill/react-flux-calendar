const _daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
const _monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const _daysName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const _daysInWeek = 7;
//const _weeksInCalendar = 6;

const CalendarUtils = {

  isToday(date){
    return date.toDateString() == new Date().toDateString();
  },

  //Getter for day string names
  getDayNames(){
    return _daysName;
  },

  /*
    Params Number: Month, Number: Year
    Returns Number: days in the month in a given year (January = 0) zero-indexed  
  */
  getDaysInMonth(monthProp, yearProp){
  	//if no params passed return current    
    let month = monthProp;
    let year = yearProp;

  	if(!month && !year){
  		const now = new Date();
  		month = now.getMonth();
  		year = now.getFullYear();
  	}

    if ((month == 1)&&(year %4 == 0) && (( year % 100 != 0) || (year % 400 == 0))){
      return 29;
    }else{
      return _daysInMonth[month];
    }
  },

  /*
    Params Month: Number, Year: Number
    Returns Number:
    The index of the first day of the week that falls in the given month
    ex. 5 when given May/2015 because May 1 is a Friday 
  */
  getFirstDay(month, year){
    const firstDayDate = new Date(year, month, 1);
    return firstDayDate.getDay();
  },

  /*
    Params Date: 
    Return Array: the week of days
    Get week starting with an arbitrary date.
  */
  getWeekForCurrentDate(date){
    var start = getWeekStartForDay(date);
    return getWeekForDate(start);
  },

  /*
    Params Date
    Return Date: The start of a week from an arbtrary day
  */
  getWeekStartForDay(date){
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();
    const dayOffCurrentWeekStart = date.getDate() - dayOfWeek;
    //get the date for the start of the week by subtract which day of the week (getDay()) it is from the Date passed in
    const startDate = new Date(new Date().setDate(dayOffCurrentWeekStart));
    
    return startDate;
  },

  /*
    Params Date: first day of a week
    Returns Array: The week of Date Objs
  */
  getWeekForDate(dateProp){
    let date = dateProp;
    let array = [];

    if(!date){
      date = new Date();
    }

    for (let i = 0; i < _daysInWeek; i++) {
      const day = new Date(date)
      day.setDate(date.getDate()+i);
      array.push(day);
    }

    return array;
  },

  /*
    Params Array: representing a week of inidividual dates.
    Return String: a summary  ex: May 24 – 30, 2015
  */
  getWeekSummaryFromDates(dates){
    const first = dates[0];
    const last = dates[dates.length-1];

    if(first.getMonth() == last.getMonth()){
      return _monthNames[first.getMonth()].slice(0, 3) + ' ' + first.getDate() + ' – ' + last.getDate() + ', ' + last.getFullYear();
    } else{
      return _monthNames[first.getMonth()].slice(0, 3) + ' ' + first.getDate() + ' – ' + _monthNames[last.getMonth()].slice(0, 3) + ' ' + last.getDate() + ', ' + last.getFullYear();
    }
  },

  /*
    Params Date: Makes date pretty for popup
    Returns String: ex. Wed, May 27, 6am - 7am
  */
  convertDateToWhen(dateProp){
    const day = _daysName[dateProp.getDay()].slice(0,3);
    const month = _monthNames[dateProp.getMonth()];
    const date = dateProp.getDate();

    return day + ', ' + month + ' ' + date;
  },

  /*
    Params Date: Easy way to map an event to a day to make filtering easier later.
    Returns String
    Could just use new Date.toDateString() and String.replace spaces
  */
  generateSerialForDate(date){
    return date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
  },

  /*
    Params Number: height of HTML el, Number: hour, Number minute 
    Returns Number: The time position, to the minute, relative to Height
  */
  getCurrentMinutePositionFromElementHeight(height, hour, minutes){
    const hourHeight = height;
    const cellHeight = hourHeight /  (24 * 60);
    const totalMinutes = (hour * 60) + minutes;  
    return totalMinutes * cellHeight
  }

};

export default CalendarUtils;