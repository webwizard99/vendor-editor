import React from 'react';
import './ObjectListColumn.css';

// component imports
import ItemList from '../ItemList/ItemList';
import SupplierList from '../SupplierList/SupplierList';

// redux imports
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ObjectListColumn extends React.Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.dialogActive & !nextProps.dialogActive) {
      return true;
    }
  }


  render() {
    return (
      <div className="ObjectListColumn">
        <ItemList />
        <SupplierList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dialogActive: state.dialog.active
  }
}

export default connect(mapStateToProps, actions)(ObjectListColumn);