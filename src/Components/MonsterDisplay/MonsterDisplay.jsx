import React from 'react';
import './MonsterDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchMonsters, loadMonsterDetails } from '../../actions';
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';
import boolean from '../../utilities/boolean';
import deleteRequests from '../../utilities/deleteRequests';

class MonsterDisplay extends DisplayStatic {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false
    }

    this.setInitialized = this.setInitialized.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.deleteMonster = this.deleteMonster.bind(this);
  }

  componentDidMount() {
    if (!this.props.monsterDropLists || !this.props.monsterBehaviors) {
      this.props.loadMonsterDetails();
      this.setInitialized(true);
    } else {
      if (!this.state.initialized) {
        this.setInitialized(true);
      }
    }
  }

  componentDidUpdate() {
    if(!this.state.initialized && (this.props.monsterBehaviors && this.props.monsterDropLists)) {
      this.setInitialized(true);
    }
  }

  setInitialized(val) {
    this.setState({ initialized: val });
  }

  getDeleteButton() {
    const thisRef = this;
    window.dialogRef = thisRef;
    return (
      <div className="DeleteMonsterButton"
        onClick={() => this.props.setDialog({
          active: true,
          text: 'Delete Monster from Database?'
        })}>
        <DeleteButton />
      </div>
    )
  }

  *deleteMonster() {
    yield deleteRequests.makeRequest('monster', this.props.displayId);
  }

  handleYes() {
    const deleteMonster = this.deleteMonster();
    deleteMonster.next().value.then(() => {
      this.props.fetchMonsters();
      this.props.setDialog({ active: false, text: '' });
      this.props.setDisplayForm({ form: false, edit: false, targetId: null });
    })
  }

  getDisplay() {
    if (!this.props.monsters || !this.state.initialized) return '';
    const allMonsters = this.props.monsters;
    const thisMonster = allMonsters.find(monster => monster.id === this.props.displayId);
    const {
      name,
      boss,
      level,
      hp,
      damage,
      defense,
      stealth,
      initiative,
      special,
      heal,
      dropListId,
      monsterBehaviorId
    } = thisMonster;
    const allMonsterDropLists = this.props.monsterDropLists;
    const thisMonsterDropList = allMonsterDropLists.find(dropList => dropList.id === dropListId);
    const monsterDropListName = thisMonsterDropList.monster_drop_list.name;
    const allMonsterBehaviors = this.props.monsterBehaviors;
    const thisMonsterBehavior = allMonsterBehaviors.find(monsterBehavior => monsterBehavior.id === monsterBehaviorId);
    const monsterBehaviorName = thisMonsterBehavior.name;

    return (
      <div className="MonsterDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="AdventurerEditButton" onClick={() => this.props.setDisplayForm({ form: formTypes.monster, edit: true, targetId: thisMonster.id })}>
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
            <span className="display-label">level</span>
            <span className="display-text">{level}</span>
          </div>
          <div className="display-group">
            <span className="display-label">hp</span>
            <span className="display-text">{hp}</span>
          </div>
          <div className="display-group">
            <span className="display-label">damage</span>
            <span className="display-text">{damage}</span>
          </div>
          <div className="display-group">
            <span className="display-label">defense</span>
            <span className="display-text">{defense}</span>
          </div>
          <div className="display-group">
            <span className="display-label">stealth</span>
            <span className="display-text">{stealth}</span>
          </div>
          <div className="display-group">
            <span className="display-label">initiative</span>
            <span className="display-text">{initiative}</span>
          </div>
          <div className="display-group">
            <span className="display-label">special</span>
            <span className="display-text">{special}</span>
          </div>
          <div className="display-group">
            <span className="display-label">heal</span>
            <span className="display-text">{heal}</span>
          </div>
          <div className="display-group">
            <span className="display-label">drop list</span>
            <span className="display-text">{monsterDropListName}</span>
          </div>
          <div className="display-group">
            <span className="display-label">behavior</span>
            <span className="display-text">{monsterBehaviorName}</span>
          </div>
        </div>
      </div>
    )
      
    
  }
}

const mapStateToProps = state => {
  return {
    monsters: state.monsters.monsters,
    displayId: state.detail.targetId,
    monsterBehaviors: state.monsterBehaviors.behaviors,
    monsterDropLists: state.dropLists.monster
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload }),
    fetchMonsters: () => dispatch(fetchMonsters()),
    loadMonsterDetails: () => dispatch(loadMonsterDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterDisplay);