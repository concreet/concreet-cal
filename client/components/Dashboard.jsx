import React from 'react';
import SidePanel from './SidePanel.jsx';
import BigCalBasic from './BigCalBasic.jsx';
import AddEvent from './AddEvent.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: [],
      selectedContacts: [
      { owner_id: 1, group_name: 'test', isContactList: true}, {}, {}
      ],
      allGroups: [],
      allContacts: []
    }
    //binding functions here\
    this.handleSelectedGroup = this.handleSelectedGroup.bind(this);
    this.handleSelectedContacts = this.handleSelectedContacts.bind(this);
  }



  componentDidMount() {
    //make ajax calls to server to retrieve all these data from database
    //make use of props.
  }

  handleSelectedGroup(group) {
    this.setState({
      selectedGroup: 
    })
  }

  handleSelectedContacts(contact) {
    if (contact.selected) {
      this.setState({
        selectedContacts: this.state.selectedContacts.push(contact);
      })
    } else {
      this.setState({
        selectedContacts: this.state.selectedContacts.splice(this.state.selectedContacts.indexOf(contact), 1);
      })
    }
  }

  render() {
    return (
      <div className="dashboard">
        Proof of dashboard
        <SidePanel/>
        <BigCalBasic user={this.props.user}/>
        <SidePanel contacts={this.state.allContacts} groups={this.state.allGroups} selectContact={this.handleSelectedContacts}/>

      </div>

    );
  }
}

export default Dashboard;
