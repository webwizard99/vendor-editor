import React from 'react';
import './ObjectListColumn.css';

import ExpandableList from '../ExpandableList/ExpandableList';

class ObjectListColumn extends React.Component {
  render() {
    return (
      <div className="ObjectListColumn">
        ObjectListColumn
        <ExpandableList />
      </div>
    )
  }
}

export default ObjectListColumn;