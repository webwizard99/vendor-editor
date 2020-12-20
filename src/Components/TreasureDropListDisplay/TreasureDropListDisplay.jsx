import React from 'react';
import './TreasureDropListDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchTreasureDropLists, loadItems } from '../../actions';
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';
import itemTypes from '../../utilities/itemTypes';
import deleteRequests from '../../utilities/deleteRequests';

class TreasureDropListDisplay extends DisplayStatic {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getDrops = this.getDrops.bind(this);
    this.deleteDropList = this.deleteDropList.bind(this);
  }

  componentDidMount() {
    if (!this.props.armor || !this.props.potions || !this.props.weapons) {
      this.props.loadItems();
    }
  }

  getDeleteButton() {
    return (
      <div className="DeleteTreasureDropListButton"
        onClick={() => this.props.setDialog({
          active: true,
          text: 'Delete Treasure DropList and Drops from Database?'
        })}>
        <DeleteButton />
      </div>
    );
  }

  getDrops(drops) {
    if (!drops) return '';
    return (
      <div className="treasure-drops-display subgroup-display">
          <span className="display-label full-span">Drops</span>
          <span className="display-label pad half-span">Item</span>
          <span className="display-label pad half-span">Drop Chance</span>
          {drops.map(drop => {
            let itemName = ''
            switch (drop.drop_type) {
              case itemTypes.armor:
                let allArmor = this.props.armor;
                let thisArmor = allArmor.find(armor => armor.id === drop.itemId);
                itemName = thisArmor.item.name;
                break;
              case itemTypes.potion:
                let allPotions = this.props.potions;
                let thisPotion = allPotions.find(potion => potion.id === drop.itemId);
                itemName = thisPotion.item.name;
                break;
              case itemTypes.weapon:
                let allWeapons = this.props.weapons;
                let thisWeapon = allWeapons.find(weapon => weapon.id === drop.itemId);
                itemName = thisWeapon.item.name;
                break;
              default:
                itemName = 'Unknown Item Type'
            }

            return (
              <div className="inner-span">
                <span className="display-text half-span left-half">
                  {itemName}
                </span>
                <span className="display-text half-span right-half">
                  {drop.dropChance}
                </span>
              </div>
            )            
          })}
        </div>
    )
  }

  *deleteDropList(payload) {
    yield deleteRequests.makeRequestDropList(payload);
  }

  handleYes() {
    // compose payload for delete request
    let payload = {};
    payload.route = 'treasure_drop_list';
    payload.id = this.props.displayId;
    const allDropLists = this.props.treasureDropLists;
    const thisDropList = allDropLists.find(dropList => dropList.id === this.props.displayId);
    const treasureDropListId = thisDropList.treasure_drop_list.id;
    payload.treasureDropListId = treasureDropListId;
    const drops = thisDropList.drops;
    let dropIds = [];
    if (drops.length > 0) {
      drops.forEach(drop => {
        dropIds.push(drop.id);
      });
    }
    payload.dropIds = dropIds;

    // invoke delete request
    let deleteDropList = this.deleteDropList(payload);
    deleteDropList.next().value.then(() => {
      this.props.fetchTreasureDropLists();
      this.props.setDialog({ active: false, text: '' });
      this.props.setDisplayForm({ form: false, edit: false, targetId: null });
    });
  }

  getDisplay() {
    if (!this.props.treasureDropLists || !this.props.armor || !this.props.potions || !this.props.weapons) return '';
    const allTreasureDropLists = this.props.treasureDropLists;
    const thisDropList = allTreasureDropLists.find(dropList => dropList.id === this.props.displayId);
    const thisTreasureDropList = thisDropList.treasure_drop_list;
    const thisName = thisTreasureDropList.name;
    const thisGoldMin = thisDropList.gold_min;
    const thisGoldMax = thisDropList.gold_max;
    const thisGoldChance = thisDropList.gold_chance;
    const thisDrops = thisDropList.drops;

    return (
      <div className="TreasureDropListDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{thisName}</h2>
          <div className="TreasureDropListEditButton" onClick={() => this.props.setDisplayForm({ form: formTypes.treasure_drop_list, edit: true, targetId: this.props.displayId })}>
            <EditButton />
          </div>
        </div>
        <div className="display-group">
          <span className="display-label">gold min</span>
          <span className="display-text">{thisGoldMin}</span>
        </div>
        <div className="display-group">
          <span className="display-label">gold max</span>
          <span className="display-text">{thisGoldMax}</span>
        </div>
        <div className="display-group">
          <span className="display-label">gold chance</span>
          <span className="display-text">{thisGoldChance}</span>
        </div>
        {this.getDrops(thisDrops)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    treasureDropLists: state.dropLists.treasure,
    displayId: state.detail.targetId,
    armor: state.armor.armor,
    potions: state.potions.potions,
    weapons: state.weapons.weapons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload }),
    fetchTreasureDropLists: () => dispatch(fetchTreasureDropLists()),
    loadItems: () => dispatch(loadItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreasureDropListDisplay);