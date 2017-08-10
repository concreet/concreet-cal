import React from 'react';
import SidePanel from './SidePanel.jsx';
import BigCalBasic from './BigCalBasic.jsx';
import AddEvent from './AddEvent.jsx';
import * as UserModel from '../models/user.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: [],
      contact: {},
      selectedContacts: [],
      allGroups: [
      { owner_id: 1, group_name: 'test', isContactList: false, contacts: [{firstName: 'Hi', lastName: 'There', googleId: '2sfiewasdfors', emailAddress: 'hithere@gmail.com', isSignedUp: true}] },
      { owner_id: 1, group_name: 'test2', isContactList: false, contacts: [{firstName: 'Hii', lastName: 'Theree', googleId: '59sfiewodfsrs', emailAddress: 'hithere2@gmail.com', isSignedUp: true}] }, 
      { owner_id: 1, group_name: 'test3', isContactList: false, contacts: [{firstName: 'Hiii', lastName: 'Thereeee', googleId: '59sfiewodfsrsdsf', emailAddress: 'hithere3@gmail.com', isSignedUp: true}] }
      ],
      allContacts: [
      { owner_id: 1, group_name: 'test1111', isContactList: true, contacts: [
        {firstName: 'Hi', lastName: 'There', googleId: '2sfiewasdfors', emailAddress: 'hithere@gmail.com', isSignedUp: true},
        {firstName: 'Hii', lastName: 'Thereeee', googleId: '59sfiewodfsrs', emailAddress: 'hithere3@gmail.com', isSignedUp: true},
        {firstName: 'Hiii', lastName: 'Thereeee', googleId: '59sfiewodfsrsdsf', emailAddress: 'hithere3@gmail.com', isSignedUp: true}
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



  componentDidMount() {
    UserModel.getGroup(this.props.user.user._id, (group)=>{
      console.log(group, 'should be group list');
      this.setState({
        allGroups: group
      })
    })
    UserModel.getContact(this.props.user.user._id, (contact) => {
      console.log(contact, 'should be a contact list from mongoose');
      this.setState({
        allContacts: contact.contacts,
        contact: contact

      })
    })
    //make ajax calls to server to retrieve all these data from database
    //make use of props.
    //console.log(this.state.allContacts[0].contacts)
  }

  handleSelectedGroup(group) {
    //console.log(group, 'here')
    //console.log(this.state.selectedGroup, 'WHATS THIS');
    
    if (!this.checkExist(this.state.selectedGroup, group)) {
      var addGroup = this.state.selectedGroup.slice();
      addGroup.push(group);
      this.setState({
        selectedGroup: addGroup
      })
      group.contacts.forEach((contact) => {
        console.log(this.state.selectedContacts, 'the array before IN GRUP');
        this.handleSelectedContacts(this.state.selectContacts, contact)
      // if (!this.checkExist(this.state.selectedContacts, contact)) {
        // var neww = this.state.selectedContacts.slice();
        // neww.push(contact);
        // // console.log(love, 'what is love?')
        // this.setState({
        //   selectedContacts: neww
        // })
      })
      setTimeout(()=> {console.log(this.state.selectedContacts, 'new one IN GROUP');})  
    } else {
      var removeGroup = this.state.selectedGroup.slice();
      removeGroup.splice(removeGroup.indexOf(group), 1);

      this.setState({
        selectedGroup: removeGroup
      })

      group.contacts.forEach((contact) => {
        this.handleSelectedContacts(this.state.selectContacts, contact)
        // var baby = this.state.selectedContacts.slice();
        // baby.splice(baby.indexOf(contact), 1);

        // this.setState({
        //   selectedContacts: baby
        })
      // })
    }
  }

    // group.contacts.forEach((contact) => {
    //   console.log(this.state.selectedContacts, 'the array before IN GRUP');
    //   if (!this.checkExist(this.state.selectedContacts, contact)) {
    //     var neww = this.state.selectedContacts.slice();
    //     neww.push(contact);
    //     // console.log(love, 'what is love?')
    //     this.setState({
    //       selectedContacts: neww
    //     })
    //   }
    //   setTimeout(()=> {console.log(this.state.selectedContacts, 'new one IN GROUP');})

      //this.handleSelectedContacts(contact);
    // })
    // console.log(this.state.selectedGroup, 'the GROUP before ');
    // if (this.state.selectedGroup.indexOf(group) === -1) {
    //   var addGroup = this.state.selectedGroup.slice();
    //   addGroup.push(group);
    //   this.setState({
    //     selectedGroup: addGroup
    //   })
      
    // } else {
    //   var removeGroup = this.state.selectedGroup.slice();
    //   removeGroup.splice(removeGroup.indexOf(group), 1);

    //   this.setState({
    //     selectedGroup: removeGroup
    //   })
    // }
    // setTimeout(()=> {console.log(this.state.selectedGroup, 'new GROUP');})
  // }

  clearSelectedContacts() {
    this.setState({
      selectedContacts: []
    })
  }

  checkExist(contacts, target) {
    let check = false;
    for (let contact of contacts) {
      if (contact._id === target._id) {
        check = true;
      }
    }
    return check;
  }

  handleSelectedContacts(contact) {
    console.log(this.state.selectedContacts, 'the array before ');
    if (!this.checkExist(this.state.selectedContacts, contact)) {
      var addContact = this.state.selectedContacts.slice();
      addContact.push(contact);
      this.setState({
        selectedContacts: addContact
      })
    } else {
      var removeContact = this.state.selectedContacts.slice();
      removeContact.splice(removeContact.indexOf(contact), 1);

      this.setState({
        selectedContacts: removeContact
      })
    }
    setTimeout(()=> {console.log(this.state.selectedContacts, 'new one');})

  }

  handleAddGroup(groupname) {
    UserModel.addGroup(groupname, this.props.user.user, (sucess)=> {
      console.log(sucess, '+++++++++')
      UserModel.getGroup(this.props.user.user._id, (data)=>{
        console.log(data, 'did this ever run?');
        this.setState({
          allGroups: data
        })
    })
    })
  }

  handleAddContact(gmail) {
    console.log('check if add contact proc', gmail);
    UserModel.addContact(gmail, (contact) => {
      console.log(contact, 'this is the stuff from addorfindXXXX', this.state.contact);

      //UserModel.getContact(this.props.user.user._id, (contactGroup) => {
      // console.log(contactGroup, 'should be the users contact list from mongooseXXXXX');
        UserModel.addContactToGroup(this.state.contact, contact, ()=>{
          console.log('reached here, should added to the contact list XXX');
          UserModel.getContact(this.props.user.user._id, (contactGroup2) => {
            this.setState({
              allContacts: contactGroup2.contacts
            })
          })
        })
      //})

    })
    //window.addContactToGroup()
    //will do a post request to the databse to add a new contact
    //then do a get request to set contacts
    // this.setState({
    //   allContacts:
    // })
  }

  handleUpdateGroup(group) {
    console.log(this.state.selectedContacts, 'whats this')
    this.state.selectedContacts.forEach((contact)=>{
      UserModel.addContactToGroup(group, contact, ()=>{
        console.log('==========================')
      })
    })
    //do a post request to update contact list for the group in databse
  }

  render() {
    return (
      <div className="dashboard">
        <h1>--------Dashboard-----------</h1>
        <SidePanel contacts={this.state.allContacts} groups={this.state.allGroups} selectContact={this.handleSelectedContacts} selectGroup={this.handleSelectedGroup} addGroup={this.handleAddGroup} addContact={this.handleAddContact} updateGroup={this.handleUpdateGroup} clearSelectedContacts={this.clearSelectedContacts} selectedContacts={this.state.selectedContacts}/>
        <BigCalBasic user={this.props.user} selectedGroups={this.state.selectedGroup} selectedContacts={this.state.selectedContacts}/>

      </div>

    );
  }
}

export default Dashboard;
