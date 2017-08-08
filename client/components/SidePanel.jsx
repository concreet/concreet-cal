import React from 'react';
import GroupPanel from './GroupPanel.jsx';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //binding functions here
  }

  render() {
    return (
      <div className="sidepanel">
        Proof of side panel
        <ContactEntry />
        <GroupPanel />
      </div>

    );
  }
}

export default SidePanel;