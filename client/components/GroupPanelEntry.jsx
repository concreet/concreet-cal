import React from 'react';
import ContactEntry from './ContactEntry.jsx';

class GroupPanelEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      showSelect: false
    }
    //binding functions here
  }

  handleOnClick() {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleSelectGroup() {
    this.props.selectGroup(this.props.group);
    this.setState({
      showSelect: !this.state.showSelect
    });
  }

  handleUpdateGroup() {
    this.props.updateGroup(this.props.group);

  }

  handleRemoveContactFromGroup() {
    this.props.removeContactFromGroup(this.props.group);
  }

  handleDeleteGroup() {
    this.props.deleteGroup(this.props.group);
  }

  render() {

    return (
      <div className="grouppanelentry">

        { this.state.showSelect && <div className="groupname"> 
          <p style={{display: 'inline', cursor: 'pointer'}} onClick={this.handleSelectGroup.bind(this)}> <i className="fa fa-check-square-o" aria-hidden="true"></i> Group: {this.props.group.group_name} </p> 
          <button className="addremovecontact" onClick={this.handleUpdateGroup.bind(this)}> 
            Add <i className="fa fa-user-o" aria-hidden="true"></i>
          </button>
           <button className="addremovecontact" onClick={this.handleRemoveContactFromGroup.bind(this)}> 
            Remove <i className="fa fa-user-o" aria-hidden="true"></i>
          </button>
          <button className="deleteGroup" onClick={this.handleDeleteGroup.bind(this)}>
            - Group
          </button>

          { this.state.clicked && <button className="showbutton" onClick={this.handleOnClick.bind(this)}> <i className="fa fa-window-minimize" aria-hidden="true"></i> </button> }
          { !this.state.clicked && <button className="showbutton" onClick={this.handleOnClick.bind(this)}> <i className="fa fa-window-maximize" aria-hidden="true"></i> </button> }  

        </div> }  

        {!this.state.showSelect && <div className="groupname"> 

          <p style={{display: 'inline', cursor: 'pointer'}} onClick={this.handleSelectGroup.bind(this)}> <i className="fa fa-square-o" aria-hidden="true"></i> Group: {this.props.group.group_name} </p> 
          <button className="addremovecontact" onClick={this.handleUpdateGroup.bind(this)}> 
            Add <i className="fa fa-user-o" aria-hidden="true"></i>
          </button>
           <button className="addremovecontact" onClick={this.handleRemoveContactFromGroup.bind(this)}> 
            Remove <i className="fa fa-user-o" aria-hidden="true"></i>
          </button>
          <button className="deleteGroup" onClick={this.handleDeleteGroup.bind(this)}>
            - Group
          </button>
          { this.state.clicked && <button className="showbutton" onClick={this.handleOnClick.bind(this)}> <i className="fa fa-window-minimize" aria-hidden="true"></i> </button> }
          { !this.state.clicked && <button className="showbutton" onClick={this.handleOnClick.bind(this)}> <i className="fa fa-window-maximize" aria-hidden="true"></i> </button> } 
        </div> }

        { this.state.clicked && this.props.group.contacts.map((contact) => <ContactEntry groupPanelCheck="correct" contact={contact} selectContact={this.props.selectContact}/>) }  
      </div>

    );
  }
}

export default GroupPanelEntry;