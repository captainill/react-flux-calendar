import React from 'react';
import * as TimerUtils from '../utils/TimerUtils';

export default class Hours extends React.Component{

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
    return (
      <div className="hours">
      	{ this.renderLabels() }
      </div>
    );
  }

};
