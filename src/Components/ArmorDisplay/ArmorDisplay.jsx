import React from 'react';
import './ArmorDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports
import deleteRequests from '../../utilities/deleteRequests';

class ArmorDisplay extends DisplayStatic {
  getDeleteButton() {
    const thisRef = this;
    window.dialogRef = thisRef;
    return (
      <div className="DeleteArmorButton"
      onClick={() => this.props.setDialog({
        active: true,
        text: 'Delete Armor from Database?'
      })}>
        <DeleteButton />
      </div>
    )
  }

  handleYes() {
    deleteRequests.makeRequest('armor', this.props.displayId);
    this.props.setDialog({ active: false, text: '' });
  }

  getDisplay() {
    const allArmor = this.props.armor;
    const thisArmor = allArmor.find(armor => armor.id === this.props.displayId);
    const name = thisArmor.item.name;
    const value = thisArmor.item.value;
    const details = thisArmor.item.details;
    const rarity = thisArmor.item.rarity;
    const level = thisArmor.level;
    const armor = thisArmor.armor;

    return (
      <div className="ArmorDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="WeaponEditButton" onClick={() => this.props.setDisplayForm({ form: 'armor', edit: true, targetId: thisArmor.id })}>
            <EditButton />
          </div>
        </div>

        <div className="display-fields-area">
        <div className="display-group">
            <span className="display-label">Name</span>
            <span className="display-text">{name}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Value</span>
            <span className="display-number">{value}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Details</span>
            <span className="display-text">{details}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Rarity</span>
            <span className="display-text">{rarity}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Level</span>
            <span className="display-number">{level}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Armor</span>
            <span className="display-text">{armor}</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    armor: state.armor.armor,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ArmorDisplay);