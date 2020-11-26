import React from 'react';
import './ObjectListColumn.css';

// component imports
import ItemList from '../../Components/ItemList/ItemList';
import SupplierList from '../../Components/SupplierList/SupplierList';
import NPCList from '../../Components/NPCList/NPCList';
import MonsterList from '../../Components/MonsterList/MonsterList';
import DungeonList from '../../Components/DungeonList/DungeonList';

// redux imports
// comment to update code
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
        <NPCList />
        <MonsterList />
        <DungeonList />
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