import React from 'react';
import GroupPanelEntry from './GroupPanelEntry.jsx';
import ContactEntry from './ContactEntry.jsx';
import $ from 'jquery';

class GroupPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addContact: false,
      addGroup: false,
      addContactToGroup: false
    }
    //binding functions here
    // this.handleAddContact = this.handleAddContact.bind(this);
    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.willAddContact = this.willAddContact.bind(this);
    this.willAddGroup = this.willAddGroup.bind(this);
    // this.handleUpdateGroup = this.handleUpdateGroup.bind(this);
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

  handleAddGroup(groupname) {
    this.props.addGroup(groupname);
    console.log('cant add a group yet', groupname)
  }

  // handleAddContact(contactmail) {
  //   this.props.addContact(contactmail);
  //   console.log('cant add a contact yet', contactmail)
  // }

  // handleUpdateGroup() {
  //   this.props.clearSelectedContacts();


  //   this.props.updateGroup()
  // }

          // Contact First Name: <input className="contactfirst" type="text" />
          // Contact Last Name: <input className="contactlast" type="text" />

  render() {
    return (
      <div className="grouppanel">
        { this.props.isContactList && <h3> Contact List </h3>}
        { this.props.isContactList && <button onClick={this.willAddContact}> Add Contacts </button>}
        { this.state.addContact && <form> 
          Contact Gmail: <input className="contactmail" type="text" />
          <input type="submit" value="Submit Gmail" onClick={()=>{ this.props.addContact($('.contactmail').val()) }} />
          </form>}
        { this.props.isContactList && this.props.contacts.map((contact) => <ContactEntry contact={contact} selectContact={this.props.selectContact} selectedContacts={this.props.selectedContacts}/>) }



        { !this.props.isContactList && <h3> All Group List </h3>}
        { !this.props.isContactList && 
          <button onClick={this.willAddGroup}> Add Groups </button> }
        { this.state.addGroup && <form> 
          Group Name: <input className="groupname" type="text" />
          <input type="submit" value="Submit Group Name" onClick={()=>{ this.handleAddGroup($('.groupname').val())}}/>
          </form>}
        { !this.props.isContactList && this.props.groups.map((group) => <GroupPanelEntry group={group} selectContact={this.props.selectContact} selectGroup={this.props.selectGroup} updateGroup={this.props.updateGroup} removeContactFromGroup={this.props.removeContactFromGroup}/>)}
      </div>

    );
  }
}

//need a .map function to render multiple entries

export default GroupPanel;