import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

let BigCalBasic = React.createClass({
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
})

export default BigCalBasic;
