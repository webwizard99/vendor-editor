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
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <MenuBar />
        <div className="AppContainer">
          <ObjectListColumn />
          <DetailView />
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(App);
