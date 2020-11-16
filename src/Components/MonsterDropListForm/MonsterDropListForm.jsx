import React from 'react';
import './MonsterDropListForm.css';

//component imports
import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';
import DeleteOfferingButton from '../DeleteOfferingButton/DeleteOfferingButton';
import AddOfferingButton from '../AddOfferingButton/AddOfferingButton';

//redux imports
import { connect } from 'react-redux';
import { fetchMonsterDropLists, loadItems } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import itemTypes from '../../utilities/itemTypes';
import formTypes from '../../utilities/formTypes';
import postRequests from '../../utilities/itemPostRequests';
import putRequests from '../../utilities/itemPutRequests';
import breadcrumb from '../../utilities/breadcrumb';

class MonsterDropListForm extends DisplayForm {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    }

    this.initializeFields = this.initializeFields.bind(this);
    this.getDropListOptions = this.getDropListOptions.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.addFormDrop = this.addFormDrop.bind(this);
    this.deleteDrop = this.deleteDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getForm = this.getForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMonsterDropList = this.updateMonsterDropList.bind(this);
  }

  componentDidMount() {
    let breadcrumbPass = false;
    if (!this.props.breadcrumbActive) {
      breadcrumbPass = true;
    }
    if (this.props.breadcrumbActive && !this.props.breadcrumbFormData) {
      breadcrumbPass = false;
    }
    if (!this.props.armor || !this.props.potions || !this.props.weapons) {
      this.props.loadItems();
    }
    if (breadcrumbPass) {
      this.initializeFields();
    }
  }

  componentDidUpdate() {
    let breadcrumbPass = false;
    if (this.props.breadcrumbActive && this.props.breadcrumbFormData) {
      breadcrumbPass = true;
    }
    if (!this.state.initialized && breadcrumbPass) {
      this.initializeFields();
    }
  }

  initializeFields() {
    if (this.props.edit && !this.props.monsterDropLists) return;
    let newName = '';
    let newGoldMin = 0;
    let newGoldMax = 0;
    let newGoldChance = 0;
    let newDrops = [];
    if (this.props.edit) {
      const allDropLists = this.props.monsterDropLists;
      const thisDropList = allDropLists.find(dropList => dropList.id === this.props.displayId);
      const thisMonsterDropList = thisDropList.monster_drop_list;
      newName = thisMonsterDropList.name;
      newGoldMin = thisDropList.gold_min;
      newGoldMax = thisDropList.gold_max;
      newGoldChance = thisDropList.gold_chance;
      newDrops = thisDropList.drops;
    }

    console.log(this.props.breadcrumbActive);
    console.log(this.props.breadcrumbName);
    console.log(this.props.breadcrumbFormData);
    if (this.props.breadcrumbActive && this.props.breadcrumbName === formTypes.monster_drop_list) {
      const breadcrumbForm = this.props.breadcrumbFormData;
      const breadcrumbName = breadcrumbForm.name;
      if (breadcrumbName) {
        newName = breadcrumbName;
      }
    }

    let initialState = {};
    initialState['name'] = newName;
    initialState['gold_min'] = newGoldMin;
    initialState['gold_max'] = newGoldMax;
    initialState['gold_chance'] = newGoldChance;
    let presentIds = [];
    if (newDrops.length > 0) {
      for (const drop of newDrops) {
        initialState[`drop-${drop.id}-item-id`] = `{ "id":"${drop.itemId}", "type":"${drop.drop_type}"}`;
        initialState[`drop-${drop.id}-drop-chance`] = drop.dropChance;
        presentIds.push(drop.id);
      }
    }
    initialState.presentIds = presentIds;
    initialState.existingIdCount = newDrops.length;
    initialState.deletedIds = [];
    initialState.newDropIndex = 0;
    initialState.newDropKeys = [];
    initialState.initialized = true;
    this.setState(initialState);
  }

  getDropListOptions() {
    if (!this.props.armor || !this.props.potions || !this.props.weapons) return '';
    const itemArr = Object.values(itemTypes);
    return itemArr.map(itemType => {
      let propName = itemType;
      if (itemType !== itemTypes.armor) {
        propName += 's';
      }
      const allItemsOfType = this.props[`${propName}`];
      return (
        <optgroup label={itemType}>
          {allItemsOfType.map(item => {
            return <option value={`{ "id":"${item.id}", "type":"${itemType}"}`}>{item.item.name}</option>
          })}
        </optgroup>
      )
    });
  }

  addFormDrop() {
    // limit drops to 5
    const totalCount = this.state.newDropKeys.length;
    if (totalCount >= 5) return;

    let updatedState = {};
    let newDropIndex = this.state.newDropIndex;
    updatedState[`new-drop-${newDropIndex}-item-id`] = `{ "id":"${0}", "type":"${itemTypes.potion}"}`;
    updatedState[`new-drop-${newDropIndex}-drop-chance`] = 0;
    let newDropKeys = this.state.newDropKeys;
    newDropKeys.push(newDropIndex);
    updatedState.newDropKeys = newDropKeys;
    newDropIndex += 1;
    updatedState.newDropIndex = newDropIndex;
    this.setState(updatedState);
  }

  deleteDrop(payload) {
    const { existing, dropId } = payload;
    let updatedState = {};
    if (existing) {
      let newDeleted = this.state.deletedIds;
      let newCount = this.state.existingIdCount;
      newDeleted.push(dropId);
      newCount -=1;
      updatedState.deletedIds = newDeleted;
      updatedState.existingIdCount = newCount;
    } else {
      let newDropKeys = this.state.newDropKeys;
      const dropIndex = newDropKeys.indexOf(dropId);
      if (dropIndex < 0 || (dropIndex !== 0 && !dropIndex)) return;
      newDropKeys.splice(dropIndex, 1);
      updatedState.newDropKeys = newDropKeys;
    }

    this.setState(updatedState);
  }

  handleCloseButton(e) {
    e.preventDefault();
    console.log(`active: ${this.props.breadcrumbActive}, name: ${this.props.breadcrumbName}`);
    if (this.props.breadcrumbActive && this.props.breadcrumbName === formTypes.monster_drop_list) {
      breadcrumb.revertToBreadcrumb();
    } else {
      if (this.props.edit === false) {
        this.props.setDisplayForm({ form: false, targetId: null, edit: false });
      } else {
        this.props.setDisplayForm({ form: formTypes.monster_drop_list, targetId: this.props.displayId, edit: false });
      }
    }
  }

  handleChange(e) {
    const eleName = e.target.getAttribute('name');
    let stateUpdate = {};
    stateUpdate[eleName] = e.target.value;
    this.setState(stateUpdate);
  }

  *updateMonsterDropList(data) {
    if (this.props.edit) {
      yield putRequests.makeRequest('monster_drop_list', data);
    } else {
      yield postRequests.makeRequest('monster_drop_list', data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    let updateMonsterDropList = this.updateMonsterDropList(data);
    updateMonsterDropList.next().value.then(() => {
      this.props.fetchMonsterDropLists();
      if (this.props.edit) {
        this.props.setDisplayForm({ form: formTypes.monster_drop_list, targetId: this.props.displayId, edit: false });
      } else {
        this.props.setDisplayForm({ form: null, targetId: null, edit: false });
      }
    });
  }

  getForm() {
    if (!this.state.initialized) return '';

    let drops = [];
    let newMonsterDroplistId = null;
    if (this.props.edit) {
      const allDropsLists = this.props.monsterDropLists;
      const thisDropList = allDropsLists.find(dropList => dropList.id === this.props.displayId);
      drops = thisDropList.drops;
      newMonsterDroplistId = thisDropList.monster_drop_list.id
    }

    let newHeading = 'New Monster Drop List';
    let newId = null;
    
    if (this.props.edit) {
      newHeading = this.state.name;
      newId = this.props.displayId;

    }

    const newDropKeys = this.state.newDropKeys;

    return (
      <div className="MonsterDropListForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">{newHeading}</h2>
          <div className="close-monster-droplist-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>

        <form action={'/monster_drop_list'}
          className="input-fields-area"
          id="MonsterDropListPostForm"
          method="POST"
          onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="monster droplist name"
                maxLength="26" onChange={this.handleChange} value={this.state.name}></input>
            </div> 
            <div className="input-group">
              <label className="item-label" htmlFor="gold_min">gold min</label>
              <input type="number" name="gold_min" id="gold_min" className="input-number" placeholder="#"
                step="1" min="0" max="12000" required onChange={this.handleChange} value={this.state.gold_min}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="gold_max">gold max</label>
              <input type="number" name="gold_max" id="gold_max" className="input-number" placeholder="#"
                step="1" min="0" max="12000" required onChange={this.handleChange} value={this.state.gold_max}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="gold_chance">gold chance</label>
              <input type="number" name="gold_chance" id="gold_chance" className="input-number" placeholder="#"
                step="1" min="0" max="12000" required onChange={this.handleChange} value={this.state.gold_chance}></input>
            </div>
            <div className="drops-group form-subgroup">
              <span className="item-label form-full-span">Drops</span>
              <span className="item-label form-pad form-half-span">Item</span>
              <span className="item-label form-pad form-half-span">Drop Chance</span>
              {drops.length <= 0 ? '' : drops.map(drop => {
                let deletedMap = this.state.deletedIds;
                if (deletedMap.length > 0 && deletedMap.includes(drop.id)) {
                  return '';
                }
                return (
                  <div className="form-inner-span">
                    <div className="form-half-span form-left-half">
                      <select className="drop-select"
                        name={`drop-${drop.id}-item-id`}
                        id={`drop-${drop.id}-item-id`}
                        onChange={this.handleChange}
                        value={this.state[`drop-${drop.id}-item-id`]}>
                          {this.getDropListOptions()}
                      </select>
                    </div>
                    <div className="form-half-span form-right-half">
                      <input className="input-number"
                        type="number"
                        name={`drop-${drop.id}-drop-chance`}
                        id={`drop-${drop.id}-drop-chance`}
                        onChange={this.handleChange}
                        value={this.state[`drop-${drop.id}-drop-chance`]}>
                      </input>
                      <span className="dropDelete"
                        onClick={() => this.deleteDrop({ existing: true, dropId: drop.id })}
                      >
                        <DeleteOfferingButton />
                      </span>
                    </div>
                  </div>
                )
              })}
              {newDropKeys.length <= 0 ? '' : newDropKeys.map(index => {
                return (
                  <div className="form-inner-span">
                    <div className="form-half-span form-left-half">
                      <select className="drop-select"
                        name={`new-drop-${index}-item-id`}
                        id={`new-drop-${index}-item-id`}
                        onChange={this.handleChange}
                        value={this.state[`new-drop-${index}-item-id`]}>
                          {this.getDropListOptions()}
                      </select>
                    </div>
                    <div className="form-half-span form-right-half">
                      <input className="input-number"
                        type="number"
                        name={`new-drop-${index}-drop-chance`}
                        id={`new-drop-${index}-drop-chance`}
                        onChange={this.handleChange}
                        value={this.state[`new-drop-${index}-drop-chance`]}>
                      </input>
                      <span className="dropDelete"
                        onClick={() => this.deleteDrop({ existing: false, dropId: index })}
                      >
                        <DeleteOfferingButton />
                      </span>
                    </div>
                  </div>
                )
              })}
              <div className="dropAdd form-full-span form-center-content"
                onClick={this.addFormDrop}
              >
                <AddOfferingButton />
              </div>
              <input type="hidden" name="existingIds" value={this.state.presentIds} />
              <input type="hidden" name="deletedIds" value={this.state.deletedIds} />
              <input type="hidden" name="newIndexes" value={this.state.newDropKeys} />
              {/* <input type="hidden" name="newDropsCount" value={this.state.newD} */}
              <input type="hidden" name="id" value={newId} />
              <input type="hidden" name="monsterDroplistId" value={newMonsterDroplistId} />
              <input type="submit" value={this.props.edit ? 'Update Monster Droplist' : 'Create Monster Droplist'} className="button create-button"></input>
            </div>
        </form>
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    displayId: state.detail.targetId,
    monsterDropLists: state.dropLists.monster,
    armor: state.armor.armor,
    potions: state.potions.potions,
    weapons: state.weapons.weapons,
    breadcrumbActive: state.breadcrumb.active,
    breadcrumbName: state.breadcrumb.name,
    breadcrumbFormData: state.breadcrumb.formData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchMonsterDropLists: () => dispatch(fetchMonsterDropLists()),
    loadItems: () => dispatch(loadItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterDropListForm);