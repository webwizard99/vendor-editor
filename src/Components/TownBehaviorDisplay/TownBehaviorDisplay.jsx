import React from 'react';
import './TownBehaviorDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchTownBehaviors } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js utility imports

class TownBehaviorDisplay extends DisplayStatic {

  getDeleteButton() {
    return (
      <div className="DeleteTownBehaviorButton">
        <DeleteButton />
      </div>
    )
  }

  getDisplay() {
    const allTownBehaviors = this.props.townBehaviors;
    const thisTownBehavior = allTownBehaviors.find(townBehavior => townBehavior.id === this.props.displayId);
    const { name,
      buy_potion,
      sell_potion,
      upgrade_potion,
      buy_weapon,
      sell_weapon,
      upgrade_weapon,
      buy_armor,
      sell_armor,
      upgrade_armor,
      wealth,
      enter_dungeon,
      use_tavern,
      retire,
      emigrate,
      garrison_wall
    } = thisTownBehavior;

    return (
      <div className="TownBehaviorDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="TownBehaviorEditButton" onClick={() => this.props.setDisplayForm({ form: 'town_behavior', edit: true, targetId: thisTownBehavior.id })}>
            <EditButton />
          </div>
        </div>
        <div className="display-fields-area">
        <div className="display-group">
            <span className="display-label">Name</span>
            <span className="display-text">{name}</span>
          </div>
        </div>
        <div className="display-group">
          <span className="display-label">buy potion</span>
          <span className="display-text">{buy_potion}</span>
        </div>
        <div className="display-group">
          <span className="display-label">sell potion</span>
          <span className="display-text">{sell_potion}</span>
        </div>
        <div className="display-group">
          <span className="display-label">upgrade potion</span>
          <span className="display-text">{upgrade_potion}</span>
        </div>
        <div className="display-group">
          <span className="display-label">buy weapon</span>
          <span className="display-text">{buy_weapon}</span>
        </div>
        <div className="display-group">
          <span className="display-label">sell weapon</span>
          <span className="display-text">{sell_weapon}</span>
        </div>
        <div className="display-group">
          <span className="display-label">upgrade weapon</span>
          <span className="display-text">{upgrade_weapon}</span>
        </div>
        <div className="display-group">
          <span className="display-label">buy armor</span>
          <span className="display-text">{buy_armor}</span>
        </div>
        <div className="display-group">
          <span className="display-label">sell armor</span>
          <span className="display-text">{sell_armor}</span>
        </div>
        <div className="display-group">
          <span className="display-label">upgrade armor</span>
          <span className="display-text">{upgrade_armor}</span>
        </div>
        <div className="display-group">
          <span className="display-label">wealth</span>
          <span className="display-text">{wealth}</span>
        </div>
        <div className="display-group">
          <span className="display-label">enter dungeon</span>
          <span className="display-text">{enter_dungeon}</span>
        </div>
        <div className="display-group">
          <span className="display-label">use tavern</span>
          <span className="display-text">{use_tavern}</span>
        </div>
        <div className="display-group">
          <span className="display-label">retire</span>
          <span className="display-text">{retire}</span>
        </div>
        <div className="display-group">
          <span className="display-label">emigrate</span>
          <span className="display-text">{emigrate}</span>
        </div>
        <div className="display-group">
          <span className="display-label">garrison wall</span>
          <span className="display-text">{garrison_wall}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    townBehaviors: state.behaviors.townBehaviors,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchTownBehaviors: () => dispatch(fetchTownBehaviors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TownBehaviorDisplay);