import React from 'react';
import moment from 'moment';

class TimeSlot extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick() {
		// get the selected date in ISO format without any time aspect
		var selectedDate = this.props.selectedDate.split('T')[0]

		// convert the unformatted time into a moment object
		var momentTime = moment(this.props.slotTime.unformatted.split(':').join(''), "HHmmss", true).format('HH:mm:ss')

		// convert moment object into an ISO string and pluck only the time aspect of it, without the date
		var isoTime = moment(momentTime, 'HH:mm:ss').toISOString().split('T')[1]

		var selectedDateTime = (selectedDate + 'T' + isoTime);

		this.props.getEventDateTime(selectedDateTime);
		console.log('SDT', selectedDateTime);
		console.log('name', this.props.eventTitle)



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