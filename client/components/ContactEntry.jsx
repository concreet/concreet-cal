import React from 'react';

class ContactEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false

    }
    //binding functions here
  }

  handleOnClick(){
    // console.log(this.props.contact)
    if (!this.props.groupPanelCheck) {
      this.props.selectContact(this.props.contact, true);
      this.setState({
        clicked: !this.state.clicked
      })
    } else {
      return;
      // this.props.selectContact(this.props.contact, false);
      // this.setState({
      //   clicked: !this.state.clicked
      // })
    }
    // if (this.props.selectedContacts.indexOf(this.props.contact) !== -1) {
    //   this.setState({
    //     clicked: true
    //   })
    // } else {
    //   this.setState({
    //     clicked:false
    //   })
    // }
  }
    
  render() {

    return (
      <div className="contactentry">
        { this.props.contact.isSignedUp && 
          <div onClick={this.handleOnClick.bind(this)}>
            { this.state.clicked && <p>&#10004; Email: {this.props.contact.emailAddress} </p> }
            { !this.state.clicked && <p> Email: {this.props.contact.emailAddress} </p>}
          </div> 
        }

      { !this.props.contact.isSignedUp && 
        <div>
          <strike> Email: {this.props.contact.emailAddress} </strike>
        </div>
      }       
      </div>
    );
  }
}

export default ContactEntry;