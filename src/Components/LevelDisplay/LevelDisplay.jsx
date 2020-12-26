import React from 'react';
import './LevelDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchLevels, loadLevelDetails } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';
import boolean from '../../utilities/boolean';

class LevelDisplay extends DisplayStatic {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false
    }

    this.setIntialized = this.setIntialized.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
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
    return (
      <div className="DeleteLevelButton">
        <DeleteButton />
      </div>
    );
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
      <div className="LevelDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">Level {number}</h2>
          <div className="LevelEditButton" onClick={() => this.props.setDisplayForm({ form: formTypes.level, edit: true, targetId: thisLevel.id })}>
            <EditButton />
          </div>
        </div>
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
    fetchLevels: () => dispatch(fetchLevels()),
    loadLevelDetails: () => dispatch(loadLevelDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelDisplay);