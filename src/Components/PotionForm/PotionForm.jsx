import React from 'react';
import './PotionForm.css';

// import endpoint for Post request
// import endpoints from '../../utilities/endpoints';

import potionTypes from '../../utilities/potionTypes';

import DisplayForm from '../DisplayForm/DisplayForm';

class PotionForm extends DisplayForm {
  getPotionOptions() {
    return potionTypes.map(potionType => {
      return <option value={potionType}>{potionType}</option>
    })
  }

  getForm() {
    return (
      <div className="PotionForm">
        <h2 className="form-heading">New Potion</h2>
        <form action={'/potions'}
          className="input-fields-area"
          id="PotionPostForm"
          method="POST">
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="potion name"
                maxLength="26"></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="value">Value</label>
              <input type="number" name="value" id="value" className="input-number" placeholder="#"
                min="1" max="10000"></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="details">Details</label>
              <input type="text" name="details" id="details" className="input-text" placeholder="details..."
                maxLength="200"></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="type">Type</label>
              <select className="potion-select" name="type" id="type">
                {this.getPotionOptions()}
              </select>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="level">Level</label>
              <input type="number" name="level" id="level" className="input-number" placeholder="#"></input>
            </div>
            <input type="hidden" name="key" id="key" value={process.env.EDITOR_API_KEY}></input>
            <input type="submit" value="Create Potion" class="button create-button"></input>
        </form>
      </div>
    )
  }
}

export default PotionForm;