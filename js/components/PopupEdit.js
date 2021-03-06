import React from 'react';
import Popup from './Popup';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';
import RouterContainer from '../utils/RouterContainer';

export default class PopupEdit extends Popup{

  //ran into this:
  //https://github.com/facebook/react/issues/3790
  //had to wrap ref="popEdit" in a <span>
  constructor(props){
    super(props);
  }

  componentDidMount(){
    super.componentDidMount();
    React.findDOMNode(this.refs.popDelete).addEventListener('click', this.onClickDeleteHandler.bind(this));
    React.findDOMNode(this.refs.popEdit).addEventListener('click', this.onClickEditHandler.bind(this));
  } 

  componentWillUnmount(){
    super.componentWillUnmount();
    React.findDOMNode(this.refs.popDelete).removeEventListener('click', this.onClickDeleteHandler.bind(this));  
    React.findDOMNode(this.refs.popEdit).addEventListener('click', this.onClickEditHandler.bind(this));  
  }   

  renderForm(){
    const when = (this.props.popupEvent) ? this.props.popupEvent.when : '';
    return (
      <form>
        <div key={'what'+this.props.popupEvent.id}>
          <span clasName="pop-event-label">What: </span>
          <span clasName="pop-event-details">{this.props.popupEvent.details}</span>
        </div>      
        <div key={'when'+this.props.popupEvent.id}>
          <span clasName="pop-event-label">When: </span>
          <span clasName="pop-event-details">{ when }</span>
        </div>
        <div>
          <span>
            <input type="submit" value="Edit Event" ref="popEdit" />
          </span>
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