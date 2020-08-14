import React from 'react';
import './reset.css';
import './App.css';

import MenuBar from '../MenuBar/MenuBar';
import ObjectListColumn from '../ObjectListColumn/ObjectListColumn';
import DetailView from '../DetailView/DetailView';
import DialogBox from '../DialogBox/DialogBox';
import Fetchers from '../Fetchers/Fetchers';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getDialog = this.getDialog.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  getDialog() {
    if (!this.props.dialogActive) {
      return ''
    } else {
      return <DialogBox />
    }
  }

  render() {
    return (
      <div className="App">
        <MenuBar />
        <div className="AppContainer">
          <ObjectListColumn />
          <DetailView />
        </div>
        {this.getDialog()}
        <Fetchers />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dialogActive: state.dialog.active
  }
}

export default connect(mapStateToProps, actions)(App);
