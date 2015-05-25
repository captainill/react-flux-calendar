import React from "react/addons";
import { RouteHandler } from 'react-router';
import Popup from './Popup';
import PopupStore from '../stores/PopupStore';
import connectToStores from '../utils/connectToStores';

/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
  const isPopupShowing = PopupStore.isPopupShowing();
  const position = PopupStore.getPosition();
  const popupEvent = PopupStore.getEvent();

  return {
    position,
    isPopupShowing,
    popupEvent
  }
}

const stores = [PopupStore];
@connectToStores(stores, getState)

export default class App extends React.Component{

  static contextTypes = {
    router: React.PropTypes.func
  }

  render() {
  	var name = this.context.router.getCurrentPath();
    return (
      <div className="app-wrap">
        <Popup {...this.props} />
        <RouteHandler key={name} />
      </div>
    );
  }

};