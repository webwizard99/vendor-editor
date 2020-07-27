import React from 'react';
import './DisplayForm.css';

class DisplayForm extends React.Component {
  constructor(props) {
    super(props);

    this.getForm = this.getForm.bind(this);
    this.getHeading = this.getHeading.bind(this);
  }

  getForm() {
    return '';
  }

  getHeading() {
    return '';
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