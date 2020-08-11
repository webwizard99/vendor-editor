import React from 'react';
import './ArmorForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

import { connect } from 'react-redux';
import { SET_DETAIL_FORM } from '../../actions/types';

class ArmorForm extends DisplayForm {
  getMethod() {
    if (!this.props.edit) {
      return '_post'
    } else {
      return '_put'
    }
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: 'armor', targetId: this.props.displayId, edit: false});
    }
  }

  getForm() {
    let newHeading = 'New Armor';
    let newName = '';
    let newValue = '';
    let newDetails = '';
    let newRarity = 1000;
    let newLevel = '';
    let newArmor = 1;
    let newId = null;
    let newItemId = null;

    if (this.props.edit) {
      const allArmor = this.props.armor;
      const thisArmor = allArmor.find(armor => armor.id === this.props.displayId);
      newName = thisArmor.item.name;
      newValue = thisArmor.item.value;
      newDetails = thisArmor.item.details;
      newRarity = thisArmor.item.rarity;
      newLevel = thisArmor.level;
      newArmor = thisArmor.armor;
      newHeading = newName;
      newId = thisArmor.id;
      newItemId = thisArmor.itemId;
    }


    
    return (
      <div className="ArmorForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">{newHeading}</h2>
          <div className="close-armor-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>

        <form action={'/armor'}
          className="input-fields-area"
          id="ArmorPostForm"
          method="POST">
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="armor name"
                maxLength="26" defaultValue={newName}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="value">Value</label>
              <input type="number" name="value" id="value" className="input-number" placeholder="#"
                min="1" max="10000" defaultValue={newValue}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="details">Details</label>
              <input type="text" name="details" id="details" className="input-text" placeholder="details..."
                maxLength="200" defaultValue={newDetails}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="rarity">Rarity</label>
              <input type="number" name="rarity" id="rarity" className="input-number" placeholder="#"
                min="1" max="1000" defaultValue={newRarity}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="level">Level</label>
              <input type="number" name="level" id="level" className="input-number" placeholder="#" defaultValue={newLevel}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="armor">Armor</label>
              <input type="number" name="armor" id="armor" className="input-number" placeholder="#" defaultValue={newArmor}></input>
            </div>
            <input type="hidden" name="id" value={newId} />
            <input type="hidden" name="itemId" value={newItemId} />
            <input type="hidden" name="_METHOD" value={this.getMethod()}/>
            <input type="submit" value={this.props.edit ? 'Update Armor' : 'Create Armor' } class="button create-button"></input>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    armor: state.armor.armor,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArmorForm);