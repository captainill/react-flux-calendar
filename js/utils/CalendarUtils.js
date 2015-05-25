const _daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
const _monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const _daysName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const _daysInWeek = 7;
//const _weeksInCalendar = 6;

const CalendarUtils = {

  isToday(date){
    return date.toDateString() == new Date().toDateString();
  },

  //getter for day string names
  getDayNames(){
    return _daysName;
  },

  // Returns the number of days in the month in a given year (January = 0) zero-indexed  
  getDaysInMonth(monthProp, yearProp){
  	//if now params passed return current    
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

  //returns the index of the first day of the week that falls in the given month
  //ex returns 5 when given May/2015 because May 1 is a Friday
  getFirstDay(month, year){
    const firstDayDate = new Date(year, month, 1);
    return firstDayDate.getDay();
  },

  //returns the first day of the week for a given day
  getWeekStartForDay(date){
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.getDay();
    const dayOffCurrentWeekStart = date.getDate() - dayOfWeek;
    //get the date for the start of the week by subtract which day of the week (getDay()) it is from the Date passed in
    const startDate = new Date(new Date().setDate(dayOffCurrentWeekStart));
    
    return startDate;
  },

  getWeekForDate(dateProp){
    let date = dateProp;
    let array = [];
    //test first day of month
    /*date = new Date(2015, 4, 1);
    console.log('test day=', date.toString());
    console.log('--------');*/

    if(!date){
      date = new Date();
    }

    const start = this.getWeekStartForDay(date);

    for (let i = 0; i < _daysInWeek; i++) {
      const day = new Date(start)
      day.setDate(start.getDate()+i);
      array.push(day);
    }

    return array;
  },

  convertDateToWhen(dateProp){
    const day = _daysName[dateProp.getDay()].slice(0,3);
    const month = _monthNames[dateProp.getMonth()];
    const date = dateProp.getDate();

    return day + ', ' + month + ' ' + date;
  },

  generateSerialForDate(date){
    return date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
  }
  
  //const firstDay = this.getFirstDay(_date.getMonth(), _date.getFullYear());
  //const weekIndex = dayOfMonth % _daysInWeek

};

export default CalendarUtils;