import React from 'react';
import * as TimerUtils from '../utils/TimerUtils';
import connectToStores from '../utils/connectToStores';
import CurrentTimeStore from '../stores/CurrentTimeStore';
import CalendarUtils from '../utils/CalendarUtils';

/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
  const hour = CurrentTimeStore.getHour();
  const minutes= CurrentTimeStore.getMinute();

  return {
    hour,
    minutes
  }
}

const stores = [CurrentTimeStore];
@connectToStores(stores, getState)

export default class Hours extends React.Component{

	constructor(props){
		super(props);

		this.state = {hourHeight: 0};
	}

	componentDidMount(){
		this.setState({
			hourHeight: React.findDOMNode(this).clientHeight
		})
	}

	renderLabels(){
		const labels = TimerUtils.getHourLabels();

		return labels.map(function(label){
					return (
						<div className="hour-label">
							<span>{label}</span>
						</div>
						)
				})
	}

  render() {
  	const caretPosition = {
  		top:  CalendarUtils.getCurrentMinutePositionFromElementHeight(this.state.hourHeight, this.props.hour, this.props.minutes)
  	}
    return (
      <div className="hours">
      	<span className="timer-caret" style={caretPosition}></span>
      	<div>
      		{ this.renderLabels() }
      	</div>
      </div>
    );
  }

};
