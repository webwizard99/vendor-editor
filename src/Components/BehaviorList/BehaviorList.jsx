import React from 'react';
import './BehaviorList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import TownBehaviorList from '../TownBehaviorList/TownBehaviorList';
import DungeonBehaviorList from '../DungeonBehaviorList/DungeonBehaviorList';

class BehaviorList extends ExpandableList {
  getTitle() {
    return 'Behaviors';
  }

  displayContents() {
    return (
      <div className="detailList">
        <TownBehaviorList />
        <DungeonBehaviorList />
      </div>
    )
  }
}

export default BehaviorList;