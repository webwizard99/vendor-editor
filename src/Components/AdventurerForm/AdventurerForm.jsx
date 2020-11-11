import React from 'react'
import './AdventurerForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { fetchAdventurers, loadAdventurerDetails } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import formTypes from '../../utilities/formTypes';
import postRequest from '../../utilities/itemPostRequests';
import putRequest from '../../utilities/itemPutRequests';

class AdventurerForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getDungeonBehaviorOptions = this.getDungeonBehaviorOptions.bind(this);
    this.getTownBehaviorOptions = this.getTownBehaviorOptions.bind(this);
    this.getAdventurerClassOptions = this.getAdventurerClassOptions.bind(this);
    this.addAdventurer = this.addAdventurer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDungeonBehaviorOptions() {
    const dungeonOptions = this.props.dungeonBehaviors;
    return dungeonOptions.map(dungeonOption => {
      return <option value={dungeonOption.id}>{dungeonOption.name}</option>
    });
  }

  getTownBehaviorOptions() {
    const townOptions = this.props.townBehaviors;
    return townOptions.map(townOption => {
      return <option value={townOption.id}>{townOption.name}</option>
    });
  }

  getAdventurerClassOptions() {
    const classOptions = this.props.adventurerClasses;
    return classOptions.map(classOption => {
      return <option value={classOption.id}>{classOption.name}</option>
    });
  }

  componentDidMount() {
    if (!this.props.townBehaviors || !this.props.dungeonBehaviors || !this.props.adventurerClasses) {
      this.props.loadAdventurerDetails();
    }
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: formTypes.adventurer, targetId: this.props.displayId, edit: false });
    }
  }

  *addAdventurer(data) {
    if (this.props.edit) {
      yield putRequest.makeRequest('adventurer', data);
    } else {
      yield postRequest.makeRequest('adventurer', data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.addAdventurer = this.addAdventurer(data);
    this.addAdventurer.next().value.then(() => {
      this.props.fetchAdventurers();
      if (this.props.edit) {
        this.props.setDisplayForm({ form: formTypes.adventurer, targetId: this.props.displayId, edit: false });
      } else {
        this.props.setDisplayForm({ form: null, targetId: null, edit: false });
      }
    })
  }

  getForm() {
    if (!this.props.townBehaviors || !this.props.dungeonBehaviors || !this.props.adventurerClasses) {
      return '';
    }
    let newHeading = 'New Adventurer';
    let newId;
    let newName = '';
    let newStrength = 0;
    let newSpeed = 0;
    let newCunning = 0;
    let newIntelligence = 0;
    let newConstitution = 0;
    let newDungeonBehavior, newTownBehavior, newAdventurerClass;

    if (this.props.edit) {
      const allAdventurers = this.props.adventurers;
      const thisAdventurer = allAdventurers.find(adventurer => adventurer.id === this.props.displayId);
      const allDungeonBehaviors = this.props.dungeonBehaviors;
      const thisDungeonBehavior = allDungeonBehaviors.find(dungeonBehavior => dungeonBehavior.id === thisAdventurer.dungeoBehaviorId);
      const allTownBehaviors = this.props.townBehaviors;
      const thisTownBehavior = allTownBehaviors.find(townBehavior => townBehavior.id === thisAdventurer.townBehaviorId);
      const allAdventurerClasses = this.props.adventurerClasses;
      const thisAdventurerClass = allAdventurerClasses.find(adventurerClass => adventurerClass.id === thisAdventurer.adventurerClassId);
      newId = thisAdventurer.id;
      newName = thisAdventurer.name;
      newHeading = newName;
      newStrength = thisAdventurer.strength;
      newSpeed = thisAdventurer.speed;
      newCunning = thisAdventurer.cunning;
      newIntelligence = thisAdventurer.intelligence;
      newConstitution = thisAdventurer.constitution;
      newDungeonBehavior = thisDungeonBehavior;
      newTownBehavior = thisTownBehavior;
      newAdventurerClass = thisAdventurerClass;
    }

    return (
      <div className="AdventurerForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">Adventurer: {newHeading}</h2>
          <div className="close-adventurer-class-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>
        
        <form action={'/adventurer'}
          className="input-fields-area"
          id="AdventurerPostForm"
          method="POST"
          onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="adventurer name"
                maxLength="26" required defaultValue={newName}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="strength">strength</label>
              <input type="number" name="strength" id="strength" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newStrength}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="speed">speed</label>
              <input type="number" name="speed" id="speed" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newSpeed}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="cunning">cunning</label>
              <input type="number" name="cunning" id="cunning" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newCunning}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="intelligence">intelligence</label>
              <input type="number" name="intelligence" id="intelligence" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newIntelligence}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="constitution">constitution</label>
              <input type="number" name="constitution" id="constitution" className="input-number" placeholder="#"
                min="0" max="10" required defaultValue={newConstitution}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="dungeonBehaviorId">dungeon behavior</label>
              <select className="dungeon-behavior-select"
                name="dungeonBehaviorId"
                id="dungeonBehaviorId"
                defaultValue={newDungeonBehavior === undefined ? null : newDungeonBehavior.id}>
                  {this.getDungeonBehaviorOptions()}
              </select>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="townBehaviorId">town behavior</label>
              <select className="town-behavior-select"
                name="townBehaviorId"
                id="townBehaviorId"
                defaultValue={newTownBehavior === undefined ? null : newTownBehavior.id}>
                  {this.getTownBehaviorOptions()}
              </select>  
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="adventurerClassId">class</label>
              <select className="adventurer-class-select"
                name="adventurerClassId"
                id="adventurerClassId"
                defaultValue={newAdventurerClass === undefined ? null : newAdventurerClass.id}>
                  {this.getAdventurerClassOptions()}
              </select>
            </div>
            <input type="hidden" name="id" value={newId} />
            <input type="submit" value={this.props.edit ? 'Update Adventurer' : 'Create Adventurer' } className="button create-button"></input>
        </form>
        <p>Points should total 15</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    adventurers: state.adventurers.adventurers,
    townBehaviors: state.behaviors.townBehaviors,
    dungeonBehaviors: state.behaviors.dungeonBehaviors,
    adventurerClasses: state.adventurerClasses.classes,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchAdventurers: () => dispatch(fetchAdventurers()),
    loadAdventurerDetails: () => dispatch(loadAdventurerDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventurerForm);