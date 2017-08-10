import $ from 'jquery';

export var getUser = (callback) => {
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

export var getGroup = (userID, callback) => {
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

export var addGroup = (groupname, user, callback) => {
  $.ajax({
      type: "POST",
      url: '/groups/create',
      dataType: 'application/json',
      data: JSON.stringify({
        user: user,
        groupName: groupname
      }),
      contentType: 'application/json',
      statusCode: {
        200: function(data) {
          callback();
        }
      },
      error: (err) => {
        return null;
        // callback(err);
      }
  })
}


export var addContactToGroup = (group, contact, callback) => {
  $.ajax({
      type: "POST",
      url: '/groups/user/add',
      dataType: 'application/json',
      data: JSON.stringify({
        group: group,
        targetUser: contact
      }),
      contentType: 'application/json',
      statusCode: {
        200: function(data) {
          callback();
        }
      },
      error: (err) => {
        return null;
        // callback(err);
      }
      // success: (data) => {
      //   callback(data);
      // },
      // error: (err, statusCode) => {
      //   console.log(err);
      // }
  })
}

export var addContact = (gmail, callback) => {
  let url = '/users/user/' + gmail;
  $.ajax({
      type: "GET",
      url: url,
      // dataType: 'application/json',
      // data: JSON.stringify({
      //   user: user,
      //   groupName: groupname
      // }),
      contentType: 'application/json',
      success: (data) => {
        callback(data);
      }
  })
  
}

export const getContact = (userID, callback) => {
  let contacturl = '/contacts/user/' + userID;
  $.ajax({
      type: "GET",
      url: contacturl,
      contentType: 'application/json',
      success: (data) => {
        callback(data);
      }
  })

}

// window.getUser = getUser;
// window.getGroup = getGroup;
// window.addGroup = addGroup;
// window.addContactToGroup = addContactToGroup;
// window.addContact = addContact;
