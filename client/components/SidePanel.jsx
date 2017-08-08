import React from 'react';
import GroupPanel from './GroupPanel.jsx';
import ContactEntry from './ContactEntry.jsx';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    console.log('Props in constructor: ', props);
    this.state = {

    }
    //binding functions here
  }
        // {this.props.contacts.map(contact => <ContactEntry contact={contact} selectContact={this.props.selectContact}/>)}
  render() {
    return (
      <div className="sidepanel">
        Proof of side panel
        {  this.props.contacts && this.props.contacts.map((contact) => <ContactEntry contact={contact} selectContact={this.props.selectContact}/>) }
        <GroupPanel />
      </div>

    );
  }
}

export default SidePanel;