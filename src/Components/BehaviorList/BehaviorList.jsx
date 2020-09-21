import React from 'react';
import './BehaviorList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';

class BehaviorList extends ExpandableList {
  getTitle() {
    return 'Behaviors';
  }

  displayContents() {
    return (
      <div className="BehaviorList">

      </div>
    )
  }
}

export default BehaviorList;