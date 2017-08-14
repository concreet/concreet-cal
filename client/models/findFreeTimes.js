// find Available meeting times given a meeting length and freeBusy data

import moment from 'moment'

exports.findAvailableSlots = (meetingLength, calendars, callback) => {
  // meetingLength should be in minutes
  // calendars param is the result of a freeBusy query which is
  // a calendars array with each element being an object with a unique email address as a key
  // the value of that email key is an object with a busy key
  // the value of busy key is an array of objects that include start and end property of busy times
  // see https://docs.google.com/document/d/1Z7jaqjRvIZuvRJZW8X6a3JDIfilJTGclH0C-zYTAq04/edit for example of query
  var busyTimes = []

  // iterate over each calendar object
  for (var calendar of calendars) {
    // iterate over each email address (only one email per calendar object)
    for (var cal in calendar) {
      // iterate over every busy time for each email address and push to busyTimes array
      for (var busyTime of calendar[cal].busy) {
        busyTimes.push({start: new Date(busyTime.start).toTimeString().split(' ')[0], end: new Date(busyTime.end).toTimeString().split(' ')[0]})
      }
    }
  }


  //////////////
  // following functions are to create every time slot from 8:00 hours to 16:00 hours minus meeting length in 30 minute increments 
  // ( ex: [8:00, 8:30, 9:00 ...... 16:00 - meetingLength ])
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
          // if hours is single digit, add the leading 0 so that string time comparisons will work
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

  // busyTimes is based on users, allSlots if every 30 minute time slot starting at 8:00
  var getOpenSlots = (busyTimes, allSlots) => {

    // copy allSlots
    var openSlots = allSlots.slice();

    for (var busySlot of busyTimes) {
      var i = openSlots.length;
      // iterate backwards to not interfere with indexes and splicing
      while (i--) {
        var currentSlot = moment(openSlots[i].split(':').join(''), "HHmmss", true);
        // time of meeting would end for current time slot
        var overlapTime = currentSlot.add(meetingLength, 'minutes').format('HH:mm:ss')

        // checks if slot is within a busy slot
        if (openSlots[i] >= busySlot.start && openSlots[i] < busySlot.end) {
          // if so, take it out of openSlots array
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
  var timeSlots = getOpenSlots(busyTimes, slots)

  // map over each time slot to format them
  timeSlots = timeSlots.map((time) => {
    // turn time into a moment object to work with moment.js methods
    var timeMoment = moment(time.split(':').join(''), "HHmmss", true)

    // keep unformmated time slot for future use
    var timeData = {
      unformatted: time
    };

    var end = moment(timeMoment).add(meetingLength, 'minutes').format('HH:mm:ss');

    // format start time
    if (time > "12:59:59") {
      timeData.formatted = `${timeMoment.subtract(12, 'hours').format('HH:mm:ss').slice(0,5)} PM`;
    } else if (time > '11:59:59') {
      timeData.formatted = `${time.slice(0,5)} PM`;
    } else {
      timeData.formatted = `${time.slice(0,5)} AM`;
    }
    // // format end time
    if (end > "12:59:59") {
      timeData.end = `${moment(end.split(':').join(''), "HHmmss", true).subtract(12, 'hours').format('HH:mm:ss').slice(0,5)} PM`;
    } else if (end > '11:59:59') {
      timeData.end = `${end.slice(0,5)} PM`;
    } else {
      timeData.end = `${end.slice(0,5)} AM`;
    }

    return timeData;
  });

  callback(timeSlots);
};