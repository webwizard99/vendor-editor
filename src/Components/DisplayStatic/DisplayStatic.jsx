import React from 'react';
import './DisplayStatic.css';

class DisplayStatic extends React.Component {
  constructor(props) {
    super(props);

    this.getDisplay = this.getDisplay.bind(this);
    this.getHeading = this.getHeading.bind(this);
  }

  getDisplay() {
    return '';
  }

  getHeading() {
    return '';
  }
  
  render() {
    return (
      <div className="DisplayStatic">
        {this.getDisplay()}
      </div>
    )
  }
}

export default DisplayStatic;

