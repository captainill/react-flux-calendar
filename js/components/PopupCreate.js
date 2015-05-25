import React from 'react';
import Popup from './Popup';

export default class PopupCreate extends Popup{

	constructor(props){
		super(props);
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
          <input type="submit" value="Create Event" onClick={this.onClickSaveHanlder} />
        </div>
      </form>
    )
  }  

};