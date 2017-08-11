
// controllers to get back calendar data from Google Calendars API
// see https://docs.google.com/document/d/1Z7jaqjRvIZuvRJZW8X6a3JDIfilJTGclH0C-zYTAq04/edit for
// walkthrough an examples of response bodies for different API requests

import $ from 'jquery';
import moment from 'moment';

//get data from database since it has the most current values for refresh tokens and access tokens

const checkQueryGroup = (queryGroup, callback) => {
  // console.log('queryGroup', queryGroup);
  var checkedQueryGroup = []
  for (var user of queryGroup) {
    getUserFromDB(user, (reauthUser) => {
      checkedQueryGroup.push(reauthUser)
      // console.log('from db', reauthUser);
      if (checkedQueryGroup.length === queryGroup.length) {
        // console.log('queryGroup reauthUser', checkedQueryGroup);
        callback(checkedQueryGroup);
      }
    });
  }
}

const getUserFromDB = (user, callback) => {
  // console.log('getUserFromDB', user);
  $.get(`/users/user/${user.emailAddress}`, (user) => {
    checkAccessToken(user, true, (reauthUser) => {
      // console.log('getUserFromDB reauthUser', reauthUser);
      callback(reauthUser);
    })
  })
}

const checkAccessToken = (user, retry, callback) => {
  // console.log('checkAccessToken', user);
  $.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${user.accessToken}`, (data) => {
    // console.log('google check', data)
    callback(user);
  }).fail((err) => {
    console.log('google check failed');
    console.error(err);
    if (retry) {
      refreshToken(user, (reauthUser) => {
        // console.log('inside refresh', reauthUser)
        checkAccessToken(reauthUser, false, (reauthUser)=>{
          // console.log('checkAccessToken reauthUser', reauthUser);
          callback(reauthUser);
        })
      });
    } else {
      // console.log('could not reauth user');
      callback(user)
    }
  })
}

const refreshToken = (user, callback) => {
  // console.log('refreshToken', user);
  $.get(`/users/reauth/${user._id}`, (reauthUser) => {
    // console.log('refreshToken reauthUser', reauthUser);
    callback(reauthUser);
  })
}

// retrieves all calendars for a single user
export const getCalendarList = (currentUser, callback) => {

  getUserFromDB(currentUser, (currentUser) => {

    console.log('get calendar list', currentUser);
    // token is special key provided by google to identify a user and a session
    var searchParams = {access_token: currentUser.accessToken};

    $.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', searchParams, (data) => {
      // data is an object with an items property that contains an array of calendar data
      callback(currentUser, data.items);
    }).fail((err) => {
      console.log(err);
    })

  });
};

export const getCalendarEvents = function (currentUser, calendarList, callback) {
  // for (var calendar of calendarList) {
  var calendar = calendarList[0];

  console.log('cal and cur', calendarList, currentUser);
    // replace any pound sign with its escape character. Pound sign interferes with URL search
    calendar.id = calendar.id.replace('#', '%23')

    var startOfMonth = moment().startOf('month').format("YYYY-MM-DDTHH:mm:ssZ");
    var endOfMonth = moment().endOf('month').format("YYYY-MM-DDTHH:mm:ssZ");

    // params inclue user token, single events to true to avoid returning all recurring events
    // give it a time range from one week ago to one week from now.
    // order by start time(ascending). Earliest event will be 0th element in items array
    var searchParams = {
      access_token: currentUser.accessToken,
      singleEvents: true,
      timeMin: startOfMonth,
      timeMax: endOfMonth,
      orderBy: 'startTime'
    };

    $.get(`https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`, searchParams, (data) => {
      // data is an object with an items property that contains an array of calendar data
      callback(data.items);
    });
  // }
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

  checkQueryGroup(queryGroup, (checkedQueryGroup) => {

    // console.log('checkedueryGroup after', checkedQueryGroup);

    var counter = 0;
    // query freeBusy for all members of
    for (var member of checkedQueryGroup) {
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
          return console.log(err.responseText);
        }
      });
    } //for loop end
  }) //checkQueryGroup function
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
