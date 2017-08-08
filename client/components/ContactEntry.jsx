import React from 'react';

class ContactEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }
    //binding functions here
  }

  handleOnClick(){
    this.props.selectContact(this.props.contact);
  }
    
  render() {


    return (
      <div className="contactentry">
       { this.props.contact && 
        <div onClick={this.handleOnClick.bind(this)}>
        <p>First Name: {this.props.contact.firstName} </p>
        <p>Last Name: {this.props.contact.lastName} </p>
        </div>
       }
      </div>

    );
  }
}

export default ContactEntry;