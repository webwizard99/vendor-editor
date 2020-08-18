import React from 'react';
import './ArmorForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { fetchArmor } from '../../actions'
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import itemPostRequest from '../../utilities/itemPostRequests';
import itemPutRequest from '../../utilities/itemPutRequests';

class ArmorForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.addArmor = this.addArmor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: 'armor', targetId: this.props.displayId, edit: false});
    }
  }

  *addArmor(data) {
    if (this.props.edit) {
      yield itemPutRequest.makeRequest('armor', data);
    } else {
      yield itemPostRequest.makeRequest('armor', data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.addArmor = this.addArmor(data);
    this.addArmor.next().value.then(() => {
      this.props.fetchArmor();
      if (this.props.edit) {
        this.props.setDisplayForm({ form: 'armor', targetId: this.props.displayId, edit: false });
      } else {
        this.props.setDisplayForm({ form: null, targetId: null, edit: false });
      }
    })
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
          onSubmit={this.handleSubmit}
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
            <input type="submit" value={this.props.edit ? 'Update Armor' : 'Create Armor' } className="button create-button"></input>
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
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchArmor: () => dispatch(fetchArmor())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArmorForm);