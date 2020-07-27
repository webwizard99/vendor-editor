// import React from 'react';
import './PotionDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';

import { connect } from 'react-redux';

class PotionDisplay extends DisplayStatic {
  getDisplay() {
    const allPotions = this.props.potions;
    const thisPotion = allPotions.find(potion => potion.id === this.props.displayId);
    const name = thisPotion.item.name;
    const value = thisPotion.item.value;
    const details = thisPotion.item.details;
    const potionType = thisPotion.type;
    const level = thisPotion.level;
    
    return (
      <div className="PotionDisplay">
        <h2 className="display-heading">{name}</h2>
        <div className="display-fields-area">
          <div className="display-group">
            <span className="display-label">Name</span>
            <span className="display-text">{name}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Value</span>
            <span className="display-number">{value}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Details</span>
            <span className="display-text">{details}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Type</span>
            <span className="display-text">{potionType}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Level</span>
            <span className="display-number">{level}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    potions: state.potions.potions,
    displayId: state.detail.targetId
  }
}

export default connect(mapStateToProps)(PotionDisplay);