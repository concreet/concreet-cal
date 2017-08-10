// find Available meeting times given a meeting length and freeBusy data

import moment from 'moment'

exports.findAvailableSlots = (meetingLength, calendars, callback) => {
  // meetingLength should be in minutes
  // calendars is the result of a freeBusy query which is
  // a calendars object with each key being a unique email address
  // each property has a value that is an object with a busy property
  // value of busy property is an array of objects that include start and end property of busy times
  var busyTimes = []
  for (var calendar of calendars) {
    for (var cal in calendar) {
      for (var busyTime of calendar[cal].busy) {
        busyTimes.push({start: new Date(busyTime.start).toTimeString().split(' ')[0], end: new Date(busyTime.end).toTimeString().split(' ')[0]})
      }
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
  var timeSlots = getOpenSlots(busyTimes, slots)

  timeSlots = timeSlots.map((time) => {
    var timeMoment = moment(time.split(':').join(''), "HHmmss", true)

    var timeData = {
      unformatted: time
    };

    var end = moment(timeMoment).add(meetingLength, 'minutes').format('HH:mm:ss');

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