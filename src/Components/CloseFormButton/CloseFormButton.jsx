import React from 'react';
import './CloseFormButton.css';

class CloseFormButton extends React.Component {
  render() {
    return (
      <div className="CloseFormButton">
        <p className="closeButtonIcon">X</p>
      </div>
    )
  }
}

export default CloseFormButton;