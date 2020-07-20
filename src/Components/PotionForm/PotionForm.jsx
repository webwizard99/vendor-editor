import React from 'react';
import './PotionForm.css';

// import endpoint for Post request
import endpoints from '../../utilities/endpoints';

import potionTypes from '../../utilities/potionTypes';

class PotionForm extends React.Component {
  getPotionOptions() {
    return potionTypes.map(potionType => {
      return <option value={potionType}>{potionType}</option>
    })
  }
  
  render() {
    return (
      <div className="PotionForm">
        <form action={endpoints.api_root + 'potions'}
          id="PotionPostForm"
          method="POST">
            <div className="input-group">
              <label className="item-label" htmlFor="name"></label>
              <input type="text" name="name" id="name" className="input-text" placeholder="potion name"
                maxLength="26"></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="value"></label>
              <input type="number" name="value" id="value" className="input-number" placeholder="#"
                min="1" max="10000"></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="details"></label>
              <input type="text" name="details" id="details" className="input-text" placeholder="details..."
                maxLength="200"></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="type"></label>
              <select className="potion-select" name="type" id="type">
                {this.getPotionOptions()}
              </select>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="level"></label>
              <input type="number" name="level" id="level" className="input-number" placeholder="#"></input>
            </div>
            <input type="hidden" name="key" id="key" value={process.env.EDITOR_API_KEY}></input>
            <input type="submit" value="Create Potion" class="create-button"></input>
        </form>
      </div>
    )
  }
}

export default PotionForm;