
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

    var startOfMonth = moment().startOf('month').format("YYYY-MM-DDTHH:mm:ssZ");
    var endOfMonth = moment().endOf('month').format("YYYY-MM-DDTHH:mm:ssZ");

    // params inclue user token, single events to true to avoid returning all recurring events
    // give it a time range from one week ago to one week from now.
    // order by start time(ascending). Earliest event will be 0th element in items array
    var searchParams = {
      access_token: token,
      singleEvents: true,
      timeMin: startOfMonth,
      timeMax: endOfMonth,
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


export const freeBusy = (queryGroup, currentUser, timeMin, timeMax, callback) => {

  var allContactsCalendars = [];

// add current user to queries
  queryGroup.push(currentUser)

  var counter = 0;
// query freeBusy for all members of
  for (var member of queryGroup) {
    var id = member._id;
    var email = member.emailAddress;
    var accessToken = member.accessToken;
    var refreshToken = member.refreshToken;

    // dummy data
    var requestBody = {
      "items": [
        {
          "id": email
        },
        // {
        //   "id": "hackreactor.com_9kddcjfdij7ak91o0t2bdlpnoo@group.calendar.google.com"
        // }
      ],
      "timeMin": timeMin,
      "timeMax": timeMax,
    }

    $.ajax({
      type: "POST",
      url: `https://www.googleapis.com/calendar/v3/freeBusy`,
      headers: {Authorization: `Bearer ${accessToken}`},
      data: JSON.stringify(requestBody),
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) {
        console.log('each cal', data.calendars)
        //add to array that contains all members freeBusytimes
        allContactsCalendars.push(data.calendars);
        counter++;
        if (counter === queryGroup.length) {
          callback(allContactsCalendars);
        }
      },
      error: function(err) {
        // still need to work out refresh accessToken
      }
    });
  } //for loop end
}

export const addEvent = (queryGroup, currentUser, title, timeStart, timeEnd, callback) => {
  var accessToken = currentUser.accessToken;
  var calendarId = currentUser.emailAddress;
  var attendees = []

  timeStart = {
    "dateTime": timeStart,
    "timeZone": "America/Chicago"
  };
  timeEnd = {
    "dateTime": timeEnd,
    "timeZone": "America/Chicago"
  };

  for (var member of queryGroup) {
    var attendee = {
      email: member.emailAddress,
      responseStatus: 'accepted'
    };
    attendees.push(attendee);
  }

  var requestBody = {
    "attendees": attendees,
    "start": timeStart,
    "end": timeEnd,
    "reminders": {
      "useDefault": true,
    },
    "summary": title
  };

  $.ajax({
    type: "POST",
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    headers: {Authorization: `Bearer ${accessToken}`},
    data: JSON.stringify(requestBody),
    contentType: 'application/json',
    dataType: 'json',
    success: function() {
      console.log('new event added')
    },
    error: function(err) {
      console.log('did not post new event', err)
    }
  });
}
