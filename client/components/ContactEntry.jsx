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
    this.props.selectContact(this.props.contact);
    this.setState({
      clicked: !this.state.clicked
    })
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
        <div onClick={this.handleOnClick.bind(this)}>
          { this.state.clicked && <p>&#10004; Email: {this.props.contact.emailAddress} </p> }
          { !this.state.clicked && <p> Email: {this.props.contact.emailAddress} </p>}
        </div>
      </div>

    );
  }
}

export default ContactEntry;