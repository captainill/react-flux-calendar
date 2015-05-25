import React from 'react';

export default class HourCell extends React.Component{

	constructor(){
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		const _this = this;
		this.props.addEvent(e.nativeEvent, this.props.hour, React.findDOMNode(_this).offsetTop);
	}

  render() {
    return (
      <div className="hour" onClick={this.handleClick}>
      	<hr/>
      </div>
    );
  }

};
