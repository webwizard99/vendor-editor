import React from 'react';
import './PotionDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import * as actions from '../../actions'
import { SET_DETAIL_FORM, SET_DIALOG, SET_POTIONS } from '../../actions/types';

// js utility imports
import deleteRequests from '../../utilities/deleteRequests';

class PotionDisplay extends DisplayStatic {
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

  handleYes() {
    console.log('Delete handler in potion display component reached!');
    const delRes = deleteRequests.makeRequest('potion', this.props.displayId);
    console.log(delRes);
    this.props.fetchPotions();
    this.props.setDialog({ active: false, text: ''});
  }
  
  getDisplay() {
    const allPotions = this.props.potions;
    const thisPotion = allPotions.find(potion => potion.id === this.props.displayId);
    const name = thisPotion.item.name;
    const value = thisPotion.item.value;
    const details = thisPotion.item.details;
    const potionType = thisPotion.type;
    const level = thisPotion.level;
    
    return (
      <div className="PotionDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="PotionEditButton" onClick={()=> this.props.setDisplayForm({ form: 'potion', edit: true, targetId: thisPotion.id })}>
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
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload })
  }
}

const allDispatches = {
  ...mapDispatchToProps,
  ...actions
}

export default connect(mapStateToProps, allDispatches)(PotionDisplay);