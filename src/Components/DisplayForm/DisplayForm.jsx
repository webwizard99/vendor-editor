import React from 'react';
import './DisplayForm.css';

class DisplayForm extends React.Component {
  constructor(props) {
    super(props);

    this.getForm = this.getForm.bind(this);
    this.handleCloseButton = this.handleCloseButton.bind(this);
  }

  getForm() {
    return '';
  }

  handleCloseButton() {

  }
  
  render() {
    return (
      <div className="DisplayForm">
        {this.getForm()}
      </div>
    )
  }
}

export default DisplayForm;