import React from 'react';
import Router from 'react-router';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';
import RouterContainer from '../utils/RouterContainer';

export default class Popup extends React.Component{

	constructor(props){
		super(props);
	}

  componentDidMount(){
    /*
      Because I'm manually attaching a click to <html> outside of reacts synthetic events, 
      to handling toggling popup when it loses focus, I need to handle the other clicks outside synthetic events 
      to assure the right order
    */
    React.findDOMNode(this).addEventListener('click', this.onPopupBodyClick.bind(this));
    React.findDOMNode(this.refs.popClose).addEventListener('click', this.onClosetHandler.bind(this));
  }	

  componentWillUnmount(){
    React.findDOMNode(this).removeEventListener('click', this.onPopupBodyClick.bind(this));
    React.findDOMNode(this.refs.popClose).removeEventListener('click', this.onClosetHandler.bind(this));
  } 

  /*shouldComponentUpdate(nextProps){
    return nextProps.isPopupShowing != this.props.isPopupShowing;
  }*/

  render() {
  	const style = {
  		bottom: this.props.position.top,
  		left: this.props.position.left
  	}

    return (
      <div style={style} key={'pop_'+this.props.popupEvent.id} className={"popup "+ (this.props.isPopupShowing ? 'active' : '')} >
      	<div className="pop-content">
          <span>
	      	  <a className="pop-close" ref="popClose" href="#">X</a>
          </span>
	      	{this.renderForm()}
	        <div className="caret-down">
	        	<span className="caret-border"></span>
	        	<span className="caret-bg"></span>
	        </div>
        </div>
      </div>
    );
  }

  onClosetHandler(e){
  	CalendarActionCreators.closePopup({
      payload: {
        id: this.props.popupEvent.id,
        remove: this.props.popupEvent.isSaved
      }
  	});   	

  	e.preventDefault();
  }

  //stop clicks from passing through to html click setup to hide popup when unfocusing
  onPopupBodyClick(e){
  	e.stopPropagation();
  }

};
