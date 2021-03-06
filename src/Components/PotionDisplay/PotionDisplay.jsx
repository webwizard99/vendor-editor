import React from 'react';
import './PotionDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchPotions } from '../../actions';
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';
import deleteRequests from '../../utilities/deleteRequests';

class PotionDisplay extends DisplayStatic {
  constructor(props) {
    super(props);
    
    this.deletePotion = this.deletePotion.bind(this);
  }
  
  getDeleteButton() {
    const thisRef = this;
    window.dialogRef = thisRef;
    return (
      <div className="DeletePotionButton" 
        onClick={() => this.props.setDialog({
          active: true,
          text: 'Delete Potion from Database?'
      })}>
        <DeleteButton />
      </div>
    )
  }

  *deletePotion() {
    yield deleteRequests.makeRequest('potion', this.props.displayId);
  }

  handleYes() {
    let deletePotion = this.deletePotion();
    deletePotion.next().value.then(() => {
      this.props.fetchPotions();
      this.props.setDialog({ active: false, text: ''});
      this.props.setDisplayForm({ form: false, edit: false, targetId: null });
    });
  }
  
  getDisplay() {
    const allPotions = this.props.potions;
    const thisPotion = allPotions.find(potion => potion.id === this.props.displayId);
    const name = thisPotion.item.name;
    const value = thisPotion.item.value;
    const details = thisPotion.item.details;
    const rarity = thisPotion.item.rarity;
    const potionType = thisPotion.type;
    const level = thisPotion.level;
    
    return (
      <div className="PotionDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="PotionEditButton" onClick={()=> this.props.setDisplayForm({ form: formTypes.potion, edit: true, targetId: thisPotion.id })}>
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
            <span className="display-label">Type</span>
            <span className="display-text">{potionType}</span>
          </div>
          <div className="display-group">
            <span className="display-label">Level</span>
            <span className="display-number">{level}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    potions: state.potions.potions,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload }),
    fetchPotions: () => dispatch(fetchPotions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PotionDisplay);