import React from 'react';
import './DungeonBehaviorDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchDungeonBehaviors } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js utility imports

class DungeonBehaviorDisplay extends DisplayStatic {
  getDeleteButton() {
    return (
      <div className="DeleteDungeonBehaviorButton">
        <DeleteButton />
      </div>
    )
  }

  getDisplay() {
    const allDungeonBehaviors = this.props.dungeonBehaviors;
    const thisDungeonBehavior = allDungeonBehaviors.find(dungeonBehavior => dungeonBehavior.id === this.props.displayId);
    const {
      name,
      advance_tile,
      conserve_health,
      use_potion,
      return_to_town,
      check_for_traps,
      search_for_treasure,
      fight_monster,
      flee_encounter,
      explore_level,
      advance_next_level,
      fight_boss_monster,
      try_for_level
    } = thisDungeonBehavior;

    return (
      <div className="DungeonBehaviorDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="DungeonBehaviorEditButton" onClick={() => this.props.setDisplayForm({ form: 'dungeon_behavior', edit: true, targetId: thisDungeonBehavior.id })}>
            <EditButton />
          </div>
        </div>
        <div className="display-fields-area">
          <div className="display-group">
              <span className="display-label">Name</span>
              <span className="display-text">{name}</span>
          </div>
          <div className="display-group">
            <span className="display-label">advance tile</span>
            <span className="display-text">{advance_tile}</span>
          </div>
          <div className="display-group">
            <span className="display-label">conserve health</span>
            <span className="display-text">{conserve_health}</span>
          </div>
          <div className="display-group">
            <span className="display-label">use potion</span>
            <span className="display-text">{use_potion}</span>
          </div>
          <div className="display-group">
            <span className="display-label">return to town</span>
            <span className="display-text">{return_to_town}</span>
          </div>
          <div className="display-group">
            <span className="display-label">check for traps</span>
            <span className="display-text">{check_for_traps}</span>
          </div>
          <div className="display-group">
            <span className="display-label">search for treasure</span>
            <span className="display-text">{search_for_treasure}</span>
          </div>
          <div className="display-group">
            <span className="display-label">fight monster</span>
            <span className="display-text">{fight_monster}</span>
          </div>
          <div className="display-group">
            <span className="display-label">flee encounter</span>
            <span className="display-text">{flee_encounter}</span>
          </div>
          <div className="display-group">
            <span className="display-label">explore level</span>
            <span className="display-text">{explore_level}</span>
          </div>
          <div className="display-group">
            <span className="display-label">advance next level</span>
            <span className="display-text">{advance_next_level}</span>
          </div>
          <div className="display-group">
            <span className="display-label">fight boss monster</span>
            <span className="display-text">{fight_boss_monster}</span>
          </div>
          <div className="display-group">
            <span className="display-label">try for level</span>
            <span className="display-text">{try_for_level}</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dungeonBehaviors: state.behaviors.dungeonBehaviors,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchDungeonBehaviors: () => dispatch(fetchDungeonBehaviors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonBehaviorDisplay);