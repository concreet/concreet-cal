import React from 'react';
import SidePanel from './SidePanel.jsx';
import BigCalBasic from './BigCalBasic.jsx';
import AddEvent from './AddEvent.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: [],
      selectedContacts: [],
      allGroups: [
      { owner_id: 1, group_name: 'test', isContactList: false, contacts: [{firstName: 'Hi', lastName: 'There', googleId: '2sfiewasdfors', emailAddress: 'hithere@gmail.com', isSignedUp: true}] },
      { owner_id: 1, group_name: 'test2', isContactList: false, contacts: [{firstName: 'Hii', lastName: 'Theree', googleId: '14sfiewfdsfors', emailAddress: 'hithere2@gmail.com', isSignedUp: true}] }, 
      { owner_id: 1, group_name: 'test3', isContactList: false, contacts: [{firstName: 'Hiii', lastName: 'Thereeee', googleId: '59sfiewodfsrs', emailAddress: 'hithere3@gmail.com', isSignedUp: true}] }
      ],
      allContacts: [
      { owner_id: 1, group_name: 'test1111', isContactList: true, contacts: [
        {firstName: 'Hi', lastName: 'There', googleId: '2sfiewasdfors', emailAddress: 'hithere@gmail.com', isSignedUp: true},
        {firstName: 'Hiii', lastName: 'Thereeee', googleId: '59sfiewodfsrs', emailAddress: 'hithere3@gmail.com', isSignedUp: true},
        {firstName: 'Hiii', lastName: 'Thereeee', googleId: '59sfiewodfsrs', emailAddress: 'hithere3@gmail.com', isSignedUp: true}
      ] }
      ]
    }
    //binding functions here\
    this.handleSelectedGroup = this.handleSelectedGroup.bind(this);
    this.handleSelectedContacts = this.handleSelectedContacts.bind(this);
  }



  // componentDidMount() {
  //   //make ajax calls to server to retrieve all these data from database
  //   //make use of props.
  //   //console.log(this.state.allContacts[0].contacts)
  // }

  handleSelectedGroup(group) {
    // this.setState({
    //   selectedGroup: 
    // })
  }

  handleSelectedContacts(contact) {
    console.log(this.state.selectedContacts, 'the array before ');
    //console.log(contact,'this is the contact');
    if (this.state.selectedContacts.indexOf(contact) === -1) {
      var love = this.state.selectedContacts.slice();
      love.push(contact);
      // console.log(love, 'what is love?')
      this.setState({
        selectedContacts: love
      })
    } else {
      // console.log('was here?');
      var baby = this.state.selectedContacts.slice();
      baby.splice(baby.indexOf(contact), 1);

      this.setState({
        selectedContacts: baby
      })
    }
    setTimeout(()=> {console.log(this.state.selectedContacts, 'new one');})

  }

  render() {
    return (
      <div className="dashboard">
        Proof of dashboard
        <SidePanel/>
        <BigCalBasic user={this.props.user}/>
        <SidePanel contacts={this.state.allContacts[0].contacts} groups={this.state.allGroups} selectContact={this.handleSelectedContacts} />

      </div>

    );
  }
}

export default Dashboard;
