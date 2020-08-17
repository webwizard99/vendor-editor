import React from 'react';
import './WeaponForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { fetchWeapons} from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import itemPostRequest from '../../utilities/itemPostRequests';
import itemPutRequest from '../../utilities/itemPutRequests';

class WeaponForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.addWeapon = this.addWeapon.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: 'weapon', targetId: this.props.displayId, edit: false});
    }
  }

  *addWeapon(data) {
    if (this.props.edit) {
      yield itemPutRequest.makeRequest('weapon', data);
    } else {
      yield itemPostRequest.makeRequest('weapon', data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    let addWeapon = this.addWeapon(data);
    addWeapon.next().value.then((res) => {
      this.props.fetchWeapons();
      if (this.props.edit) {
        this.props.setDisplayForm({ form: 'weapon', targetId: this.props.displayId, edit: false });
      } else {
        this.props.setDisplayForm({ form: 'weapon', targetId: res, edit: false });
      }
    });
  }

  getForm() {
    let newHeading = 'New Weapon';
    let newName = '';
    let newValue = '';
    let newDetails = '';
    let newRarity = 1000;
    let newLevel = '';
    let newDamage = 1;
    let newId = null;
    let newItemId = null;

    if (this.props.edit) {
      const allWeapons = this.props.weapons;
      const thisWeapon = allWeapons.find(weapon => weapon.id === this.props.displayId);
      newName = thisWeapon.item.name;
      newValue = thisWeapon.item.value;
      newDetails = thisWeapon.item.details;
      newRarity = thisWeapon.item.rarity;
      newLevel = thisWeapon.level;
      newDamage = thisWeapon.damage;
      newHeading = newName;
      newId = thisWeapon.id;
      newItemId = thisWeapon.itemId;
    }


    return (
      <div className="WeaponForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">{newHeading}</h2>
          <div className="close-weapon-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>

        <form action={'/weapons'}
          className="input-fields-area"
          id="WeaponPostForm"
          method="POST"
          onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="weapon name"
                maxLength="26" required defaultValue={newName}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="value">Value</label>
              <input type="number" name="value" id="value" className="input-number" placeholder="#"
                min="1" max="10000" required defaultValue={newValue}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="details">Details</label>
              <input type="text" name="details" id="details" className="input-text" placeholder="details..."
                maxLength="200" defaultValue={newDetails}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="rarity">Rarity</label>
              <input type="number" name="rarity" id="rarity" className="input-number" placeholder="#"
                min="1" max="1000" required defaultValue={newRarity}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="level">Level</label>
              <input type="number" required name="level" id="level" className="input-number" placeholder="#" defaultValue={newLevel}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="damage">Damage</label>
              <input type="number" required name="damage" id="damage" className="input-number" placeholder="#" defaultValue={newDamage}></input>
            </div>
            <input type="hidden" name="id" value={newId} />
            <input type="hidden" name="itemId" value={newItemId} />
            <input type="submit" value={this.props.edit ? 'Update Weapon' : 'Create Weapon' } class="button create-button"></input>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    weapons: state.weapons.weapons,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchWeapons: () => dispatch(fetchWeapons())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponForm);