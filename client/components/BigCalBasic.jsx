import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import * as CalendarModel from '../models/calendar.js';
import events from './events';

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

class BigCalBasic extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
    CalendarModel.getCalendarList(this.props.user.token, (token, items) => {CalendarModel.getCalendarEvents(token, items, (events) => console.log(events) )});
    //functions in here will be invoked when App initiate

  }

  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        views={allViews}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
}

export default BigCalBasic;
