import React from 'react';
import ContactEntry from './ContactEntry.jsx';

class GroupPanelEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
    //binding functions here
  }

  handleOnClick() {
    console.log('triggered?')
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleSelectGroup() {
    this.props.selectGroup(this.props.group)
  }

  handleUpdateGroup() {
    this.props.updateGroup(this.props.group);

  }

  handleRemoveContactFromGroup() {
    this.props.removeContactFromGroup(this.props.group);
    console.log('this ran?')
  }

  render() {
    return (
      <div className="grouppanelentry">
        <div>
        <button onClick={this.handleSelectGroup.bind(this)}> 
          Select {this.props.group.group_name}
        </button>
        <button onClick={this.handleUpdateGroup.bind(this)}> 
          Add Contacts to {this.props.group.group_name}
        </button>
         <button onClick={this.handleRemoveContactFromGroup.bind(this)}> 
          Remove Contacts from {this.props.group.group_name}
        </button>
        <div onClick={this.handleOnClick.bind(this)}>
          Group: {this.props.group.group_name}
        </div>
        </div>
        { this.state.clicked && this.props.group.contacts.map((contact) => <ContactEntry groupPanelCheck="correct" contact={contact} selectContact={this.props.selectContact}/>) }  
      </div>

    );
  }
}

export default GroupPanelEntry;