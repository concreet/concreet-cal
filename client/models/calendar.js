import $ from 'jquery';

export const getCalendarList = function (token, cb) {
  $.ajax({
    type: "GET",
    url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    headers: {
      Authorization: `Bearer ${token}`
    },
    success: (data) => {
      cb(data.items)
      // console.log('get cal list', data.items);
    },
    error: (err) => {
      console.log(err);
    }
  })
}

// export const getCalendarList = function (cb) {
//   $.ajax({
//     type: "GET",
//     url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
//     headers: {
//       Authorization: `Bearer ${this.props.user.token}`
//     },
//     success: (data) => {
//       cb(data.items)
//       // console.log('get cal list', data.items);
//     },
//     error: (err) => {
//       console.log(err);
//     }
//   })
// }
