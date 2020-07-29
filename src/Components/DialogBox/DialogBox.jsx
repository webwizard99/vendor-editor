import React from 'react';
import './DialogBox.css';

import { connect } from 'react-redux';

class DialogBox extends React.Component {
  render() {
    return (
      <div className="DialogBoxContainer">
        <div className="DialogBox">
          <div className="dialog-heading-bar">
            <h2 className="dialog-heading">{this.props.text}</h2>
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