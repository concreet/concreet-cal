# concreet-cal
Finds available meeting times and allows quick sending of gcal invites to attendees

-Client

  -components
    -App.jsx ==
      * has the state of signed-in user stored
      * handle page rendering depends on the signed-in state of users
      * handle user signed out
      * render either Dashboard.js and SplashLogin.js
    -Dashboard.jsx ==
      * has the state of selectedGroups, selectedContacts, allContacts, allGroups, contactObject(as a whole) stored
      * handle fetching all contacts and all groups from database: contact list are ordered by signed-up status
      * handle selected group and selected contacts: checkExist handle unselect a group or contact if it was already in the selected list
      * handle adding a group to the database, and adding contact to a certain group or remove contact to a certain grouop
      * handle adding a contact to the database: check for duplicates and e-mail validity of the contact added
      * render both SidePanel.js and BigCalBasic.js
    -SidePanel.jsx ==
      * render two GroupPanel.js and pass down a boolean "isContactList" to lower components to distinguish contact group panels and normal group panels.
    -GroupPanel.jsx ==
      * has two boolean states for toggling the add contact and add group function on and off
      * handle toggling the add contact or add group form on and off
      * handle deleting a group panel entry from retriving data from group panel entry and fire post request  
      * handle adding a group panel entry: also check for the viablity of the group name and restrict group name to not exceed 20 words.
      * handle adding a contact to the contact list group.
      * render either ContactEntry.jsx or GroupPanelEntry.jsx depending on the isContactList props passed-down from the side panel.
    -GroupEntry.jsx ==
      * has two boolean states for showing all contacts under a group and show if a group is selected
      * handle toggling contact list visibility
      * handle the group selected: update the selected group state in Dashboard.jsx and toggling the select indicator
      * handle adding contacts(selecting contacts from the contact list group panel) to a group
      * handle removing contacts(selecting contacts from the contact list group panel) from a group
      * handle deleting a group from database
      * render ContactEntry.jsx
    -ContactEntry.jsx ==
      * has a boolean for showing if a contact is selected or not for contact list
      * handle selecting contact: toggle the state of showing a selected contact and update the state of selected contact in Dashbaord.jsx depends on the entry selected

  -models
    -user.js
      * handle GET request to retrieve individual user data
      * handle GET request to retrieve all groups other than contact list group of a user
      * handle POST request to add a group entry to database
      * handle POST request to remove a group entry from database
      * handle POST request to add/update contact(s) of a group 
      * handle POST request to remove contact(s) from a group
      * handle GET request to find or create a contact in user table
      * handle GET request to retrieve all contacts of a user
      * handle GET request to destroy user session



  