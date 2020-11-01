import React from 'react';
import './MonsterBehaviorForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { fetchMonsterBehaviors } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import formTypes from '../../utilities/formTypes';
import postRequest from '../../utilities/itemPostRequests';
import putRequest from '../../utilities/itemPutRequests';

class MonsterBehaviorForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.addMonsterBehavior = this.addMonsterBehavior.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: formTypes.monster_behavior, targetId: this.props.displayId, edit: false });
    }
  }

  *addMonsterBehavior(data) {
    if (this.props.edit) {
      yield putRequest.makeRequest('monster_behavior', data);
    } else {
      yield postRequest.makeRequest('monster_behavior', data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.addMonsterBehavior = this.addMonsterBehavior(data);
    this.addMonsterBehavior.next().value.then(() => {
      this.props.fetchMonsterBehaviors();
      if (this.props.edit) {
        this.props.setDisplayForm({ form: formTypes.monster_behavior, targetId: this.props.displayId, edit: false });
      } else {
        this.props.setDisplayForm({ form: null, targetId: null, edit: false });
      }
    })
  }

  getForm() {
    let newHeading = 'New Monster Behavior';
    let newName = '';
    let newId;
    let newConfrontWeakenedAdventurer = 0;
    let newSpecialMove = 0;
    let newDefend = 0;
    let newHeal = 0;
    let newBlockFlee = 0;
    let newMigrate = 0;

    if (this.props.edit) {
      const allMonsterBehaviors = this.props.monsterBehaviors;
      const thisMonsterBehavior = allMonsterBehaviors.find(monsterBehavior => monsterBehavior.id === this.props.displayId);
      newName = thisMonsterBehavior.name;
      newHeading = newName;
      newId = thisMonsterBehavior.id;
      newConfrontWeakenedAdventurer = thisMonsterBehavior.confront_weakened_adventurer;
      newSpecialMove = thisMonsterBehavior.special_move;
      newDefend = thisMonsterBehavior.defend;
      newHeal = thisMonsterBehavior.heal;
      newBlockFlee = thisMonsterBehavior.block_flee;
      newMigrate = thisMonsterBehavior.migrate;
    }
    return (
      <div className="MonsterBehaviorForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">Monster Behavior: {newHeading}</h2>
          <div className="close-monster-behavior-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>

        <form action={'/monster_behaviors'}
          className="input-fields-area"
          id="MonsterBehavior"
          method="POST"
          onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="behavior name"
                maxLength="26" required defaultValue={newName}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="confront_weakened_adventurer">confront weakened adventurer</label>
              <input type="number" name="confront_weakened_adventurer" id="confront_weakened_adventurer" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newConfrontWeakenedAdventurer}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="special_move">special move</label>
              <input type="number" name="special_move" id="special_move" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newSpecialMove}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="defend">defend</label>
              <input type="number" name="defend" id="defend" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newDefend}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="heal">heal</label>
              <input type="number" name="heal" id="heal" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newHeal}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="block_flee">block flee</label>
              <input type="number" name="block_flee" id="block_flee" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newBlockFlee}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="migrate">migrate</label>
              <input type="number" name="migrate" id="migrate" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newMigrate}></input>
            </div>
            <div className="input-group-blank">
            </div>
            <input type="hidden" name="id" value={newId} />
            <div className="supplier-submit-container">
            <input type="submit" value={this.props.edit ? 'Update Monster Behavior' : 'Create Monster Behavior' } className="button create-button"></input>
            </div>
        </form>
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    monsterBehaviors: state.monsterBehaviors.behaviors,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchMonsterBehaviors: () => dispatch(fetchMonsterBehaviors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterBehaviorForm);