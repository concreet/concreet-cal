import React from 'react';
import GroupPanelEntry from './GroupPanelEntry.jsx';
import ContactEntry from './ContactEntry.jsx';
import $ from 'jquery';
import {deleteGroup} from '../models/user.js';

class GroupPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addContact: false,
      addGroup: false
    }
    this.handleAddContact = this.handleAddContact.bind(this);
    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.willAddContact = this.willAddContact.bind(this);
    this.willAddGroup = this.willAddGroup.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
    this.handleRemoveContact = this.handleRemoveContact.bind(this);
  }

  willAddContact() {
    this.setState({
      addContact: !this.state.addContact      
    })
  }

  willAddGroup() {
    this.setState({
      addGroup: !this.state.addGroup
    })
  }

  handleDeleteGroup(group) {
    deleteGroup(group, this.props.resetSide);
  }

  handleAddGroup(e) {
    e.preventDefault();
    if (!e.target.groupname.value) {
      alert('Error: Please enter a valid group name.');
    } else if (e.target.groupname.value.length > 20) {
      alert('Error: Group name can not be over 20 characters.')
    } else {
      this.props.addGroup(e.target.groupname.value);
    }
    e.target.groupname.value = '';
  }

  handleAddContact(e) {
    e.preventDefault();
    this.props.addContact(e.target.contactmail.value);
    e.target.contactmail.value = '';
  }
  //reason why e is better than using jquery - there may be some default action taken by react(or who knows what)
  //that will re-render on click and nothing was added to the database
  handleRemoveContact() {
    let allSelectedNames = [];
    for (let contact of this.props.selectedContacts) {
      allSelectedNames.push(contact.emailAddress);
    }
    if (this.props.selectedContacts.length === 0) {
      alert('Error: No contact was selected for deletion.');
    } else {
      if (confirm('Warning: Are you sure you want to delete [' + allSelectedNames + '] from your contact list?')) {
        this.props.removeContactFromGroup(this.props.contactGroup);
        this.props.clearSelectedContacts();
      } 
    }
  }


  render() {
    return (
      <div className="grouppanel">
        { this.props.isContactList && <h3 style={{display: 'inline'}}> CONTACTS </h3>}
        { this.props.isContactList && <button className="addbutton" onClick={this.willAddContact}> <i className="fa fa-user-plus" aria-hidden="true"></i> </button>}
        { this.props.isContactList && <button className="addbutton" onClick={this.handleRemoveContact}> <i className="fa fa-user-times" aria-hidden="true"></i> </button>}
        { this.state.addContact && <form onSubmit={this.handleAddContact}> 
          <input  className="contactmail" name="contactmail" type="text" placeholder="Contact's Gmail" />
          <input className="submit" type="submit" value="Add"/>
          </form>}
        { this.props.isContactList && this.props.contacts.map((contact, i) => <ContactEntry key={contact._id} contact={contact} selectContact={this.props.selectContact} selectedContacts={this.props.selectedContacts} />) }



        { !this.props.isContactList && <h3 style={{display: 'inline'}}> GROUPS </h3>}
        { !this.props.isContactList && 
          <button className="addbutton" onClick={this.willAddGroup}> <i className="fa fa-users" aria-hidden="true"></i> </button> }
        { this.state.addGroup && <form onSubmit={this.handleAddGroup}> 
          <input className="groupnameForm" name="groupname" type="text" placeholder="Group Name" />
          <input className="submit" type="submit" value="Add" />
          </form>}
        <br />
        { !this.props.isContactList && this.props.groups.map((group, i) => <GroupPanelEntry key={i} group={group} selectContact={this.props.selectContact} selectGroup={this.props.selectGroup} updateGroup={this.props.updateGroup} removeContactFromGroup={this.props.removeContactFromGroup} deleteGroup={this.handleDeleteGroup}/>)}
      </div>

    );
  }
}

//need a .map function to render multiple entries

export default GroupPanel;