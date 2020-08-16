import React from 'react';
import './DeleteOfferingButton.css';

class DeleteOfferingButton extends React.Component {
  render() {
    return (
      <div className="DeleteOfferingButton">
        <span className="offeringButtonIcon">X</span>
      </div>
    )
  }
}

export default DeleteOfferingButton;