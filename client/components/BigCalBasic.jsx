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
      availableSlots: [],
      displayModal: false
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
  }

  updateAvailableSlots(freeSlots) {
    this.setState({
      availableSlots: freeSlots,
      displayModal: true
    })
    console.log('updating')
  }
  render(){
    return (
      <div>
        <AddEvent token={this.props.user.token} updateAvailableSlots={this.updateAvailableSlots.bind(this)} />
        <br/>
        <BigCalendar
          {...this.props}
          events={this.state.events}
          views={allViews}
          titleAccessor='summary'
          defaultDate={new Date()}
        />
        {this.state.displayModal && <FreeTimeSlotsModal availableSlots={this.state.availableSlots}/>}
      </div>
    )
  }
}


export default BigCalBasic;
