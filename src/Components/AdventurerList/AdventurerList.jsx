import React from 'react';
import './AdventurerList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import AdventurerClassList from '../AdventurerClassList/AdventurerClassList';

class AdventurerList extends ExpandableList {
  getTitle() {
    return 'Adventurers';
  }

  displayContents() {
    return (
      <div className="detailList">
        <AdventurerClassList />
      </div>
    )
  }
}

export default AdventurerList;