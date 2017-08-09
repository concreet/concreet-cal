import React from 'react';
import SidePanel from './SidePanel.jsx';
import BigCalBasic from './BigCalBasic.jsx';
import AddEvent from './AddEvent.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: [],
      selectedContacts: [],
      allGroups: [
      { owner_id: 1, group_name: 'test', isContactList: false, contacts: [{firstName: 'Hi', lastName: 'There', googleId: '2sfiewasdfors', emailAddress: 'hithere@gmail.com', isSignedUp: true}] },
      { owner_id: 1, group_name: 'test2', isContactList: false, contacts: [{firstName: 'Hii', lastName: 'Theree', googleId: '14sfiewfdsfors', emailAddress: 'hithere2@gmail.com', isSignedUp: true}] }, 
      { owner_id: 1, group_name: 'test3', isContactList: false, contacts: [{firstName: 'Hiii', lastName: 'Thereeee', googleId: '59sfiewodfsrs', emailAddress: 'hithere3@gmail.com', isSignedUp: true}] }
      ],
      allContacts: [
      { owner_id: 1, group_name: 'test1111', isContactList: true, contacts: [
        {firstName: 'Hi', lastName: 'There', googleId: '2sfiewasdfors', emailAddress: 'hithere@gmail.com', isSignedUp: true},
        {firstName: 'Hiii', lastName: 'Thereeee', googleId: '59sfiewodfsrs', emailAddress: 'hithere3@gmail.com', isSignedUp: true},
        {firstName: 'Hiii', lastName: 'Thereeee', googleId: '59sfiewodfsrs', emailAddress: 'hithere3@gmail.com', isSignedUp: true}
      ] }
      ]
    }
    //binding functions here\
    this.handleSelectedGroup = this.handleSelectedGroup.bind(this);
    this.handleSelectedContacts = this.handleSelectedContacts.bind(this);
    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.handleAddContact = this.handleAddContact.bind(this);
    this.handleUpdateGroup = this.handleUpdateGroup.bind(this);
    this.clearSelectedContacts = this.clearSelectedContacts.bind(this);
  }



  // componentDidMount() {
  //   //make ajax calls to server to retrieve all these data from database
  //   //make use of props.
  //   //console.log(this.state.allContacts[0].contacts)
  // }

  handleSelectedGroup(group) {
    console.log(this.state.selectedGroup, 'the GROUP before ');
    if (this.state.selectedGroup.indexOf(group) === -1) {
      var addGroup = this.state.selectedGroup.slice();
      addGroup.push(group);
      this.setState({
        selectedGroup: addGroup
      })
      
    } else {
      var removeGroup = this.state.selectedGroup.slice();
      removeGroup.splice(removeGroup.indexOf(group), 1);

      this.setState({
        selectedGroup: removeGroup
      })
    }
    setTimeout(()=> {console.log(this.state.selectedGroup, 'new GROUP');})
  }

  clearSelectedContacts() {
    this.setState({
      selectedContacts: []
    })
  }

  handleSelectedContacts(contact) {
    console.log(this.state.selectedContacts, 'the array before ');
    //console.log(contact,'this is the contact');
    if (this.state.selectedContacts.indexOf(contact) === -1) {
      var love = this.state.selectedContacts.slice();
      love.push(contact);
      // console.log(love, 'what is love?')
      this.setState({
        selectedContacts: love
      })
    } else {
      // console.log('was here?');
      var baby = this.state.selectedContacts.slice();
      baby.splice(baby.indexOf(contact), 1);

      this.setState({
        selectedContacts: baby
      })
    }
    setTimeout(()=> {console.log(this.state.selectedContacts, 'new one');})

  }

  handleAddGroup(groupname) {
    console.log('check if add group proc', groupname)
    //will do a post request to the database to add a new group
    //then do a get request to reset state of all groups
    // this.setState({
    //   allGroups:
    // })
  }

  handleAddContact(gmail) {
    console.log('check if add contact proc', gmail)
    //will do a post request to the databse to add a new contact
    //then do a get request to set contacts
    // this.setState({
    //   allContacts:
    // })
  }

  handleUpdateGroup() {
    console.log('check if can add contacts to group');
    console.log(this.state.selectedContacts, 'whats this')
    //do a post request to update contact list for the group in databse
  }

  render() {
    return (
      <div className="dashboard">
        <h1>--------Dashboard-----------</h1>
        <SidePanel contacts={this.state.allContacts[0].contacts} groups={this.state.allGroups} selectContact={this.handleSelectedContacts} selectGroup={this.handleSelectedGroup} addGroup={this.handleAddGroup} addContact={this.handleAddContact} updateGroup={this.handleUpdateGroup} clearSelectedContacts={this.clearSelectedContacts} selectedContacts={this.state.selectedContacts}/>
        <BigCalBasic user={this.props.user} selectedGroups={this.state.selectedGroup} selectedContacts={this.state.selectedContacts}/>

      </div>

    );
  }
}

export default Dashboard;
