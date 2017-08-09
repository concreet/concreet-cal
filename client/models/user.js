import $ from 'jquery';

var getUser = (callback) => {
  // $.get('https://www.googleapis.com/youtube/v3/search', {
  //   q: options.query,
  //   maxResults: options.max,
  //   key: options.key},
  //       callback
  // );

  $.ajax({
      type: "GET",
      url: '/session',
      contentType: 'application/json',
      success: (data) => {
        callback(data);
      }
  })
};

var getGroup = (userID, callback) => {
  let groupurl = '/groups/user/' + userID;
  $.ajax({
      type: "GET",
      url: groupurl,
      contentType: 'application/json',
      success: (data) => {
        callback(data);
      }
  })

}

var addGroup = (groupname, user, callback) => {
  $.ajax({
      type: "POST",
      url: '/groups/create',
      dataType: 'application/json',
      data: JSON.stringify({
        user: user,
        groupName: groupname
      }),
      contentType: 'application/json',
      success: (data) => {
        callback(data);
      },
      error: (err, statusCode) => {
        console.log(err);
      }
  })
}

var addContactToGroup = (group, contact, callback) => {
  $.ajax({
      type: "POST",
      url: '/groups/user/add',
      dataType: 'application/json',
      data: JSON.stringify({
        group: group,
        targetUser: contact
      }),
      contentType: 'application/json',
      success: (data) => {
        callback(data);
      },
      error: (err, statusCode) => {
        console.log(err);
      }
  })
}

var addContact = () => {
  
}

window.getUser = getUser;
window.getGroup = getGroup;
window.addGroup = addGroup;
window.addContactToGroup = addContactToGroup;
window.addContact = addContact;
