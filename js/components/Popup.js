import React from 'react';
import Router from 'react-router';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';
import RouterContainer from '../utils/RouterContainer';

export default class Popup extends React.Component{

	constructor(props){
		super(props);

		this.onClickEditHanlder = this.onClickEditHanlder.bind(this);
		this.onClosetHanlder = this.onClosetHanlder.bind(this);
		this.onClickSaveHanlder = this.onClickSaveHanlder.bind(this);
	}

  render() {
  	const style = {
  		bottom: this.props.position.top,
  		left: this.props.position.left
  	}

    return (
      <div style={style} className={"popup "+ (this.props.isPopupShowing ? 'active' : '')}>
      	<div className="pop-content">
	      	<a className="pop-close" onClick={this.onClosetHanlder} ref="popClose" href="#">X</a>
	      	{this.renderForm()}
	        <div className="caret-down">
	        	<span className="caret-border"></span>
	        	<span className="caret-bg"></span>
	        </div>
        </div>
      </div>
    );
  }

  getDetails(){
  	let details = React.findDOMNode(this.refs.popupDetailsInput).value;
  	details = (details == '') ? 'No Details' : details;
  	return details;
  }

  onClickEditHanlder(e){
  	RouterContainer.get().transitionTo('event', {id: this.props.popupEvent.id})
  	CalendarActionCreators.editEventPopup();

  	e.preventDefault();
  }

  onClickSaveHanlder(e){
  	let details = this.getDetails();

  	CalendarActionCreators.saveEventPopup({
      id: this.props.popupEvent.id,
      details: details,
      router: RouterContainer.get()
  	})

  	e.preventDefault();
  }

  onClosetHanlder(e){
  	CalendarActionCreators.closePopup({
      payload: {
        id: this.props.popupEvent.id,
        remove: this.props.popupEvent.isSaved
      }
  	});   	

  	e.preventDefault();
  }

};
