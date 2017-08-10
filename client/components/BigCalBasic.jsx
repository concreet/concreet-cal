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
      displayModal: false,
      selectedDate: undefined,
      eventDateTime: undefined
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

  updateAvailableSlots(freeSlots, selectedDate) {
    this.setState({
      availableSlots: freeSlots,
      displayModal: true,
      selectedDate: selectedDate
    })

  }

  // get the selected meeting time in ISO format
  getEventDateTime(isoDateTime) {
    this.setState({
      eventDateTime: isoDateTime
    })
  }

  render(){
    return (
      <div>
        <AddEvent 
          user={this.props.user} 
          updateAvailableSlots={this.updateAvailableSlots.bind(this)} 
          selectedContacts={this.props.selectedContacts} />
        <br/>
        <BigCalendar
          {...this.props}
          events={this.state.events}
          views={allViews}
          titleAccessor='summary'
          defaultDate={new Date()}
        />
        {this.state.displayModal && <FreeTimeSlotsModal 
          availableSlots={this.state.availableSlots} 
          selectedDate={this.state.selectedDate}
          getEventDateTime={this.getEventDateTime.bind(this)}
          />
        }
      </div>
    )
  }
}


export default BigCalBasic;
