import React from 'react';
import './DungeonTileDisplay.css';

// component imports
import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchDungeonTiles } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';
import boolean from '../../utilities/boolean';

class DungeonTileDisplay extends DisplayStatic {
  getDeleteButton() {
    return (
      <div className="DeleteDungeonTileButton">
        <DeleteButton />
      </div>
    )
  }

  getDisplay() {
    const allDungeonTiles = this.props.dungeonTiles;
    const thisDungeonTile = allDungeonTiles.find(dungeonTile => dungeonTile.id === this.props.displayId);
    const {
      name,
      boss,
      stairs_up,
      treasure,
      encounter,
      trap
    } = thisDungeonTile;

    return (
      <div className="DungeonTileDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="DungeonBehaviorEditButton" onClick={() => this.props.setDisplayForm({ form: formTypes.dungeon_tile, edit: true, targetId: thisDungeonTile.id })}>
            <EditButton />
          </div>
        </div>
        <div className="display-fields-area">
          <div className="display-group">
            <span className="display-label">Name</span>
            <span className="display-text">{name}</span>
          </div>
          <div className="display-group">
            <span className="display-label">boss</span>
            <span className="display-text">{boolean.displayBooloean(boss)}</span>
          </div>
          <div className="display-group">
            <span className="display-label">stairs up</span>
            <span className="display-text">{boolean.displayBooloean(stairs_up)}</span>
          </div>
          <div className="display-group">
            <span className="display-label">treasure</span>
            <span className="display-text">{treasure}</span>
          </div>
          <div className="display-group">
            <span className="display-label">encounter</span>
            <span className="display-text">{encounter}</span>
          </div>
          <div className="display-group">
            <span className="display-label">trap</span>
            <span className="display-text">{trap}</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dungeonTiles: state.dungeonTiles.tiles,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchDungeonTiles: () => dispatch(fetchDungeonTiles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonTileDisplay);