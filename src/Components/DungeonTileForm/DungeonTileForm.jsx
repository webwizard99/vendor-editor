import React from 'react';
import './DungeonTileForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { fetchDungeonTiles } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import formTypes from '../../utilities/formTypes';
import postRequest from '../../utilities/itemPostRequests';
import putRequest from '../../utilities/itemPutRequests';

class DungeonTileForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDungeonTile = this.addDungeonTile.bind(this);
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: formTypes.dungeon_tile, targetId: this.props.displayId, edit: false });
    }
  }

  *addDungeonTile(data) {
    if (this.props.edit) {
      yield putRequest.makeRequest('dungeon_tile', data);
    } else {
      yield postRequest.makeRequest('dungeon_tile', data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.addDungeonTile = this.addDungeonTile(data);
    this.addDungeonTile.next().value.then(() => {
      this.props.fetchDungeonTiles();
      if (this.props.edit) {
        this.props.setDisplayForm({ form: formTypes.dungeon_tile, edit: false, targetId: this.props.displayId });
      } else {
        this.props.setDisplayForm({ form: null, targetId: null, edit: false });
      }
    })
  }

  getForm() {
    let newHeading = 'New Dungeon Tile';
    let newName = '';
    let newId;
    let newBoss;
    let newStairsUp;
    let newTreasure;
    let newEncounter;
    let newTrap;

    if (this.props.edit) {
      const allDungeonTiles = this.props.dungeonTiles;
      const thisDungeonTile = allDungeonTiles.find(dungeonTile => dungeonTile.id === this.props.displayId);
      newName = thisDungeonTile.name;
      newHeading = newName;
      newId = thisDungeonTile.id;
      newBoss = thisDungeonTile.boss;
      newStairsUp = thisDungeonTile.stairs_up;
      newTreasure = thisDungeonTile.treasure;
      newEncounter = thisDungeonTile.encounter;
      newTrap = thisDungeonTile.trap;
    }
    return (
      <div className="DungeonTileForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">Dungeon Tile: {newHeading}</h2>
          <div className="close-dungeon-tile-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>
        <form action={'/dungeon_tile'}
          className="input-fields-area"
          id="DungeonTilePostForm"
          method="POST"
          onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="tile name"
                maxLength="26" required defaultValue={newName}></input>
            </div>
            <input type="hidden" name="boss" value={false} />
            <div className="input-group">
              <label className="item-label" htmlFor="boss">boss</label>
              {newBoss === true ? (<input type="checkbox" name="boss" id="boss" className="input-boolean" placeholder="#"
                value={true} checked defaultValue={newBoss}></input>) :
                (<input type="checkbox" name="boss" id="boss" className="input-boolean" placeholder="#"
                value={true} defaultValue={newBoss}></input>)}
            </div>
            <input type="hidden" name="stairs_up" value={false} />
            <div className="input-group">
              <label className="item-label" htmlFor="stairs_up">stairs up</label>
              {newStairsUp === true ? (<input type="checkbox" name="stairs_up" id="stairs_up" className="input-boolean" placeholder="#"
                value={true} checked defaultValue={newStairsUp}></input>) :
                (<input type="checkbox" name="stairs_up" id="stairs_up" className="input-boolean" placeholder="#"
                value={true} defaultValue={newStairsUp}></input>)}
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="treasure">treasure</label>
              <input type="number" name="treasure" id="treasure" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newTreasure}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="encounter">encounter</label>
              <input type="number" name="encounter" id="encounter" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newEncounter}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="trap">trap</label>
              <input type="number" name="trap" id="trap" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newTrap}></input>
            </div>
            <input type="hidden" name="id" value={newId} />
            <input type="submit" value={this.props.edit ? 'Update Dungeon Tile' : 'Create Dungeon Tile' } className="button create-button"></input>
        </form>
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
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

export default connect(mapStateToProps, mapDispatchToProps)(DungeonTileForm);