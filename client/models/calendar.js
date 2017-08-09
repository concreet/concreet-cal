
// controllers to get back calendar data from Google Calendars API
// see https://docs.google.com/document/d/1Z7jaqjRvIZuvRJZW8X6a3JDIfilJTGclH0C-zYTAq04/edit for
// walkthrough an examples of response bodies for different API requests 

import $ from 'jquery';
import moment from 'moment';

// retrieves all calendars for a single user
export const getCalendarList = (token, callback) => {
  // token is special key provided by google to identify a user and a session
  var searchParams = {access_token: token};

  $.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', searchParams, (data) => {
    // data is an object with an items property that contains an array of calendar data
    callback(token, data.items);
  }).fail((err) => {
    console.log(err);
  })
};

export const getCalendarEvents = function (token, calendarList, callback) {
  for (var calendar of calendarList) {

    // replace any pound sign with its escape character. Pound sign interferes with URL search
    calendar.id = calendar.id.replace('#', '%23')

    var twoWeeksAgo = moment().subtract(2, 'weeks').format("YYYY-MM-DDTHH:mm:ssZ");
    var twoWeeksFromNow = moment().add(2, 'weeks').format("YYYY-MM-DDTHH:mm:ssZ");

    // params inclue user token, single events to true to avoid returning all recurring events
    // give it a time range from one week ago to one week from now.
    // order by start time(ascending). Earliest event will be 0th element in items array
    var searchParams = {
      access_token: token, 
      singleEvents: true, 
      timeMin: twoWeeksAgo, 
      timeMax: twoWeeksFromNow, 
      orderBy: 'startTime'
    };

    $.get(`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`, searchParams, (data) => {
      // data is an object with an items property that contains an array of calendar data
      callback(data.items);
    });
  }
}

export const processEvents = function (eventsList, callback) {
  for (var event of eventsList) {
    event.end = new Date (event.end.dateTime);
    event.start = new Date (event.start.dateTime);
  }
  callback(eventsList);
}

export const getEventData = (eventInfo, callback) => {
  // eventData contains token, calendarId, and eventId properties
  eventInfo.calendarId = 'hackreactor.com_9kddcjfdij7ak91o0t2bdlpnoo@group.calendar.google.com';
  eventInfo.eventId = 'hmohhg9pjtr795k22mq17eltvk_20170801T223000Z'

  var searchParams = {
    access_token: eventInfo.token,
  }

  $.get(`https://www.googleapis.com/calendar/v3/calendars/${eventInfo.calendarId}/events/${eventInfo.eventId}`, searchParams, (data) => {
    callback(data);
  });
};

export const freeBusy = (queryInfo, callback) => {
  // queryInfo contains token, timeMin, timeMax, and calendar ids

  var calendars = queryInfo.items.map( (calendar) => {
    return {id: calendar.id}
  });

  // dummy data
  var requestBody = {
    "items": calendars,
    "timeMin": "2017-08-14T05:00:00Z",
    "timeMax": "2017-08-15T05:00:00Z",
  }
  
  $.ajax({
    type: "POST",
    url: `https://www.googleapis.com/calendar/v3/freeBusy`,
    headers: {Authorization: `Bearer ${queryInfo.token}`},
    data: JSON.stringify(requestBody),
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      // data returns an object with calendars property 
      // calendars property returns all calendars searched for
      // each calendar has a busy property with array of busy times

      // give callback the calendars and their busy property
      callback(data.calendars);
    }
  })
};

export const accessControl = (token, calendarId, callback) => {

  var requestBody = {
    "kind": "calendar#aclRule",
    "role": "freeBusyReader",
    "scope": {
      "value": "jordan.n.hoang@gmail.com",
      "type": "user"
    }
  };

  $.ajax({
    type: "POST",
    url: `https://www.googleapis.com/calendar/v3/calendars/jordan.n.hoang@utexas.edu/acl`,
    headers: {Authorization: `Bearer ${token}`},
    data: JSON.stringify(requestBody),
    contentType: 'application/json',
    dataType: 'json',
    success: (data) => {
      callback(data)
    }

  });
}

export const findAvailableSlots = (meetingLength, calendars) => {
  // meetingLength should be in minutes
  // calendars is the result of a freeBusy query which is
  // a calendars object with each key being a unique email address
  // each property has a value that is an object with a busy property
  // value of busy property is an array of objects that include start and end property of busy times

  var busyTimes = []
  for (var calendar in calendars) {
    for (var busyTime of calendars[calendar].busy) {
      busyTimes.push({start: new Date(busyTime.start).toTimeString().split(' ')[0], end: new Date(busyTime.end).toTimeString().split(' ')[0]})
    }
  }

  var settings = {
      timeSlotGap: 30,
      // no meeting earlier than 8:00
      minTime: moment("080000", "HHmmss", true).format("HH:mm:ss"),
      // last meeting should end at 18:00
      // subtract meeting length from 18:00 so that last meeting time slot wont go past 18:00
      maxTime: moment("180000", "HHmmss", true).subtract(meetingLength, 'minutes').format("HH:mm:ss")
  };

  var getTimeDate = (time) => {
      var timeParts = time.split(':');
      var d = new Date();
      d.setHours(timeParts[0]);
      d.setMinutes(timeParts[1]);
      d.setSeconds(timeParts[2]);
      return d;
  }

  var getTimeSlots = (startDate, endDate, interval) => {
      var slots = [];

      var intervalMillis = interval * 60 * 1000;

      while (startDate <= endDate) {
          // So that you get "00" if we're on the hour.
          var mins = (startDate.getMinutes() + '0').slice(0, 2);
          var secs = (startDate.getSeconds() + '0').slice(0,2);
          // if hours is single digit, add the leading 0 so that time comparisons will work
          if (startDate.getHours() < 10) {
            slots.push('0' + startDate.getHours() + ':' + mins + ':' + secs);  
          } else {
            slots.push(startDate.getHours() + ':' + mins + ':' + secs); 
          }
          startDate.setTime(startDate.getTime() + intervalMillis);
      }
      
      return slots;
  }

  var slots = getTimeSlots(getTimeDate(settings.minTime), getTimeDate(settings.maxTime), settings.timeSlotGap);

  var getOpenSlots = (busyTimes, allSlots) => {

    var openSlots = allSlots.slice();

    for (var busySlot of busyTimes) {
      var i = openSlots.length;
      // iterate backwards to not interfere with indexes and splicing
      while (i--) {
        var currentSlot = moment(openSlots[i].split(':').join(''), "HHmmss", true);
        var overlapTime = currentSlot.add(meetingLength, 'minutes').format('HH:mm:ss')

        // checks if slot is within a busy slot
        if (openSlots[i] >= busySlot.start && openSlots[i] < busySlot.end) {
          openSlots.splice(i, 1)
        // checks if a meeting during a free slot will overlap with the next busy slot
        // ex: free at 13:30 but an hour meeting would overlap with a 14:00 busy time
        } else if (overlapTime > busySlot.start && overlapTime <= busySlot.end) {
          openSlots.splice(i, 1)
        }
      }
    }

    return openSlots;
  };
  // return an array of start times for available slots
  return getOpenSlots(busyTimes, slots)
};