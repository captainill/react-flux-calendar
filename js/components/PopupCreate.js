import React from 'react';
import Popup from './Popup';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';
import RouterContainer from '../utils/RouterContainer';

export default class PopupCreate extends Popup{

	constructor(props){
		super(props);
	}

  componentDidMount(){
    React.findDOMNode(this.refs.popSave).addEventListener('click', this.onClickSaveHandler.bind(this));
  } 

  componentWillUnmount(){
    React.findDOMNode(this.refs.popSave).removeEventListener('click', this.onClickSaveHandler.bind(this));
  }   

  renderForm(){
    const when = (this.props.popupEvent) ? this.props.popupEvent.when : '';
    return (
      <form>
        <div>
          <span clasName="pop-event-label">When: </span>
          <span clasName="pop-event-details">{ when }</span>
        </div>
        <div>
          <span clasName="pop-event-label">What: </span>
          <span clasName="pop-event-details"><input ref="popupDetailsInput" type="text" /></span>
        </div>
        <div>
          <input type="submit" value="Create Event" ref="popSave" />
        </div>
      </form>
    )
  }  

  getDetails(){
    let details = React.findDOMNode(this.refs.popupDetailsInput).value;
    details = (details == '') ? 'No Details' : details;
    return details;
  }

  onClickSaveHandler(e){
    let details = this.getDetails();

    CalendarActionCreators.saveEventPopup({
      id: this.props.popupEvent.id,
      details: details,
      router: RouterContainer.get()
    })

    e.preventDefault();
  }  

};