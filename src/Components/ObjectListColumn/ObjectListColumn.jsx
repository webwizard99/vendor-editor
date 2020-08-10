import React from 'react';
import './ObjectListColumn.css';

// component imports
import ItemList from '../ItemList/ItemList';

// redux imports
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ObjectListColumn extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.props.fetchPotions();
  }

  render() {
    return (
      <div className="ObjectListColumn">
        <ItemList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    potions: state.potions.potions,
    dialogActive: state.dialog.active
  }
}

export default connect(mapStateToProps, actions)(ObjectListColumn);