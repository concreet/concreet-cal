import React from 'react';
import moment from 'moment';

import { SingleDatePicker } from 'react-dates';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    }
    //binding functions here
    this.changeDate = this.changeDate.bind(this);
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