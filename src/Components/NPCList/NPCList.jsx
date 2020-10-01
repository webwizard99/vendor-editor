import React from 'react';
import './NPCList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import BehaviorList from '../BehaviorList/BehaviorList';
import AdventurerList from '../AdventurerList/AdventurerList';

class NPCList extends ExpandableList {
  getTitle() {
    return 'NPCs';
  }

  displayContents() {
    return (
      <div className="detailList">
        <BehaviorList />
        <AdventurerList />
      </div>
    )
  }
}

export default NPCList;