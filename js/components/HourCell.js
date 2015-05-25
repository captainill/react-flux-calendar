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
  	let content;

  	if(this.props.event){
  		let when = this.props.event.when;
  		content = <div className="hour-event">
  								<p>{when.slice(when.lastIndexOf(',') + 1, -1)}</p>
  								<p>{this.props.event.details}</p>
  							</div>;
  	}else{
  		content = <hr/>;
  	}

    return (
      <div className="hour" onClick={this.handleClick}>
      	{ content }
      </div>
    );
  }

};
