import React from 'react';
import './TownBehaviorForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { fetchTownBehaviors } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import postRequest from '../../utilities/itemPostRequests';
import putRequest from '../../utilities/itemPutRequests';

class TownBehaviorForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.addTownBehavior = this.addTownBehavior.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: 'town_behavior', targetId: this.props.displayId, edit: false });
    }
  }

  *addTownBehavior(data) {
    if (this.props.edit) {
      yield putRequest.makeRequest('town_behavior', data);
    } else {
      yield postRequest.makeRequest('town_behavior', data);
    }
    
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.addTownBehavior = this.addTownBehavior(data);
    this.addTownBehavior.next().value.then(() => {
      this.props.fetchTownBehaviors();
      if (this.props.edit) {
        this.props.setDisplayForm({ form: 'town_behavior', targetId: this.props.displayId, edit: false });
      } else {
        this.props.setDisplayForm({ form: null, targetId: null, edit: false })
      }
    })
  }

  getForm() {
    let newHeading = 'New Town Behavior';
    let newName = '';
    let newId;
    let newBuyPotion = 0;
    let newSellPotion = 0;
    let newUpgradePotion = 0;
    let newBuyWeapon = 0;
    let newSellWeapon = 0;
    let newUpgradeWeapon = 0;
    let newBuyArmor = 0;
    let newSellArmor = 0;
    let newUpgradeArmor = 0;
    let newWealth = 0;
    let newEnterDungeon = 0;
    let newUseTavern = 0;
    let newRetire = 0;
    let newEmigrate = 0;
    let newGarisonWall = 0;

    if (this.props.edit) {
      const allTownBehaviors = this.props.townBehaviors;
      const thisTownBehavior = allTownBehaviors.find(townBehavior => townBehavior.id = this.props.displayId);
      console.log(thisTownBehavior);
      newName = thisTownBehavior.name;
      newHeading = newName;
      newId = thisTownBehavior.id;
      newBuyPotion = thisTownBehavior.buy_potion;
      newSellPotion = thisTownBehavior.sell_potion;
      newUpgradePotion = thisTownBehavior.upgrade_potion;
      newBuyWeapon = thisTownBehavior.buy_weapon;
      newSellWeapon= thisTownBehavior.sell_weapon;
      newUpgradeWeapon = thisTownBehavior.upgrade_weapon;
      newBuyArmor = thisTownBehavior.buy_armor;
      newSellArmor = thisTownBehavior.sell_armor;
      newUpgradeArmor = thisTownBehavior.upgrade_armor;
      newWealth = thisTownBehavior.wealth;
      newEnterDungeon = thisTownBehavior.enter_dungeon;
      newUseTavern = thisTownBehavior.use_tavern;
      newRetire = thisTownBehavior.retire;
      newEmigrate = thisTownBehavior.emigrate;
      newGarisonWall = thisTownBehavior.garrison_wall;
    }
    return (
      <div className="TownBehaviorForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">Town Behavior: {newHeading}</h2>
          <div className="close-town-behavior-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>

      <form action={'/town_behaviors'}
        className="input-fields-area"
        id="TownBehaviorPostForm"
        method="POST"
        onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label className="item-label" htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className="input-text" placeholder="behavior name"
              maxLength="26" required defaultValue={newName}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="buy_potion">buy potion</label>
            <input type="number" name="buy_potion" id="buy_potion" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newBuyPotion}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="sell_potion">sell potion</label>
            <input type="number" name="sell_potion" id="sell_potion" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newSellPotion}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="upgrade_potion">upgrade potion</label>
            <input type="number" name="upgrade_potion" id="upgrade_potion" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newUpgradePotion}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="buy_weapon">buy weapon</label>
            <input type="number" name="buy_weapon" id="buy_weapon" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newBuyWeapon}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="sell_weapon">sell weapon</label>
            <input type="number" name="sell_weapon" id="sell_weapon" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newSellWeapon}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="upgrade_weapon">upgrade weapon</label>
            <input type="number" name="upgrade_weapon" id="upgrade_weapon" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newUpgradeWeapon}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="buy_armor">buy armor</label>
            <input type="number" name="buy_armor" id="buy_armor" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newBuyArmor}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="sell_armor">sell armor</label>
            <input type="number" name="sell_armor" id="sell_armor" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newSellArmor}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="upgrade_armor">upgrade armor</label>
            <input type="number" name="upgrade_armor" id="upgrade_armor" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newUpgradeArmor}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="wealth">wealth</label>
            <input type="number" name="wealth" id="wealth" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newWealth}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="enter_dungeon">enter dungeon</label>
            <input type="number" name="enter_dungeon" id="enter_dungeon" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newEnterDungeon}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="use_tavern">use tavern</label>
            <input type="number" name="use_tavern" id="use_tavern" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newUseTavern}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="retire">retire</label>
            <input type="number" name="retire" id="retire" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newRetire}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="emigrate">emigrate</label>
            <input type="number" name="emigrate" id="emigrate" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newEmigrate}></input>
          </div>
          <div className="input-group">
            <label className="item-label" htmlFor="garrison_wall">garrison wall</label>
            <input type="number" name="garrison_wall" id="garrison_wall" className="input-number" placeholder="#"
              step="50" min="0" max="1000" required defaultValue={newGarisonWall}></input>
          </div>
          <input type="hidden" name="id" value={newId} />
          <input type="submit" value={this.props.edit ? 'Update Town Behavior' : 'Create Town Behavior' } className="button create-button"></input>
        </form>
      </div>
    )
  }
  
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    townBehaviors: state.behaviors.townBehaviors,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchTownBehaviors: () => dispatch(fetchTownBehaviors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TownBehaviorForm);