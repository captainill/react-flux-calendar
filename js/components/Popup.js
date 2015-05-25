import React from 'react';
import Router from 'react-router';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';

export default class Popup extends React.Component{

	constructor(){
		super();

		this.onClickEditHanlder = this.onClickEditHanlder.bind(this);
		this.onClosetHanlder = this.onClosetHanlder.bind(this);
		this.onClickSaveHanlder = this.onClickSaveHanlder.bind(this);
	}
	/*shouldComponentUpdate(nextProps){
  	return nextProps.position !== null;
	}*/

  render() {
  	const style = {
  		bottom: this.props.position.top,
  		left: this.props.position.left
  	}
  	const when = (this.props.popupEvent) ? this.props.popupEvent.when : '';

    return (
      <div style={style} className={"popup "+ (this.props.isPopupShowing ? 'active' : '')}>
      	<div className="pop-content">
	      	<a className="pop-close" onClick={this.onClosetHanlder} ref="popClose" href="#">X</a>
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
	        		<input type="submit" value="Create Event" onClick={this.onClickSaveHanlder} />
	        		<a href="#" className="pop-edit" onClick={this.onClickEditHanlder}>Edit event »</a>
	        	</div>
	        </form>
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
  	let details = this.getDetails();

  	CalendarActionCreators.editEventPopup({
    	id: this.props.popupEvent.id,
      details: details,
      isSaved: false
  	});

  	e.preventDefault();
  }

  onClickSaveHanlder(e){
  	const { router } = this.context;

  	let details = this.getDetails();

  	CalendarActionCreators.saveEventPopup({
      id: this.props.popupEvent.id,
      details: details,
      router: this.context.router
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


Popup.contextTypes = {
  router: React.PropTypes.func
};
