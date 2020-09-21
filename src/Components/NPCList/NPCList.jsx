import React from 'react';
import './NPCList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import BehaviorList from '../BehaviorList/BehaviorList';

class NPCList extends ExpandableList {
  getTitle() {
    return 'NPCs';
  }

  displayContents() {
    return (
      <div className="NPCList">
        <BehaviorList />
      </div>
    )
  }
}

export default NPCList;