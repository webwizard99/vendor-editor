import React from 'react';
import './ItemList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import PotionList from '../PotionsList/PotionsList';
import WeaponList from '../WeaponsList/WeaponsList';

class ItemList extends ExpandableList {
  getTitle() {
    return 'Items'
  }

  displayContents() {
   return (
     <div className="detailList">
       <PotionList />
       <WeaponList />
     </div>
   ) 
  }
}

export default ItemList;