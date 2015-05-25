import React from 'react';
import * as TimerUtils from '../utils/TimerUtils';
import connectToStores from '../utils/connectToStores';
import CurrentTimeStore from '../stores/CurrentTimeStore';

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
  	const hourHeight = this.state.hourHeight;
  	const cellHeight = hourHeight /  (24 * 60);
  	const totalMinutes = (this.props.hour * 60) + this.props.minutes;

  	const caretPosition ={
  		top:  totalMinutes * cellHeight
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
