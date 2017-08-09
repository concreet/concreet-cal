import React from 'react';
import Modal from 'react-modal'
import Rodal from 'rodal'; 
import TimeSlot from './TimeSlot.jsx'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '70%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class FreeTimeSlotsModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="timeModal">
        <button onClick={this.openModal}>Open Modal</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Time Slots Modal"
        >

          <h2 className="modalTitle">Available Meeting Start Times</h2>
          {
            this.props.availableSlots.map( (slot, i) => {
              return (
                <TimeSlot key={i} slotTime={slot} closeModal={this.closeModal.bind(this)} />
              )
            })
          }
        </Modal>
      </div>
    );
  }
}

export default FreeTimeSlotsModal;