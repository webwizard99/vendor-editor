import React from 'react';
import './DialogBox.css';

import { connect } from 'react-redux';

class DialogBox extends React.Component {
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