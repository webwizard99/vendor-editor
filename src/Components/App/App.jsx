import React from 'react';
import './reset.css';
import './App.css';

import MenuBar from '../MenuBar/MenuBar';
import ObjectListColumn from '../../Containers/ObjectListColumn/ObjectListColumn';
import DetailView from '../../Containers/DetailView/DetailView';
import DialogBox from '../DialogBox/DialogBox';

// redux imports
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
