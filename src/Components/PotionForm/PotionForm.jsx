import React from 'react';
import './PotionForm.css';

import potionTypes from '../../utilities/potionTypes';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { SET_DETAIL_FORM } from '../../actions/types';

class PotionForm extends DisplayForm {
  getPotionOptions() {
    return potionTypes.map(potionType => {
      return <option value={potionType}>{potionType}</option>
    })
  }

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
      this.props.setDisplayForm({ form: 'potion', targetId: this.props.displayId, edit: false});
    }
  }

  getForm() {
    let newHeading = 'New Potion';
    let newName = '';
    let newValue = '';
    let newDetails = '';
    let newPotionType = '';
    let newLevel = '';
    let newId = null;
    let newItemId = null;

    if (this.props.edit) {
      const allPotions = this.props.potions;
      const thisPotion = allPotions.find(potion => potion.id === this.props.displayId);
      newName = thisPotion.item.name;
      newValue = thisPotion.item.value;
      newDetails = thisPotion.item.details;
      newPotionType = thisPotion.type;
      newLevel = thisPotion.level;
      newHeading = newName;
      newId = thisPotion.id;
      newItemId = thisPotion.itemId;
    }
    
    return (
      <div className="PotionForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">{newHeading}</h2>
          <div className="close-potion-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>
        
        <form action={'/potions'}
          className="input-fields-area"
          id="PotionPostForm"
          method="POST">
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="potion name"
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
              <label className="item-label" htmlFor="type">Type</label>
              <select className="potion-select" name="type" id="type" defaultValue={newPotionType}>
                {this.getPotionOptions()}
              </select>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="level">Level</label>
              <input type="number" name="level" id="level" className="input-number" placeholder="#" defaultValue={newLevel}></input>
            </div>
            <input type="hidden" name="id" value={newId} />
            <input type="hidden" name="itemId" value={newItemId} />
            <input type="hidden" name="_METHOD" value={this.getMethod()}/>
            <input type="submit" value={this.props.edit ? 'Create Potion' : 'Update Potion'} class="button create-button"></input>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    potions: state.potions.potions,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PotionForm);