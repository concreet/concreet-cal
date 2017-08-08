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
    callback(data.items);
  }).fail((err) => {
    console.log(err);
  })
};

export const getCalendarEvents = function (token, calendarList, cb) {
  for (var calendar of calendarList) {
    var oneWeekAgo = moment().subtract(1, 'weeks').format("YYYY-MM-DDTHH:mm:ssZ");
    var oneWeekFromNow = moment().add(1, 'weeks').format("YYYY-MM-DDTHH:mm:ssZ");

    // params inclue user token, single events to true to avoid returning all recurring events
    // give it a time range from one week ago to one week from now.
    // order by start time(ascending). Earliest event will be 0th element in items array
    var searchParams = {
      access_token: calendarInfo.token, 
      singleEvents: true, 
      timeMin: oneWeekAgo, 
      timeMax: oneWeekFromNow, 
      orderBy: 'startTime'
    };

    $.get(`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`, searchParams, (data) => {
      // data is an object with an items property that contains an array of calendar data
      callback(data.items);
    });
  }
}

export const processEvents = function (eventsList, cb) {
  for (var event of eventsList) {
    event.end = new Date (event.end.dateTime);
    event.start = new Date (event.start.dateTime);
  }
  cb(eventsList);
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

  // dummy data
  var requestBody = {
    "items": [
      {
        "id": "jordan.n.hoang@gmail.com"
      },
      {
        "id": "hackreactor.com_9kddcjfdij7ak91o0t2bdlpnoo@group.calendar.google.com"
      }
    ],
    "timeMin": "2017-08-01T17:06:02.000Z",
    "timeMax": "2017-08-09T17:06:02.000Z",
  }
  //
  
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
      callback(data);
    }
  })
};