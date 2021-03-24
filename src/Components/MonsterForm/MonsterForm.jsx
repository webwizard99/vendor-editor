import React from 'react';
import './MonsterForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';
import EditButton from '../EditButton/EditButton';

// redux imports
import { connect } from 'react-redux';
import { fetchMonsters, loadMonsterDetails } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import formTypes from '../../utilities/formTypes';
import formComposer from '../../utilities/formComposer';
import breadcrumb from '../../utilities/breadcrumb';
import postRequest from '../../utilities/itemPostRequests';
import putRequest from '../../utilities/itemPutRequests';

class MonsterForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.state = {
      dropList: null,
      intialized: false
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.getMonsterBehaviorOptions = this.getMonsterBehaviorOptions.bind(this);
    this.getMonsterDropListOptions = this.getMonsterDropListOptions.bind(this);
    this.addMonster = this.addMonster.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBreadcrumb = this.handleBreadcrumb.bind(this);
    this.handleDropListChange = this.handleDropListChange.bind(this);
    this.initializeMonsterDropListId = this.initializeMonsterDropListId.bind(this);
  }

  componentDidMount() {
    if (!this.props.monsterBehaviors || !this.props.monsterDropLists) {
      this.props.loadMonsterDetails();
    } else {
      if (!this.state.intialized) {
        this.initializeMonsterDropListId();
      }
    }
  }

  componentDidUpdate() {
    if (this.props.monsterBehaviors && this.props.monsterDropLists & !this.state.intialized) {
      this.initializeMonsterDropListId();
    }
  }

  initializeMonsterDropListId() {
    let stateUpdate = {};
    stateUpdate.intialized = true;
    if (this.props.edit) {
      const allMonsters = this.props.monsters;
      const thisMonster = allMonsters.find(monster => monster.id === this.props.displayId);
      const allMonsterDropLists = this.props.monsterDropLists;
      const thisMonsterDropList = allMonsterDropLists.find(dropList => dropList.id === thisMonster.dropListId);
      stateUpdate.dropList = thisMonsterDropList.id;
    }
    if (this.props.breadcrumbFormdata && this.props.breadcrumbFormdataName === formTypes.monster) {
      const monsterForm = this.props.breadcrumbFormdata;
      const monsterDropListId = Number.parseInt(monsterForm.dropListId);
      stateUpdate.dropList = monsterDropListId;
    } 
    this.setState(stateUpdate);
  
  }
  
  getMonsterBehaviorOptions() {
    const monsterOptions = this.props.monsterBehaviors;
    return monsterOptions.map(monsterOption => {
      return <option value={monsterOption.id}>{monsterOption.name}</option>
    });
  }

  getMonsterDropListOptions() {
    const dropLists = this.props.monsterDropLists;
    return dropLists.map(dropList => {
      return <option value={dropList.id}>{dropList.monster_drop_list.name}</option>
    });
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.breadcrumbFormdata) {
      breadcrumb.clearBreadcrumbForm();
    }
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: formTypes.monster, targetId: this.props.displayId, edit: false });
    } 
  }

  handleDropListChange(e) {
    let dropListId = e.target.value;
    if (dropListId === '--choose a droplist--') return;
    if (dropListId === 'new droplist') {
      this.handleBreadcrumb(null);
    }
    this.setState({
      dropList: dropListId
    });
  }

  handleBreadcrumb(dropListId) {
    // set dropList id to load appropriate drop list into
    // monster form
    let resDropList;
    if (dropListId !== null) {
      resDropList = Number.parseInt(dropListId);
    } else {
      resDropList = dropListId;
    }
    // breadcrumb payload composition to pass into breadcrumb module
    let breadcrumbPayload = {};
    breadcrumbPayload.name = formTypes.monster_drop_list;
    // load form data into breadcrumb payload
    const monsterForm = document.querySelector('#MonsterPostForm');
    let data = new FormData(monsterForm);
    data = formComposer.getObjectFromForm(data);
    let formDataPayload = {};
    formDataPayload.formData = data;
    formDataPayload.formDataName = formTypes.monster;
    breadcrumbPayload.formDataPayload = formDataPayload;
    // compose display payload to point back to MonsterForm with
    // appropriate display values
    const currentEdit = this.props.edit;
    const currentId = this.props.displayId;
    const displayPayload = { form: formTypes.monster, edit: currentEdit, targetId: currentId };
    breadcrumbPayload.displayPayload = displayPayload;
    // set breadcrumb
    breadcrumb.setNewBreadcrumb(breadcrumbPayload);
    // switch to dependent form
    if (resDropList === null) {
      this.props.setDisplayForm({ form: formTypes.monster_drop_list, edit: false, targetId: null });
    } else {
      this.props.setDisplayForm({ form: formTypes.monster_drop_list, edit: true, targetId: resDropList });
    }
  }

  *addMonster(data) {
    if (this.props.edit) {
      yield putRequest.makeRequest('monster', data);
    } else {
      yield postRequest.makeRequest('monster', data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.addMonster = this.addMonster(data);
    this.addMonster.next().value.then(() => {
      this.props.fetchMonsters();
      if (this.props.breadcrumbFormdata && this.props.breadcrumbFormdataName === formTypes.monster) {
        breadcrumb.clearBreadcrumbForm();
      }
      if (this.props.edit) {
        this.props.setDisplayForm({ form: formTypes.monster, edit: false, targetId: this.props.displayId });
      } else {
        this.props.setDisplayForm({ form: null, edit: false, targetId: null });
      }
    })
  }

  getForm() {
    if (!this.props.monsterBehaviors || !this.props.monsterDropLists) {
      return '';
    }
    let newHeading = 'New Monster';
    let newId;
    let newName = '';
    let newBoss = false;
    let newLevel = 1;
    let newHp = 1;
    let newDamage = 0;
    let newDefense = 0;
    let newStealth = 0;
    let newInitiative = 0;
    let newSpecial = 0;
    let newHeal = 0;
    let newExperience = 0;
    let newMonsterDropList, newMonsterBehavior;
    
    if (this.props.edit) {
      const allMonsters = this.props.monsters;
      const thisMonster = allMonsters.find(monster => monster.id === this.props.displayId);
      const allMonsterDropLists = this.props.monsterDropLists;
      const thisMonsterDropList = allMonsterDropLists.find(dropList => dropList.id === thisMonster.dropListId);
      const allMonsterBehaviors = this.props.monsterBehaviors;
      const thisMonsterBehavior = allMonsterBehaviors.find(monsterBehavior => monsterBehavior.id === thisMonster.monsterBehaviorId);
      newId = thisMonster.id;
      newName = thisMonster.name;
      newHeading = newName;
      newBoss = thisMonster.boss;
      newLevel = thisMonster.level;
      newHp = thisMonster.hp;
      newDamage = thisMonster.damage;
      newDefense = thisMonster.defense;
      newStealth = thisMonster.stealth;
      newInitiative = thisMonster.initiative;
      newSpecial = thisMonster.special;
      newHeal = thisMonster.heal;
      newExperience = thisMonster.experience;
      newMonsterDropList = thisMonsterDropList;
      newMonsterBehavior = thisMonsterBehavior;
    }
    if (this.props.breadcrumbFormdata && this.props.breadcrumbFormdataName === formTypes.monster) {
      const monsterForm = this.props.breadcrumbFormdata;
      const dropListId = Number.parseInt(monsterForm.dropListId);
      const monsterBehaviorId = Number.parseInt(monsterForm.monsterBehaviorId);
      const allMonsterDropLists = this.props.monsterDropLists;
      const thisMonsterDropList = allMonsterDropLists.find(dropList => dropList.id === dropListId);
      const allMonsterBehaviors = this.props.monsterBehaviors;
      const thisMonsterBehavior = allMonsterBehaviors.find(monsterBehavior => monsterBehavior.id === monsterBehaviorId);
      newId = Number.parseInt(monsterForm.id);
      newName = monsterForm.name;
      newHeading = newName;
      newBoss = monsterForm.boss === 'true' ? true: false;
      newLevel = Number.parseInt(monsterForm.level);
      newHp = Number.parseInt(monsterForm.hp);
      newDamage = Number.parseInt(monsterForm.damage);
      newDefense = Number.parseInt(monsterForm.defense);
      newStealth = Number.parseInt(monsterForm.stealth);
      newInitiative = Number.parseInt(monsterForm.initiative);
      newSpecial = Number.parseInt(monsterForm.special);
      newHeal = Number.parseInt(monsterForm.heal);
      newExperience = Number.parseInt(monsterForm.experience);
      newMonsterDropList = thisMonsterDropList;
      newMonsterBehavior = thisMonsterBehavior;
    }
    

    return (
      <div className="MonsterForm extended">
        <div className="form-heading-bar">
          <h2 className="form-heading">Monster: {newHeading}</h2>
          <div className="close-monster-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>

        <form action={'/monster'}
          className="input-fields-area"
          id="MonsterPostForm"
          method="POST"
          onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="monster name"
                maxLength="26" required defaultValue={newName}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="monsterBehaviorId">monster behavior</label>
              <select className="monster-behavior-select"
                name="monsterBehaviorId"
                id="monsterBehaviorId"
                defaultValue={newMonsterBehavior === undefined ? null : newMonsterBehavior.id}>
                  {this.getMonsterBehaviorOptions()}
              </select>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="dropListId">monster droplist</label>
              <select className="monster-droplist-select"
                name="dropListId"
                id="dropListId"
                onChange={this.handleDropListChange}
                defaultValue={newMonsterDropList === undefined ? null : newMonsterDropList.id}>
                  <option value={undefined}>--choose a droplist--</option>
                  <option value={null} onClick={() => this.handleBreadcrumb(null)}>new droplist</option>
                  {this.getMonsterDropListOptions()}
              </select>
              <div className="edit-monster-droplist-button" onClick={() => this.handleBreadcrumb(newMonsterDropList === null ? null : this.state.dropList)}>
                <EditButton />
              </div>
            </div>
            <input type="hidden" name="boss" value={false} />
            <div className="input-group">
              <label className="item-label" htmlFor="boss">boss</label>
              {newBoss === true ? (<input type="checkbox" name="boss" id="boss" className="input-boolean" placeholder="#"
                value={true} checked defaultValue={newBoss}></input>) :
                (<input type="checkbox" name="boss" id="boss" className="input-boolean" placeholder="#"
                value={true} defaultValue={newBoss}></input>)}
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="level">level</label>
              <input type="number" name="level" id="level" className="input-number" placeholder="#"
                min="0" max="30" required defaultValue={newLevel}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="hp">hp</label>
              <input type="number" name="hp" id="hp" className="input-number" placeholder="#"
                min="0" max="1000" required defaultValue={newHp}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="damage">damage</label>
              <input type="number" name="damage" id="damage" className="input-number" placeholder="#"
                min="0" max="200" required defaultValue={newDamage}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="defense">defense</label>
              <input type="number" name="defense" id="defense" className="input-number" placeholder="#"
                min="0" max="200" required defaultValue={newDefense}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="stealth">stealth</label>
              <input type="number" name="stealth" id="stealth" className="input-number" placeholder="#"
                min="0" max="200" required defaultValue={newStealth}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="initiative">initiative</label>
              <input type="number" name="initiative" id="initiative" className="input-number" placeholder="#"
                min="0" max="200" required defaultValue={newInitiative}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="special">special</label>
              <input type="number" name="special" id="special" className="input-number" placeholder="#"
                min="0" max="1000" step="50" required defaultValue={newSpecial}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="heal">heal</label>
              <input type="number" name="heal" id="heal" className="input-number" placeholder="#"
                min="0" max="200" required defaultValue={newHeal}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="experience">experience</label>
              <input type="number" name="experience" id="experience" className="input-number" placeholder="#"
                min="0" max="56000" required defaultValue={newExperience}></input>
            </div>
            <input type="hidden" name="id" value={newId} />
            <input type="submit" value={this.props.edit ? 'Update Monster' : 'Create Monster' } className="button create-button"></input>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    monsters: state.monsters.monsters,
    monsterBehaviors: state.monsterBehaviors.behaviors,
    monsterDropLists: state.dropLists.monster,
    displayId: state.detail.targetId,
    breadcrumbFormdata: state.breadcrumb.formData,
    breadcrumbFormdataName: state.breadcrumb.formDataName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchMonsters: () => dispatch(fetchMonsters()),
    loadMonsterDetails: () => dispatch(loadMonsterDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterForm);