import React from 'react';
import './DungeonList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import DungeonTileList from '../DungeonTileList/DungeonTileList';
import TreasureDropListList from '../TreasureDropListList/TreasureDropListList';

class DungeonList extends ExpandableList {
  getTitle() {
    return 'Dungeon';
  }

  displayContents() {
    return (
      <div className="detailList">
        <DungeonTileList />
        <TreasureDropListList />
      </div>
    )
  }
}

export default DungeonList;