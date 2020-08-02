import React from 'react';
import './DisplayStatic.css';

class DisplayStatic extends React.Component {
  constructor(props) {
    super(props);

    this.getDisplay = this.getDisplay.bind(this);
    this.getDeleteButton = this.getDeleteButton.bind(this);
    this.handleYes = this.handleYes.bind(this);
  }

  getDisplay() {
    return '';
  }

  getDeleteButton() {
    return '';
  }

  handleYes() {

  }
  
  render() {
    return (
      <div className="DisplayStatic">
        {this.getDisplay()}
        {this.getDeleteButton()}
      </div>
    )
  }
}

export default DisplayStatic;

