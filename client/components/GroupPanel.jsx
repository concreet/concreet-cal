import React from 'react';
import GroupPanelEntry from './GroupPanelEntry.jsx';

class GroupPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //binding functions here
  }

  render() {
    return (
      <div className="grouppanel">
        Proof of group panel
        <GroupPanelEntry />
      </div>

    );
  }
}

//need a .map function to render multiple entries

export default GroupPanel;