import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import * as CalendarModel from '../models/calendar.js';
import events from './events';
import FreeTimeSlotsModal from './FreeTimeSlotsModal.jsx';
import findFreeTimes from '../models/findFreeTimes.js';
import AddEvent from './AddEvent.jsx';

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

class BigCalBasic extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      events: events,
      availableSlots: []
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
          // console.log('processedEvents', processedEvents);
        })
      })
    });
    CalendarModel.freeBusy(this.props.selectedContacts, this.props.user.user, 'n/a', 'n/a', (data)=>console.log('calendars', data));
  }
  render(){
    return (
      <div>
        <AddEvent />
        <br/>
        <BigCalendar
          {...this.props}
          events={this.state.events}
          views={allViews}
          titleAccessor='summary'
          defaultDate={new Date()}
        />
        <FreeTimeSlotsModal availableSlots={this.state.availableSlots}/>
      </div>
    )
  }
}


export default BigCalBasic;
