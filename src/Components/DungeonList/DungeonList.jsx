import React from 'react';
import './DungeonList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import DungeonTileList from '../DungeonTileList/DungeonTileList';
import TreasureDropListList from '../TreasureDropListList/TreasureDropListList';
import LevelList from '../LevelList/LevelList';

class DungeonList extends ExpandableList {
  getTitle() {
    return 'Dungeon';
  }

  displayContents() {
    return (
      <div className="detailList">
        <DungeonTileList />
        <TreasureDropListList />
        <LevelList />
      </div>
    )
  }
}

export default DungeonList;