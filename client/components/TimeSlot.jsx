import React from 'react';

class TimeSlot extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick() {
		console.log(this.props.slotTime);
		this.props.closeModal()
	}

	render() {
		return (
			<div className="slotButtonDiv">
			  <button className="slotButton" onClick={this.handleClick.bind(this)}>{this.props.slotTime.formatted} - {this.props.slotTime.end}</button>
			</div>
		)
	}

}

export default TimeSlot;