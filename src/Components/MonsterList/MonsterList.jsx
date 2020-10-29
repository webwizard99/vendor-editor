import React from 'react';
import './MonsterList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import MonsterDropListList from '../MonsterDropListList/MonsterDropListList';
import MonsterBehaviorList from '../MonsterBehaviorList/MonsterBehaviorList';

class MonsterList extends ExpandableList {
  getTitle() {
    return 'Monsters';
  }

  displayContents() {
    return (
      <div className="detailList">
        <MonsterDropListList />
        <MonsterBehaviorList />
      </div>
    )
  }
}

export default MonsterList;