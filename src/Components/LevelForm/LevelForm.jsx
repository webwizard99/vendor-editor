import React from 'react';
import './LevelForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';
import EditButton from '../EditButton/EditButton';
import AddOfferingButton from '../AddOfferingButton/AddOfferingButton';
import DeleteOfferingButton from '../DeleteOfferingButton/DeleteOfferingButton';

// redux imports
import { connect } from 'react-redux';
import { fetchLevels, loadLevelDetails } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import formTypes from '../../utilities/formTypes';
import formComposer from '../../utilities/formComposer';
import breadcrumb from '../../utilities/breadcrumb';
import levelsManager from '../../utilities/levelsManager';
import stringArrayHandler from '../../utilities/stringArrayHandler';
import postRequest from '../../utilities/itemPostRequests';
import putRequest from '../../utilities/itemPutRequests';

class LevelForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.state = {
      dropList: null,
      initialized: false
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.loadLevels = this.loadLevels.bind(this);
    this.getDungeonTileOptions = this.getDungeonTileOptions.bind(this);
    this.addFormTileAssignment = this.addFormTileAssignment.bind(this);
    this.deleteTileAssignement = this.deleteTileAssignement.bind(this);
    this.getTreasureDropListOptions = this.getTreasureDropListOptions.bind(this);
    this.addLevel = this.addLevel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropListChange = this.handleDropListChange.bind(this);
    this.initializeFields = this.initializeFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.monsters || !this.props.dungeonTiles || !this.props.treasureDropLists) {
      this.props.loadLevelDetails();
    } else {
      if (!this.state.initializd) {
        this.initializeFields();
      }
    }
  }

  componentDidUpdate() {
    if (this.props.monsters && this.props.dungeonTiles && this.props.treasureDropLists && !this.state.initialized) {
      this.initializeFields()
    }
  }

  loadLevels(levels) {
    const levelNumbers = levels.map(level => level.number);
    console.log(levelNumbers);
    levelsManager.loadLevels(levelNumbers);
  }

  initializeFields() {
    if (this.props.edit && !this.props.levels) return;
    let stateUpdate = {};

    let dungeonTiles = [];

    let minLevel = 1;
    let maxLevel = 1;
    stateUpdate.initialized = true;
    const allLevels = this.props.levels;
    this.loadLevels(allLevels);
    if (this.props.edit) {
      
      const thisLevel = allLevels.find(level => level.id === this.props.displayId);
      const allTreasureDropLists = this.props.treasureDropLists;
      const thisTreasureDropList = allTreasureDropLists.find(dropList => dropList.id === thisLevel.dropListId);
      stateUpdate.dropList = thisTreasureDropList.id;
      dungeonTiles = thisLevel.tile_assignments;
      minLevel = thisLevel.monsters_min_level;
      maxLevel = thisLevel.monsters_max_level;
    }

    

    let presentIds = [];
    if (dungeonTiles.length > 0) {
      for (const assignment of dungeonTiles) {
        stateUpdate[`assignment-${assignment.id}-tileId`] = assignment.dungeonTileId;
        stateUpdate[`assignment-${assignment.id}-probability`] = assignment.probability;
        presentIds.push(assignment.id);
      }
    }

    
    stateUpdate.presentIds = presentIds;
    stateUpdate.existingIdCount = dungeonTiles.length;
    stateUpdate.deletedIds = [];
    stateUpdate.newAssignmentIndex = 0;
    stateUpdate.newAssignmentKeys = [];

    stateUpdate.monsters_min_level = minLevel;
    stateUpdate.monsters_max_level = maxLevel;
    stateUpdate.dungeonTiles = dungeonTiles;

    if (this.props.breadcrumbFormdata && this.props.breadcrumbFormdataName === formTypes.level) {
      presentIds = [];
      const levelForm = this.props.breadcrumbFormdata;
      console.log(levelForm);
      const dropListId = levelForm.dropListId;
      stateUpdate.dropList = dropListId;
      for (let [key, value] of Object.entries(levelForm)) {
        if (key === 'presentIds' || key === 'deletedIds' || key === 'newAssignmentKeys') {
          let stringArr = value;
          if (stringArr === '') {
            stringArr = [];
          } else {
            stringArr = stringArrayHandler.getArrayFromString(stringArr);
          }
          stateUpdate[key] = stringArr;
        } else {
          stateUpdate[key] = value;
        }
        
      }
    }
    this.setState(stateUpdate);
  }

  getDungeonTileOptions() {
    const dungeonTileOptions = this.props.dungeonTiles;
    return dungeonTileOptions.map(tileOption => {
      return <option value={tileOption.id}>{tileOption.name}</option>
    });
  }

  addFormTileAssignment() {
    // limit assignements to 5
    const totalCount = this.state.newAssignmentKeys.length + this.state.existingIdCount;
    if (totalCount >= 5) return;

    let updatedState = {};
    let newAssignmentIndex = this.state.newAssignmentIndex;
    updatedState[`new-assignment-${newAssignmentIndex}-tileId`] = null;
    updatedState[`new-assignment-${newAssignmentIndex}-probability`] = 100;
    let newAssignmentKeys = this.state.newAssignmentKeys;
    newAssignmentKeys.push(newAssignmentIndex);
    updatedState.newAssignmentKeys = newAssignmentKeys;
    newAssignmentIndex += 1;
    updatedState.newAssignmentIndex = newAssignmentIndex;
    this.setState(updatedState);
  }

  deleteTileAssignement(payload) {
    const { existing, assignmentId } = payload;
    let updatedState = {};
    if (existing) {
      let newDeleted = this.state.deletedIds;
      let newCount = this.state.existingIdCount;
      newDeleted.push(assignmentId);
      newCount -=1;
      updatedState.deletedIds = newDeleted;
      updatedState.existingIdCount = newCount;
    } else {
      let newAssignmentKeys = this.state.newAssignmentKeys;
      const assignmentIndex = newAssignmentKeys.indexOf(assignmentId);
      if (assignmentIndex <0 || (assignmentIndex !== 0 && !assignmentIndex)) return;
      newAssignmentKeys.splice(assignmentIndex, 1);
      updatedState.newAssignmentKeys = newAssignmentKeys;
    }

    this.setState(updatedState);
  }

  getTreasureDropListOptions() {
    const dropLists = this.props.treasureDropLists;
    return dropLists.map(dropList => {
      return <option value={dropList.id}>{dropList.treasure_drop_list.name}</option>
    });
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: formTypes.level, targetId: this.props.displayId, edit: false });
    }
  }

  handleDropListChange(e) {
    e.preventDefault();
    let dropListId = e.target.value;
    if (dropListId === '--choose a droplist--') return;
    this.setState({ dropList: dropListId });
  }

  handleChange(e) {
    const eleName = e.target.getAttribute('name');
    let stateUpdate = {};
    stateUpdate[eleName] = e.target.value;
    this.setState(stateUpdate);
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
      <div className="form-center-content form-inner-span">
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
      </div>
      
    )
    
  }

  handleBreadcrumb(dropListId) {
    // set dropList id to load appropriate drop list into
    // level form
    let resDropList;
    if (dropListId !== null) {
      resDropList = Number.parseInt(dropListId);
    } else {
      resDropList = dropListId;
    }

    // breadcrumb payload composition to pass into breadcrumb module
    let breadcrumbPayload = {};
    breadcrumbPayload.name = formTypes.treasure_drop_list;
    const levelForm = document.querySelector('#LevelPostForm');
    let data = new FormData(levelForm);
    // console.log(data);
    data = formComposer.getObjectFromForm(data);
    let formDataPayload = {};
    formDataPayload.formData = data;
    formDataPayload.formDataName = formTypes.level;
    breadcrumbPayload.formDataPayload = formDataPayload; 
    // compose display payload to point back to MonsterForm with
    // appropriate display values
    const currentEdit = this.props.edit;
    const currentId = this.props.displayId;
    const displayPayload = { form: formTypes.level, edit: currentEdit, targetId: currentId };
    breadcrumbPayload.displayPayload = displayPayload;
    // set breadcrumb
    breadcrumb.setNewBreadcrumb(breadcrumbPayload);
    // switch to dependent form
    if (resDropList === null) {
      this.props.setDisplayForm({ form: formTypes.treasure_drop_list, edit: false, targetId: null });
    } else {
      this.props.setDisplayForm({ form: formTypes.treasure_drop_list, edit: true, targetId: resDropList });
    }
  }

  *addLevel(data) {
    if (this.props.edit) {
      yield putRequest.makeRequest('level', data);
    } else {
      yield postRequest.makeRequest('level', data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.addLevel = this.addLevel(data);
    this.addLevel.next().value.then(() => {
      this.props.fetchLevels();
      if (this.props.breadcrumbFormdata && this.props.breadcrumbFormdataName === formTypes.level) {
        breadcrumb.clearBreadcrumbForm();
      }
      if (this.props.edit) {
        this.props.setDisplayForm({ form: formTypes.level, edit: false, targetId: this.props.displayId });
      } else {
        this.props.setDisplayForm({ form: null, edit: false, targetId: null });
      }
    })
  }

  getForm() {
    if (!this.props.monsters || !this.props.dungeonTiles || !this.props.treasureDropLists || !this.state.initialized) {
      return '';
    }

    let newId;
    let newNumber = levelsManager.getLowestNewLevel();
    let newBoss = false;
    let newBossId;
    let newDropListId;
    let newDungeonTiles = [];

    if (this.props.edit) {
      const allLevels = this.props.levels;
      const thisLevel = allLevels.find(level => level.id === this.props.displayId);
      newId = this.props.displayId;
      newNumber = thisLevel.number;
      newBoss = thisLevel.boss;
      if (newBoss !== 'true' && newBoss !== true) {
        newBoss = false;
      }
      newBossId = thisLevel.boss_id;
      newDropListId = thisLevel.dropListId;
      newDungeonTiles = thisLevel.tile_assignments;
    }

    const newAssignmentKeys = this.state.newAssignmentKeys || [];

    return (
      <div className="LevelForm extended">
        <div className="form-heading-bar">
          <h2 className="form-heading">Level {newNumber}</h2>
          <div className="close-level-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>

        <form action={'/level'}
          className="input-fields-area"
          id="LevelPostForm"
          method="POST"
          onSubmit={this.handleSubmit}>
            <input type="hidden" name="number" value={newNumber} />
            <input type="hidden" name="boss" value={false} />
            <div className="input-group">
              <label className="item-label" htmlFor="boss">boss</label>
              {newBoss === true ? (<input type="checkbox" name="boss" id="boss" className="input-boolean" placeholder="#"
                value={true} checked defaultValue={newBoss}></input>) :
                (<input type="checkbox" name="boss" id="boss" className="input-boolean" placeholder="#"
                value={true} defaultValue={newBoss}></input>)}
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="boss_id">boss id</label>
              <input type="number" name="boss_id" id="boss_id" className="input-number" placeholder="#"
                min="0" max="300" defaultValue={newBossId}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="monsters_min_level">monster min level</label>
              <input type="number" name="monsters_min_level" id="monsters_min_level" className="input-number" placeholder="#"
                min="1" max="30" onChange={this.handleChange} required value={this.state.monsters_min_level}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="monsters_max_level">monster max level</label>
              <input type="number" name="monsters_max_level" id="monsters_max_level" className="input-number" placeholder="#"
                min="1" max="30" onChange={this.handleChange} required value={this.state.monsters_max_level}></input>
            </div>
            {this.getMonstersInRange({ min: this.state.monsters_min_level, max: this.state.monsters_max_level, monsters: this.props.monsters })}
            <div className="input-group">
              <label className="item-label" htmlFor="dropListId">treasure droplist</label>
              <select className="treasure-droplist-select"
                name="dropListId"
                id="dropListId"
                onChange={this.handleDropListChange}
                defaultValue={newDropListId === undefined ? null : newDropListId}>
                  <option value={undefined}>--choose a droplist--</option>
                  <option value={null} onClick={() => this.handleBreadcrumb(null)}>new droplist</option>
                  {this.getTreasureDropListOptions()}
              </select>
              <div className="edit-treasure-droplist-button" onClick={() => this.handleBreadcrumb(newDropListId === null ? null : this.state.dropList)}>
                <EditButton />
              </div>
            </div>
            <div className="tile-assignments-group form-subgroup">
            <span className="item-label form-full-span">Tile Assignments</span>
              <span className="item-label form-pad form-half-span">Tile</span>
              <span className="item-label form-pad form-half-span">Chance</span>
              {newDungeonTiles.length <= 0 ? '' : newDungeonTiles.map(assignment => {
                let deletedMap = this.state.deletedIds;
                if (deletedMap && deletedMap.length > 0 && deletedMap.includes(assignment.id)) {
                  return ''
                }
                return (
                  <div className="form-inner-span">
                    <div className="form-half-span form-left-half">
                      <select className="assignment-select"
                        name={`assignment-${assignment.id}-tileId`}
                        id={`assignment-${assignment.id}-tileId`}
                        onChange={this.handleChange}
                        value={this.state[`assignment-${assignment.id}-tileId`]}
                      >
                        {this.getDungeonTileOptions()}
                      </select>
                    </div>
                    <div className="form-half-span form-right-half">
                    <input className="input-number" 
                        type="number" 
                        name={`assignment-${assignment.id}-probability`} 
                        id={`assignment-${assignment.id}-probability`} 
                        onChange={this.handleChange} 
                        step="50"
                        value={this.state[`assignment-${assignment.id}-probability`]}>
                      </input>
                      <span className="assignmentDelete"
                        onClick={() => this.deleteTileAssignement({ existing: true, assignmentId: assignment.id })}
                      >
                        <DeleteOfferingButton />
                      </span>
                    </div>
                  </div>
                )
              })}
              {newAssignmentKeys.length <= 0 ? '' : newAssignmentKeys.map(index => {
                return (
                  <div className="form-inner-span">
                    <div className="form-half-span form-left-half">
                      <select className="assignment-select"
                        name={`new-assignment-${index}-tileId`}
                        id={`new-assignment-${index}-tileId`}
                        onChange={this.handleChange}
                        value={this.state[`new-assignment-${index}-tileId`]}>
                          {this.getDungeonTileOptions()}
                      </select>
                    </div>
                    <div className="form-half-span form-right-half">
                      <input className="input-number"
                        type="number"
                        name={`new-assignment-${index}-probability`}
                        id={`new-assignment-${index}-probability`}
                        onChange={this.handleChange}
                        step="50"
                        value={this.state[`new-assignment-${index}-probability`]}>
                      </input>
                      <span className="assignmentDelete"
                        onClick={() => this.deleteTileAssignement({ existing: false, assignmentId: index })}
                      >
                        <DeleteOfferingButton />
                      </span>
                    </div>
                  </div>
                )
              })}
              <div className="assignmentAdd form-full-span form-center-content"
                onClick={this.addFormTileAssignment}
              >
                <AddOfferingButton />
              </div>
            </div>
            <input type="hidden" name="presentIds" value={this.state.presentIds} />
            <input type="hidden" name="deletedIds" value={this.state.deletedIds} />
            <input type="hidden" name="newAssignmentKeys" value={this.state.newAssignmentKeys} />
            <input type="hidden" name="id" value={newId} />
            <div className="submit-container">
              <input type="submit" value={this.props.edit ? 'Update Level' : 'Create Level' } className="button create-button"></input>
            </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    monsters: state.monsters.monsters,
    dungeonTiles: state.dungeonTiles.tiles,
    treasureDropLists: state.dropLists.treasure,
    levels: state.levels.levels,
    displayId: state.detail.targetId,
    breadcrumbFormdata: state.breadcrumb.formData,
    breadcrumbFormdataName: state.breadcrumb.formDataName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchLevels: () => dispatch(fetchLevels()),
    loadLevelDetails: () => dispatch(loadLevelDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelForm);