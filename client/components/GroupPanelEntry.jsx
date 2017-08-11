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
    console.log('triggered?')
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleSelectGroup() {
    this.props.selectGroup(this.props.group);
    console.log('here?')
    this.setState({
      showSelect: !this.state.showSelect
    });
  }

  handleUpdateGroup() {
    this.props.updateGroup(this.props.group);

  }

  handleRemoveContactFromGroup() {
    this.props.removeContactFromGroup(this.props.group);
    //console.log('this ran?')
  }

  render() {

    return (
      <div className="grouppanelentry">
        <div>
          <button onClick={this.handleUpdateGroup.bind(this)}> 
            Add Contacts to {this.props.group.group_name}
          </button>
           <button onClick={this.handleRemoveContactFromGroup.bind(this)}> 
            Remove Contacts from {this.props.group.group_name}
          </button>

          <div>
            {this.state.showSelect && <p> <p style={{display: 'inline'}} onClick={this.handleSelectGroup.bind(this)}> <i className="fa fa-check-square-o" aria-hidden="true"></i> Group: {this.props.group.group_name} </p> 
              { this.state.clicked && <button className="showbutton" onClick={this.handleOnClick.bind(this)}> <i className="fa fa-window-minimize" aria-hidden="true"></i> </button> }
              { !this.state.clicked && <button className="showbutton" onClick={this.handleOnClick.bind(this)}> <i className="fa fa-window-maximize" aria-hidden="true"></i> </button> }  

            </p>} 

            {!this.state.showSelect && <p> <p style={{display: 'inline'}} onClick={this.handleSelectGroup.bind(this)}> <i className="fa fa-square-o" aria-hidden="true"></i> Group: {this.props.group.group_name} </p> 
              { this.state.clicked && <button className="showbutton" onClick={this.handleOnClick.bind(this)}> <i className="fa fa-window-minimize" aria-hidden="true"></i> </button> }
              { !this.state.clicked && <button className="showbutton" onClick={this.handleOnClick.bind(this)}> <i className="fa fa-window-maximize" aria-hidden="true"></i> </button> } 
            </p>}
          </div>

        </div>
        { this.state.clicked && this.props.group.contacts.map((contact) => <ContactEntry groupPanelCheck="correct" contact={contact} selectContact={this.props.selectContact}/>) }  
      </div>

    );
  }
}

export default GroupPanelEntry;