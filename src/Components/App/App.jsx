import React from 'react';
import './reset.css';
import './App.css';

import MenuBar from '../MenuBar/MenuBar';
import ObjectListColumn from '../ObjectListColumn/ObjectListColumn';
import DetailView from '../DetailView/DetailView';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getApp = this.getApp.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  getApp() {
    if (!this.props.dialogActive) {
      return (
        <div className="AppContainer">
          <ObjectListColumn />
          <DetailView />
        </div>
      );
    } 
  }

  render() {
    return (
      <div className="App">
        <MenuBar />
        {this.getApp()}
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
