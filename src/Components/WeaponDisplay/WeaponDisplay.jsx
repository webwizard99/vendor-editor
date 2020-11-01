import React from 'react';
import './WeaponDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

//redux imports
import { connect } from 'react-redux';
import { fetchWeapons } from '../../actions';
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';
import deleteRequests from '../../utilities/deleteRequests';

class WeaponDisplay extends DisplayStatic {
  constructor(props) {
    super(props);

    this.deleteWeapon = this.deleteWeapon.bind(this);
  }
  
  getDeleteButton() {
    const thisRef = this;
    window.dialogRef = thisRef;
    return (
      <div className="DeleteWeaponButton"
        onClick={() => this.props.setDialog({
          active: true,
          text: 'Delete Weapon from Database?'
        })}>
        <DeleteButton />
      </div>
    )
  }

  *deleteWeapon() {
    yield deleteRequests.makeRequest('weapon', this.props.displayId);
  }

  handleYes() {
    let deleteWeapon = this.deleteWeapon();
    deleteWeapon.next().value.then(() => {
      this.props.fetchWeapons();
      this.props.setDialog({ active: false, text: '' });
      this.props.setDisplayForm({ form: false, edit: false, targetId: null });
    });
  }

  getDisplay() {
    const allWeapons = this.props.weapons;
    const thisWeapon = allWeapons.find(weapon => weapon.id === this.props.displayId);
    const name = thisWeapon.item.name;
    const value = thisWeapon.item.value;
    const details = thisWeapon.item.details;
    const rarity = thisWeapon.item.rarity;
    const level = thisWeapon.level;
    const damage = thisWeapon.damage;

    return (
      <div className="WeaponDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="WeaponEditButton" onClick={() => this.props.setDisplayForm({ form: formTypes.weapon, edit: true, targetId: thisWeapon.id })}>
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
            <span className="display-label">Damage</span>
            <span className="display-text">{damage}</span>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    weapons: state.weapons.weapons,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload }),
    fetchWeapons: () => dispatch(fetchWeapons())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponDisplay);