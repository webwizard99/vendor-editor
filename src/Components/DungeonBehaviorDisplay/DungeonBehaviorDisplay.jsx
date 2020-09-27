import React from 'react';
import './DungeonBehaviorDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchDungeonBehaviors } from '../../actions';
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports
import deleteRequests from '../../utilities/deleteRequests';

class DungeonBehaviorDisplay extends DisplayStatic {
  constructor(props) {
    super(props);

    this.deleteDungeonBehavior = this.deleteDungeonBehavior.bind(this);
  }
  
  getDeleteButton() {
    const thisRef = this;
    window.dialogRef = thisRef;
    return (
      <div className="DeleteDungeonBehaviorButton"
        onClick={() => this.props.setDialog({
          active: true,
          text: 'Delete Dungeon Behavior from Database?'
        })}>
        <DeleteButton />
      </div>
    )
  }

  *deleteDungeonBehavior() {
    yield deleteRequests.makeRequest('dungeon_behavior', this.props.displayId);
  }

  handleYes() {
    const deleteDungeonBehavior = this.deleteDungeonBehavior();
    deleteDungeonBehavior.next().value.then(() => {
      this.props.fetchDungeonBehaviors();
      this.props.setDialog({ active: false, text: '' });
      this.props.setDisplayForm({ form: false, edit: false, targetId: null });
    })
  }

  getDisplay() {
    const allDungeonBehaviors = this.props.dungeonBehaviors;
    const thisDungeonBehavior = allDungeonBehaviors.find(dungeonBehavior => dungeonBehavior.id === this.props.displayId);
    const {
      name,
      advance_tile,
      conserve_health,
      use_potion,
      rest,
      return_to_town,
      check_for_traps,
      disarm_trap,
      avoid_trap,
      search_for_treasure,
      fight_monster,
      flee_encounter,
      defend,
      attack,
      check_monster_weakness,
      explore_level,
      advance_next_level,
      fill_inventory,
      upgrade_inventory,
      fight_boss_monster,
      prefer_weaker_monster,
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
            <span className="display-label">rest</span>
            <span className="display-text">{rest}</span>
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
            <span className="display-label">disarm trap</span>
            <span className="display-text">{disarm_trap}</span>
          </div>
          <div className="display-group">
            <span className="display-label">avoid trap</span>
            <span className="display-text">{avoid_trap}</span>
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
            <span className="display-label">defend</span>
            <span className="display-text">{defend}</span>
          </div>
          <div className="display-group">
            <span className="display-label">attack</span>
            <span className="display-text">{attack}</span>
          </div>
          <div className="display-group">
            <span className="display-label">check monster weakness</span>
            <span className="display-text">{check_monster_weakness}</span>
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
            <span className="display-label">fill inventory</span>
            <span className="display-text">{fill_inventory}</span>
          </div>
          <div className="display-group">
            <span className="display-label">upgrade inventory</span>
            <span className="display-text">{upgrade_inventory}</span>
          </div>
          <div className="display-group">
            <span className="display-label">fight boss monster</span>
            <span className="display-text">{fight_boss_monster}</span>
          </div>
          <div className="display-group">
            <span className="display-label">prefer weaker monster</span>
            <span className="display-text">{prefer_weaker_monster}</span>
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
    fetchDungeonBehaviors: () => dispatch(fetchDungeonBehaviors()),
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonBehaviorDisplay);