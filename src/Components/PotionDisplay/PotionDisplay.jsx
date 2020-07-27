// import React from 'react';
import './PotionDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';

import { connect } from 'react-redux';

class PotionDisplay extends DisplayStatic {
  getDisplay() {
    const allPotions = this.props.potions;
    const thisPotion = allPotions.find(potion => potion.id === this.props.displayId);
    console.log(thisPotion);
    return thisPotion.item.name;
  }
}

const mapStateToProps = state => {
  return {
    potions: state.potions.potions,
    displayId: state.detail.targetId
  }
}

export default connect(mapStateToProps)(PotionDisplay);