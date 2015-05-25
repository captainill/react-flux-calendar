import React from 'react';
import Popup from './Popup';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';

export default class PopupEdit extends Popup{

  constructor(props){
    super(props);

    this.onClickDeleteHanlder = this.onClickDeleteHanlder.bind(this);
  }

  renderForm(){
    const when = (this.props.popupEvent) ? this.props.popupEvent.when : '';
    return (
      <form>
        <div>
          <span clasName="pop-event-label">What: </span>
          <span clasName="pop-event-details">{this.props.popupEvent.details}</span>
        </div>      
        <div>
          <span clasName="pop-event-label">When: </span>
          <span clasName="pop-event-details">{ when }</span>
        </div>
        <div>
          <input type="submit" value="Edit Event" onClick={this.onClickEditHanlder} />
          <a href="#" className="pop-edit" onClick={this.onClickDeleteHanlder}>Delete event »</a>
        </div>
      </form>
    )
  } 

  onClickDeleteHanlder(e){
    CalendarActionCreators.deleteEventPopup({
      id: this.props.popupEvent.id
    });

    e.preventDefault();
  }
}