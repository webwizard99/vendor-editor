import React from 'react';
import './DialogBox.css';

import { connect } from 'react-redux';
import { SET_DIALOG } from '../../actions/types';

class DialogBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleNo = this.handleNo.bind(this);
    this.handleYes = this.handleYes.bind(this);
  }
  
  handleNo(e) {
    const clicked = e.target.classList;
    if (clicked.contains('DialogBoxContainer') || clicked.contains('dialog-no-btn')) {
      this.props.setDialog({ active: false, text: '', ref: null, yesCallback: null, noCallback: null })
    }
  }

  handleYes() {
    console.log(window.dialogRef);
    window.dialogRef.handleYes();
  }
  
  render() {
    return (
      <div className="DialogBoxContainer" 
        onClick={this.handleNo}>
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
    text: state.dialog.text,
    ref: state.dialog.ref,
    yesCallback: state.dialog.yesCallback
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDialog: payload => dispatch({ type: SET_DIALOG, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogBox);