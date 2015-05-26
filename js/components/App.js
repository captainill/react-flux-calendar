import React from "react/addons";
import { RouteHandler } from 'react-router';
import PopupCreate from './PopupCreate';
import PopupEdit from './PopupEdit';
import PopupStore from '../stores/PopupStore';
import EventStore from '../stores/EventStore';
import connectToStores from '../utils/connectToStores';
import * as CalendarActionCreators from '../actions/CalendarActionCreators';

/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
  const isPopupShowing = PopupStore.isPopupShowing();
  const position = PopupStore.getPosition();
  let popupEvent = PopupStore.getEvent();
  const popUpMode = popupEvent.mode;

  if(popupEvent.mode == 'edit'){
    popupEvent = EventStore.get(popupEvent.id);
  }

  return {
    position,
    isPopupShowing,
    popupEvent,
    popUpMode
  }
}

const stores = [PopupStore];
@connectToStores(stores, getState)

export default class App extends React.Component{

  constructor(props){
    super(props);

    this.onHtmlClick = this.onHtmlClick.bind(this);
  }

  componentDidMount(){
    document.getElementsByTagName('html')[0].addEventListener('click', this.onHtmlClick);
  }

  render() {
    const Popup = (this.props.popUpMode == 'create') ? PopupCreate : PopupEdit;
    return (
      <div className="app-wrap">
        <Popup key={this.props.popupEvent.id} {...this.props} />
        <RouteHandler/>
      </div>
    );
  }

  onHtmlClick(){
    if(!this.props.isPopupShowing)
      return;
    
    CalendarActionCreators.hideEventPopup();
  }  

};