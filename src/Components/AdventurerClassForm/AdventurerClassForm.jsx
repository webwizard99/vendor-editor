import React from 'react';
import './AdventurerClassForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { fetchAdventurerClasses } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports

class AdventurerClassForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCloseButton(e) {
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: 'adventurer_class', targetId: this.props.displayId, edit: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  getForm() {
    let newHeading = 'New Adventurer Class';
    let newName = '';
    let newId;
    let newBargaining = 0;
    let newPerception = 0;
    let newArtifacts = 0;
    let newTraps = 0;
    let newAgility = 0;
    let newTactics = 0;
    let newMartialWeapons = 0;
    let newArmor = 0;
    let newAnatomy = 0;

    if (this.props.edit) {
      const allAdventurerClasses = this.props.adventurerClasses;
      const thisAdventurerClass = allAdventurerClasses.find(adventurerClass => adventurerClass.id === this.props.displayId);
      newName = thisAdventurerClass.name;
      newHeading = newName;
      newId = thisAdventurerClass.id;
      newBargaining = thisAdventurerClass.bargaining;
      newPerception = thisAdventurerClass.perception;
      newArtifacts = thisAdventurerClass.artifacts;
      newTraps = thisAdventurerClass.traps;
      newAgility = thisAdventurerClass.agility;
      newTactics = thisAdventurerClass.tactics;
      newMartialWeapons = thisAdventurerClass.martial_weapons;
      newArmor = thisAdventurerClass.armor;
      newAnatomy = thisAdventurerClass.anatomy;
    }
    return (
      <div className="AdventurerClassForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">Adventurer Class: {newHeading}</h2>
          <div className="close-adventurer-class-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>

        <form action={'/adventurer_class'}
          className="input-fields-area"
          id="AdventurerClassPostForm"
          method="POST"
          onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="class name"
                maxLength="26" required defaultValue={newName}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="bargaining">bargaining</label>
              <input type="number" name="bargaining" id="bargaining" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newBargaining}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="perception">perception</label>
              <input type="number" name="perception" id="perception" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newPerception}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="artifacts">artifacts</label>
              <input type="number" name="artifacts" id="artifacts" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newArtifacts}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="traps">traps</label>
              <input type="number" name="traps" id="traps" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newTraps}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="agility">agility</label>
              <input type="number" name="agility" id="agility" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newAgility}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="tactics">tactics</label>
              <input type="number" name="tactics" id="tactics" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newTactics}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="martial_weapons">martial weapon</label>
              <input type="number" name="martial_weapons" id="martial_weapons" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newMartialWeapons}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="armor">armor</label>
              <input type="number" name="armor" id="armor" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newArmor}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="anatomy">anatomy</label>
              <input type="number" name="anatomy" id="anatomy" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newAnatomy}></input>
            </div>
            <input type="hidden" name="id" value={newId} />
            <input type="submit" value={this.props.edit ? 'Update Adventurer Class' : 'Create Adventurer Class' } className="button create-button"></input>
          </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    adventurerClasses: state.adventurerClasses.classes,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchAdventurerClasses: () => dispatch(fetchAdventurerClasses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventurerClassForm);
