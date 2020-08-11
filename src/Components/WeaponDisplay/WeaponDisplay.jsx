import React from 'react';
import './WeaponDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

//redux imports
import { connect } from 'react-redux';
import { SET_DETAIL_FORM } from '../../actions/types';

class WeaponDisplay extends DisplayStatic {
  getDeleteButton() {
    return (
      <div className="DeleteWeaponButton">
        <DeleteButton />
      </div>
    )
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
          <div className="WeaponEditButton" onClick={() => this.props.setDisplayForm({ form: 'weapon', edit: true, targetId: thisWeapon.id })}>
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
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponDisplay);