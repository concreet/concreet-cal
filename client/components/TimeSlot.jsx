import React from 'react';
import moment from 'moment';
import * as CalendarModel from '../models/calendar.js'

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

		var endTime = moment(selectedDateTime).add('1', 'hours').toISOString();

		this.props.getEventDateTime(selectedDateTime);
		console.log('SDT', selectedDateTime);
		console.log('ET', endTime)
		console.log('name', this.props.eventTitle)
		console.log('using contacts but I got 20/20 vision', this.props.selectedContacts);
		console.log('user', this.props.user)

		CalendarModel.addEvent(this.props.selectedContacts, this.props.user.user, this.props.eventTitle, selectedDateTime, endTime, (data) => {})

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