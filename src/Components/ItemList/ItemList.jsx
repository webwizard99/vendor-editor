import React from 'react';
import './ItemList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import PotionList from '../PotionsList/PotionsList';

class ItemList extends ExpandableList {
  getTitle() {
    return 'Items'
  }

  displayContents() {
   return (
     <div className="detailList">
       <PotionList />
     </div>
   ) 
  }
}

export default ItemList;