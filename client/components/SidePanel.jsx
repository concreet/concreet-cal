import React from 'react';
import GroupPanel from './GroupPanel.jsx';
import ContactEntry from './ContactEntry.jsx';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    // console.log('Props in constructor: ', props);
    this.state = {
      // showSubmit: false

    }
    //binding functions here
  }

  // showSubmit() {
  //   this.setState({
  //     showSubmit: true
  //   })
  // }
        // {this.props.contacts.map(contact => <ContactEntry contact={contact} selectContact={this.props.selectContact}/>)}
        // { this.props.contacts.map((contact) => <ContactEntry contact={contact} selectContact={this.props.selectContact}/>) }
  render() {

    return (
      <div className="sidepanel">
        <a href="/" className="logo">
          <img className="miniLogo" src={"/images/logo.png"} />
        </a>
        <GroupPanel isContactList="true" contacts={this.props.contacts} selectContact={this.props.selectContact} addContact={this.props.addContact} selectedContacts={this.props.selectedContacts}/>
        <GroupPanel groups={this.props.groups} selectContact={this.props.selectContact} selectGroup={this.props.selectGroup} addGroup={this.props.addGroup} updateGroup={this.props.updateGroup} removeContactFromGroup={this.props.removeContactFromGroup} resetSide={this.props.resetSide}/>
      </div>

    );
  }
}

export default SidePanel;