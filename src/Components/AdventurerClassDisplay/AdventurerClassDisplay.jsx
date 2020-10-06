import React from 'react';
import './AdventurerClassDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchAdventurerClasses } from '../../actions';
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports
import deleteRequests from '../../utilities/deleteRequests';

class AdventurerClassDisplay extends DisplayStatic {
  constructor(props) {
    super(props);

    this.deleteAdventurerClass = this.deleteAdventurerClass.bind(this);
  }

  getDeleteButton() {
    const thisRef = this;
    window.dialogRef = thisRef;
    return (
      <div className="DeleteAdventurerClassButton"
        onClick={() => this.props.setDialog({
          active: true,
          text: 'Delete Adventurer Class from Database?'
        })}>
        <DeleteButton />
      </div>
    );
  }

  *deleteAdventurerClass() {
    yield deleteRequests.makeRequest('adventurer_class', this.props.displayId);
  }

  handleYes() {
    const deleteAdventurerClass = this.deleteAdventurerClass();
    deleteAdventurerClass.next().value.then(() => {
      this.props.fetchAdventurerClasses();
      this.props.setDialog({ active: false, text: '' });
      this.props.setDisplayForm({ form: false, edit: false, targetId: null });
    });
  }

  getDisplay() {
    const allAdventurerClasses = this.props.adventurerClasses;
    const thisAdventurerClass = allAdventurerClasses.find(adventurerClass => adventurerClass.id === this.props.displayId);
    const {
      name,
      bargaining,
      perception,
      artifacts,
      traps,
      agility,
      tactics,
      martial_weapons,
      armor,
      anatomy
    } = thisAdventurerClass;

    return (
      <div className="AdventurerClassDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="AdventurerClassEditButton" onClick={() => this.props.setDisplayForm({ form: 'adventurer_class', edit: true, targetId: thisAdventurerClass.id })}>
            <EditButton />
          </div>
        </div>
        <div className="display-fields-area">
          <div className="display-group">
              <span className="display-label">Name</span>
              <span className="display-text">{name}</span>
          </div>
          <div className="display-group">
              <span className="display-label">Bargaining</span>
              <span className="display-text">{bargaining}</span>
          </div>
          <div className="display-group">
              <span className="display-label">Perception</span>
              <span className="display-text">{perception}</span>
          </div>
          <div className="display-group">
              <span className="display-label">Artifacts</span>
              <span className="display-text">{artifacts}</span>
          </div>
          <div className="display-group">
              <span className="display-label">Traps</span>
              <span className="display-text">{traps}</span>
          </div>
          <div className="display-group">
              <span className="display-label">Agility</span>
              <span className="display-text">{agility}</span>
          </div>
          <div className="display-group">
              <span className="display-label">Tactics</span>
              <span className="display-text">{tactics}</span>
          </div>
          <div className="display-group">
              <span className="display-label">Martial Weapons</span>
              <span className="display-text">{martial_weapons}</span>
          </div>
          <div className="display-group">
              <span className="display-label">Armor</span>
              <span className="display-text">{armor}</span>
          </div>
          <div className="display-group">
              <span className="display-label">Anatomy</span>
              <span className="display-text">{anatomy}</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    adventurerClasses: state.adventurerClasses.classes,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload }),
    fetchAdventurerClasses: () => dispatch(fetchAdventurerClasses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventurerClassDisplay);