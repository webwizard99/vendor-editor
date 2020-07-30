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
  
  handleNo() {
    this.props.setDialog({ active: false, text: '', ref: null, yesCallback: null, noCallback: null })
  }

  handleYes() {
    //this.props.ref[this.props.yesCallback()];
  }
  
  render() {
    return (
      <div className="DialogBoxContainer" 
        onClick={() => this.props.setDialog({ active: false, text: '', ref: null, yesCallback: null, noCallback: null })}>
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

const mapDispatchToProps = dispatch => {
  return {
    setDialog: payload => dispatch({ type: SET_DIALOG, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogBox);