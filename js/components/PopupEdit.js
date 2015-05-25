import React from 'react';
import Popup from './Popup';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';
import RouterContainer from '../utils/RouterContainer';

export default class PopupEdit extends Popup{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    React.findDOMNode(this.refs.popDelete).addEventListener('click', this.onClickDeleteHandler.bind(this));
    React.findDOMNode(this.refs.popEdit).addEventListener('click', this.onClickEditHandler.bind(this));
  } 

  componentWillUnmount(){
    React.findDOMNode(this.refs.popDelete).removeEventListener('click', this.onClickDeleteHandler.bind(this));  
    React.findDOMNode(this.refs.popEdit).addEventListener('click', this.onClickEditHandler.bind(this));  
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
          <input type="submit" value="Edit Event" ref="popEdit" />
          <a href="#" className="pop-edit" ref="popDelete">Delete event »</a>
        </div>
      </form>
    )
  } 

  onClickEditHandler(e){
    CalendarActionCreators.editEventPopup();
    RouterContainer.get().transitionTo('event', {id: this.props.popupEvent.id})

    e.preventDefault();
  }

  onClickDeleteHandler(e){
    CalendarActionCreators.deleteEventPopup({
      id: this.props.popupEvent.id
    });

    e.preventDefault();
  }
}