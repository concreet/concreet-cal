import React from 'react';
import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

import * as CalendarModel from '../models/calendar.js';
import events from './events';
import FreeTimeSlotsModal from './FreeTimeSlotsModal.jsx';
import findFreeTimes from '../models/findFreeTimes.js';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    }
    //binding functions here
    this.changeDate = this.changeDate.bind(this);
  }

  changeDate(e) {
    console.log('wtf')
    // // this.setState({
    // //   date: e.target.date.value
    // // })

    var meetingLength = e.target.meetingLength.value
    // console.log(this.state.date)

    var queryInfo = {
      token: this.props.token,
      items: [
        {
          id: 'jordan.n.hoang@gmail.com'
        },
        {
          id: 'jordanhoangGreenfield@gmail.com'
        }
      ]
    }; 
    CalendarModel.freeBusy(queryInfo, (calendars) => {
      // receives back calendars object with each key being a unique email address
      // each property has a value that is an object with a busy property
      // value of busy property is an array of objects that include start and end property of busy times

      findFreeTimes.findAvailableSlots(meetingLength, calendars, (freeSlots) => {
        this.props.updateAvailableSlots(freeSlots)
      });
    })

    e.preventDefault();
  }
  
  render() {
    return (
      <div className="addevent">
        <form onSubmit={this.changeDate.bind(this)}>
          <label>Meeting Length</label><input name="meetingLength"></input>
          <label>Date</label><input name="date"></input>
          <button>Create event</button>
        </form>
      </div>

    );
  }
}

export default AddEvent;

//This will be a form with dates/event name/description ...etc