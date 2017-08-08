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
      events: events
    }
  }

  componentWillMount() {
    // callback hell to load events into calendar
    CalendarModel.getCalendarList(this.props.user.token, (token, items) => {
      CalendarModel.getCalendarEvents(token, items, (eventsList) => {
        CalendarModel.processEvents(eventsList, (processedEvents) => {
          this.setState({
            events: processedEvents,
          })
          console.log('processedEvents', processedEvents);
        })
      })
    });
  }
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={this.state.events}
        views={allViews}
        titleAccessor='summary'
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
}


export default BigCalBasic;
