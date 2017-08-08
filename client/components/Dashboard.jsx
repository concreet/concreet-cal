import React from 'react';
import SidePanel from './SidePanel.jsx';
import BigCalBasic from './BigCalBasic.jsx';
import AddEvent from './AddEvent.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //binding functions here
  }

  render() {
    return (
      <div className="dashboard">
        Proof of dashboard
        <SidePanel/>
        <BigCalBasic user={this.props.user}/>
        <AddEvent/>
      </div>

    );
  }
}

export default Dashboard;
