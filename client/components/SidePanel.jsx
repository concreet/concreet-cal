import React from 'react';
import GroupPanel from './GroupPanel.jsx';
import ContactEntry from './ContactEntry.jsx';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <div className="sidepanel">
        <a href="/" className="logo">
          <img className="miniLogo" src={"/images/logo.png"} />
        </a>
        <GroupPanel isContactList="true" contacts={this.props.contacts} selectContact={this.props.selectContact} addContact={this.props.addContact} selectedContacts={this.props.selectedContacts} contactGroup={this.props.contactGroup} removeContactFromGroup={this.props.removeContactFromGroup} clearSelectedContacts={this.props.clearSelectedContacts}/>
        <GroupPanel groups={this.props.groups} selectContact={this.props.selectContact} selectGroup={this.props.selectGroup} addGroup={this.props.addGroup} updateGroup={this.props.updateGroup} removeContactFromGroup={this.props.removeContactFromGroup} resetSide={this.props.resetSide}/>

      </div>

    );
  }
}

export default SidePanel;