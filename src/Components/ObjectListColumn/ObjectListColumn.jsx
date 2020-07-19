import React from 'react';
import './ObjectListColumn.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';

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
    if (this.props.potions) {
      console.log(this.props.potions);
    } else {
      console.log('potions not yet fetched!');
    }
    return (
      <div className="ObjectListColumn">
        ObjectListColumn
        <ExpandableList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    potions: state.potions.potions
  }
}

export default connect(mapStateToProps, actions)(ObjectListColumn);