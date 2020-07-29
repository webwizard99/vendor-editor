import React from 'react';
import './DialogBox.css';

import { connect } from 'react-redux';

class DialogBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleNo = this.handleNo.bind(this);
    this.handleYes = this.handleYes.bind(this);
  }
  
  handleNo() {

  }

  handleYes() {
    
  }
  
  render() {
    return (
      <div className="DialogBoxContainer">
        <div className="DialogBox">
          <div className="dialog-heading-bar">
            <h2 className="dialog-heading">Confirm Choice</h2>
          </div>
          <div className="dialog-prompt">
            {this.props.text}
          </div>
          <div className="dialog-button-bar">
            <button className="dialog-no-btn" onClick={this.handleNo}>
              NO
            </button>
            <button className="dialog-yes-btn" onClick={this.handleYes}>
              YES
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    text: state.dialog.text
  }
}

export default connect(mapStateToProps)(DialogBox);