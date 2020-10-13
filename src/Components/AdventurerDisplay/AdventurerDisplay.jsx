import React from 'react';
import './AdventurerDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchAdventurers, loadAdventurerDetails } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js utility imports

class AdventurerDisplay extends DisplayStatic {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    if (!this.props.adventurerClasses || !this.props.townBehaviors || !this.props.dungeonBehaviors) {
      this.props.loadAdventurerDetails();
    }
  }

  getDeleteButton() {
    return (
      <div className="DeleteAdventurerButton">
        <DeleteButton />
      </div>
    );
  }

  getDisplay() {
    const allAdventurers = this.props.adventurers;
    const thisAdventurer = allAdventurers.find(adventurer => adventurer.id === this.props.displayId);
    const {
      name,
      strength,
      speed,
      cunning,
      intelligence,
      constitution,
      dungeon_behavior_id,
      town_behavior_id,
      adventurer_class_id
    } = thisAdventurer;
    if (!this.props.dungeonBehaviors || !this.props.townBehaviors || !this.props.adventurerClasses) {
      return '';
    }
    const allDungeonBehaviors = this.props.dungeonBehaviors;
    const thisDungeonBehavior = allDungeonBehaviors.find(dungeonBehavior => dungeonBehavior.id === dungeon_behavior_id);
    const dungeonBehaviorName = thisDungeonBehavior.name;
    const allTownBehaviors = this.props.townBehaviors;
    const thisTownBehavior = allTownBehaviors.find(townBehavior => townBehavior.id === town_behavior_id);
    const townBehaviorName = thisTownBehavior.name;
    const allAdventurerClasses = this.props.adventurerClasses;
    const thisAdventurerClass = allAdventurerClasses.find(adventurerClass => adventurerClass.id === adventurer_class_id);
    const adventurerClassname = thisAdventurerClass.name;

    return (
      <div className="AdventurerDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="AdventurerEditButton" onClick={() => this.props.setDisplayForm({ form: 'adventurer', edit: true, targetId: thisAdventurer.id })}>
            <EditButton />
          </div>
        </div>
        <div className="display-fields-area">
          <div className="display-group">
            <span className="display-label">Name</span>
            <span className="display-text">{name}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Strength</span>
            <span className="display-text">{strength}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Speed</span>
            <span className="display-text">{speed}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Cunning</span>
            <span className="display-text">{cunning}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Intelligence</span>
            <span className="display-text">{intelligence}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Constitution</span>
            <span className="display-text">{constitution}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Dungeon Behavior</span>
            <span className="display-text">{dungeonBehaviorName}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Town Behavior</span>
            <span className="display-text">{townBehaviorName}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Class</span>
            <span className="display-text">{adventurerClassname}</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    adventurers: state.adventurers.adventurers,
    displayId: state.detail.targetId,
    townBehaviors: state.behaviors.townBehaviors,
    dungeonBehaviors: state.behaviors.dungeonBehaviors,
    adventurerClasses: state.adventurerClasses.classes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchAdventurers: () => dispatch(fetchAdventurers()),
    loadAdventurerDetails: () => dispatch(loadAdventurerDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventurerDisplay);