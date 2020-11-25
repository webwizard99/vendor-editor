import React from 'react';
import './DungeonList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';

class DungeonList extends ExpandableList {
  getTitle() {
    return 'Dungeon';
  }

  displayContents() {
    return (
      <div className="detailList">
        DungeonList
      </div>
    )
  }
}

export default DungeonList;