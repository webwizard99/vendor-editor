import React from 'react';
import './LevelDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchLevels, loadLevelDetails } from '../../actions';
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';
import boolean from '../../utilities/boolean';
import deleteRequests from '../../utilities/deleteRequests';

class LevelDisplay extends DisplayStatic {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false
    }

    this.setIntialized = this.setIntialized.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.deleteLevel = this.deleteLevel.bind(this);
    this.getMonstersInRange = this.getMonstersInRange.bind(this);
    this.getTileAssignments = this.getTileAssignments.bind(this);
  }

  componentDidMount() {
    if (!this.props.dungeonTiles || !this.props.treasureDropLists || !this.props.monsters) {
      this.props.loadLevelDetails();
      this.setIntialized(true);
    } else {
      if (!this.state.initialized) {
        this.setIntialized(true);
      }
    }
  }

  componentDidUpdate() {
    if (!this.state.initialized && (this.props.dungeonTiles && this.props.treasureDropLists && this.props.monsters)) {
      this.setIntialized(true);
    }
  }

  setIntialized(val) {
    this.setState({ initialized: val });
  }

  getDeleteButton() {
    const thisRef = this;
    window.dialogRef = thisRef;
    return (
      <div className="DeleteLevelButton"
        onClick={() => this.props.setDialog({
          active: true,
          text: 'Delete Level and Tile Assignments from Database?'
        })}>
        <DeleteButton />
      </div>
    );
  }

  *deleteLevel(payload) {
    yield deleteRequests.makeRequestLevel(payload);
  }

  handleYes() {
    // compose payload for delete request
    let payload = {};
    payload.route = 'level';
    payload.id = this.props.displayId;
    const allLevels = this.props.levels;
    const thisLevel = allLevels.find(level => level.id === this.props.displayId);
    const assignments = thisLevel.tile_assignments;
    let assignementIds = [];
    if (assignements && assignments.length > 0) {
      assignments.forEach(assignment => {
        assignementIds.push(assignment.id);
      });
    }
    payload.assignmentIds = assignementIds;

    // invoke delete request
    let deleteLevel = this.deleteLevel(payload);
    deleteLevel.next().value.then(() => {
      this.props.fetchLevels();
      this.props.setDialog({ active: false, text: '' });
      this.props.setDisplayForm({ form: false, edit: false, targetId: null });
    });
  }

  getTileAssignments() {
    const allLevels = this.props.levels;
    const thisLevel = allLevels.find(level => level.id === this.props.displayId);
    const tileAssignments = thisLevel.tile_assignments;
    const allTiles = this.props.dungeonTiles;

    return (
      <div className="tile-assignment-display subgroup-display">
        <span className="display-label full-span">Tile Assignments</span>
        <span className="display-label pad half-span">Tile</span>
        <span className="display-label pad half-span">Probability</span>
        { tileAssignments.map(tileAssignment => {
          const thisTile = allTiles.find(tile => tile.id === tileAssignment.tileId);
          return (
            <div className="inner-span">
              <span className="display-text half-span left-half">
                {thisTile.name}
              </span>
              <span className="display-text half-span right-half">
                {tileAssignment.probability}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  getMonstersInRange(payload) {
    let { min, max, monsters } = payload;
    if (!this.props.monsters) return '';
    if (typeof min !== 'number') {
      min = Number.parseInt(min);
    }
    if (typeof max !== 'number') {
      max = Number.parseInt(max);
    }
    let validMonsters = monsters.filter(monster => {
      let monsterLevel = monster.level;
      if (typeof monsterLevel !== 'number') {
        monsterLevel = Number.parseInt(monsterLevel);
      }
      return (monsterLevel >= min && monsterLevel <= max);
    });
    return (
      <div className="monster-valid-display subgroup-display">
        <span className="display-label full-span">Monsters</span>
        <span className="display-label pad half-span">Name</span>
        <span className="display-label pad half-span">Level</span>
        {!validMonsters ? '' : validMonsters.map(monster => {
          return (
            <div className="inner-span">
              <span className="display-text half-span left-half">
                {monster.name}
              </span>
              <span className="display-text half-span right-half">
                {monster.level}
              </span>
            </div>
          )
        })}
      </div>
    )
    
  }

  getDisplay() {
    if (!this.props.levels || !this.state.initialized) return '';
    const allLevels = this.props.levels;
    const thisLevel = allLevels.find(level => level.id === this.props.displayId);
    const {
      number,
      dropListId,
      boss,
      boss_id,
      monsters_min_level,
      monsters_max_level
    } = thisLevel;
    const allTreasureDropLists = this.props.treasureDropLists;
    const thisDropList = allTreasureDropLists.find(dropList => dropList.id === dropListId);
    const treasureDropListName = thisDropList.treasure_drop_list.name;
    const allMonsters = this.props.monsters;
    let thisBoss = null;
    if (boss && boss_id !== null) {
      thisBoss = allMonsters.find(monster => monster.id === boss_id);
    }
    let thisBossName;
    if (thisBoss) {
      thisBossName = thisBoss.name;
    } else {
      thisBossName = '';
    }
    
    return (
      <div className="LevelDisplay extended">
        <div className="heading-bar">
          <h2 className="display-heading">Level {number}</h2>
          <div className="LevelEditButton" onClick={() => this.props.setDisplayForm({ form: formTypes.level, edit: true, targetId: thisLevel.id })}>
            <EditButton />
          </div>
        </div>
        <div className="display-fields-area">
          <div className="display-group">
            <span className="display-label">boss</span>
            <span className="display-text">{boolean.displayBooloean(boss)}</span>
          </div>
          <div className="display-group">
            <span className="display-label">boss info</span>
            <span className="display-text">{thisBossName}</span>
          </div>
          <div className="display-group">
            <span className="display-label">monsters min level</span>
            <span className="display-text">{monsters_min_level}</span>
          </div>
          <div className="display-group">
            <span className="display-label">monsters max level</span>
            <span className="display-text">{monsters_max_level}</span>
          </div>
          <div className="display-group">
            <span className="display-label">treasure drop list</span>
            <span className="display-text">{treasureDropListName}</span>
          </div>
          <div className="display-group-blank">
          </div>
          {this.getMonstersInRange({ min: monsters_min_level, max: monsters_max_level, monsters: allMonsters })}
          <div className="display-group-blank">
          </div>
          {this.getTileAssignments()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    levels: state.levels.levels,
    dungeonTiles: state.dungeonTiles.tiles,
    treasureDropLists: state.dropLists.treasure,
    monsters: state.monsters.monsters,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload }),
    fetchLevels: () => dispatch(fetchLevels()),
    loadLevelDetails: () => dispatch(loadLevelDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelDisplay);