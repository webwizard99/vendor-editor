import React from 'react';
import './DungeonBehaviorForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { fetchDungeonBehaviors } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import formTypes from '../../utilities/formTypes';
import postRequest from '../../utilities/itemPostRequests';
import putRequest from '../../utilities/itemPutRequests';

class DungeonBehaviorForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDungeonBehavior = this.addDungeonBehavior.bind(this);
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: formTypes.dungeon_behavior, targetId: this.props.displayId, edit: false });
    }
  }

  *addDungeonBehavior(data) {
    if (this.props.edit) {
      yield putRequest.makeRequest('dungeon_behavior', data);
    } else {
      yield postRequest.makeRequest('dungeon_behavior', data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.addDungeonBehavior = this.addDungeonBehavior(data);
    this.addDungeonBehavior.next().value.then(() => {
      this.props.fetchDungeonBehaviors();
      if (this.props.edit) {
        this.props.setDisplayForm({ form: formTypes.dungeon_behavior, targetId: this.props.displayId, edit: false });
      } else {
        this.props.setDisplayForm({ form: null, targetId: null, edit: false });
      }
    })
  }

  getForm() {
    let newHeading ='New Dungeon Behavior';
    let newName = '';
    let newId;
    let newAdvanceTile = 0;
    let newConserveHealth = 0;
    let newUsePotion = 0;
    let newRest = 0;
    let newReturnToTown = 0;
    let newCheckForTraps = 0;
    let newDisarmTrap = 0;
    let newAvoidTrap = 0;
    let newSearchForTreasure = 0;
    let newFightMonster = 0;
    let newFleeEncounter = 0;
    let newDefend = 0;
    let newAttack = 0;
    let newCheckMonsterWeakness = 0;
    let newExploreLevel = 0;
    let newAdvanceNextLevel = 0;
    let newFillInventory = 0;
    let newUpgradeInventory = 0;
    let newFightBossMonster = 0;
    let newPreferWeakerMonster = 0;
    let newTryForLevel = 0;

    if (this.props.edit) {
      const allDungeonBehaviors = this.props.dungeonBehaviors;
      const thisDungeonBehavior = allDungeonBehaviors.find(dungeonBehavior => dungeonBehavior.id === this.props.displayId);
      newName = thisDungeonBehavior.name;
      newHeading = newName;
      newId = thisDungeonBehavior.id;
      newAdvanceTile = thisDungeonBehavior.advance_tile;
      newConserveHealth = thisDungeonBehavior.conserve_health;
      newUsePotion = thisDungeonBehavior.use_potion;
      newRest = thisDungeonBehavior.rest;
      newReturnToTown = thisDungeonBehavior.return_to_town;
      newCheckForTraps = thisDungeonBehavior.check_for_traps;
      newDisarmTrap = thisDungeonBehavior.disarm_trap;
      newAvoidTrap = thisDungeonBehavior.avoid_trap;
      newSearchForTreasure = thisDungeonBehavior.search_for_treasure;
      newFightMonster = thisDungeonBehavior.fight_monster;
      newFleeEncounter = thisDungeonBehavior.flee_encounter;
      newDefend = thisDungeonBehavior.defend;
      newAttack = thisDungeonBehavior.attack;
      newCheckMonsterWeakness = thisDungeonBehavior.check_monster_weakness;
      newExploreLevel = thisDungeonBehavior.explore_level;
      newAdvanceNextLevel = thisDungeonBehavior.advance_next_level;
      newFillInventory = thisDungeonBehavior.fill_inventory;
      newUpgradeInventory = thisDungeonBehavior.upgrade_inventory;
      newFightBossMonster = thisDungeonBehavior.fight_boss_monster;
      newPreferWeakerMonster = thisDungeonBehavior.prefer_weaker_monster;
      newTryForLevel = thisDungeonBehavior.try_for_level;
    }
    return (
      <div className="DungeonBehaviorForm extended">
        <div className="form-heading-bar">
          <h2 className="form-heading">Dungeon Behavior: {newHeading}</h2>
          <div className="close-dungeon-behavior-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>
        <form action={'/dungeon_behavior'}
          className="input-fields-area"
          id="DungeonBehaviorPostForm"
          method="POST"
          onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="behavior name"
                maxLength="26" required defaultValue={newName}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="advance_tile">advance tile</label>
              <input type="number" name="advance_tile" id="advance_tile" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newAdvanceTile}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="conserve_health">conserve health</label>
              <input type="number" name="conserve_health" id="conserve_health" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newConserveHealth}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="use_potion">use potion</label>
              <input type="number" name="use_potion" id="use_potion" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newUsePotion}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="rest">rest</label>
              <input type="number" name="rest" id="rest" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newRest}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="return_to_town">return to town</label>
              <input type="number" name="return_to_town" id="return_to_town" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newReturnToTown}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="check_for_traps">check for traps</label>
              <input type="number" name="check_for_traps" id="check_for_traps" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newCheckForTraps}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="disarm_trap">disarm trap</label>
              <input type="number" name="disarm_trap" id="disarm_trap" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newDisarmTrap}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="avoid_trap">avoid trap</label>
              <input type="number" name="avoid_trap" id="avoid_trap" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newAvoidTrap}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="search_for_treasure">search for treasure</label>
              <input type="number" name="search_for_treasure" id="search_for_treasure" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newSearchForTreasure}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="fight_monster">fight monster</label>
              <input type="number" name="fight_monster" id="fight_monster" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newFightMonster}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="flee_encounter">flee encounter</label>
              <input type="number" name="flee_encounter" id="flee_encounter" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newFleeEncounter}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="defend">defend</label>
              <input type="number" name="defend" id="defend" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newDefend}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="attack">attack</label>
              <input type="number" name="attack" id="attack" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newAttack}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="check_monster_weakness">check monster weakness</label>
              <input type="number" name="check_monster_weakness" id="check_monster_weakness" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newCheckMonsterWeakness}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="explore_level">explore level</label>
              <input type="number" name="explore_level" id="explore_level" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newExploreLevel}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="advance_next_level">advance next level</label>
              <input type="number" name="advance_next_level" id="advance_next_level" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newAdvanceNextLevel}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="fill_inventory">fill inventory</label>
              <input type="number" name="fill_inventory" id="fill_inventory" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newFillInventory}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="upgrade_inventory">upgrade inventory</label>
              <input type="number" name="upgrade_inventory" id="upgrade_inventory" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newUpgradeInventory}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="fight_boss_monster">fight boss monster</label>
              <input type="number" name="fight_boss_monster" id="fight_boss_monster" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newFightBossMonster}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="prefer_weaker_monster">prefer weaker monster</label>
              <input type="number" name="prefer_weaker_monster" id="prefer_weaker_monster" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newPreferWeakerMonster}></input>
            </div>
            <div className="input-group">
              <label className="item-label" htmlFor="try_for_level">try for level</label>
              <input type="number" name="try_for_level" id="try_for_level" className="input-number" placeholder="#"
                step="50" min="0" max="1000" required defaultValue={newTryForLevel}></input>
            </div>
            <input type="hidden" name="id" value={newId} />
            <input type="submit" value={this.props.edit ? 'Update Dungeon Behavior' : 'Create Dungeon Behavior' } className="button create-button"></input>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    dungeonBehaviors: state.behaviors.dungeonBehaviors,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchDungeonBehaviors: () => dispatch(fetchDungeonBehaviors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonBehaviorForm);