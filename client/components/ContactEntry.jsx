import React from 'react';

class ContactEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false

    }
  }

  handleOnClick(){
    if (!this.props.groupPanelCheck) {
      this.props.selectContact(this.props.contact, true);
      this.setState({
        clicked: !this.state.clicked
      })
    } else {
      return;
    }
  }
    
  render() {

    return (
      <div className="contactentry">
        { this.props.contact.isSignedUp && !this.props.groupPanelCheck && 
          <div onClick={this.handleOnClick.bind(this)}>
            { this.state.clicked && <p style={{cursor: 'pointer'}}> <i className="fa fa-check-square-o" aria-hidden="true"></i> {this.props.contact.emailAddress} </p> }
            { !this.state.clicked && <p style={{cursor: 'pointer'}}> <i className="fa fa-square-o" aria-hidden="true"></i> {this.props.contact.emailAddress} </p>}
          </div> 
        }

      { !this.props.contact.isSignedUp && 
        <div>
          <p className="contactNotSignedUp"> {this.props.contact.emailAddress} </p>
        </div>
      }

      { this.props.groupPanelCheck && 
        <div>
          <p className="contactInGroup"> {this.props.contact.emailAddress} </p>
        </div>
      }         
      </div>
    );
  }
}

export default ContactEntry;