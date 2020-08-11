import React from 'react';
import './WeaponsList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { SET_DETAIL_FORM } from '../../actions/types';

class WeaponsList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
  }

  getTitle() {
    return 'Weapons';
  }

  getNewButton() {
    return (
      <div className="NewWeaponButton" onClick={() => this.props.setDisplayForm({ form: 'weapon', edit: false, targetId: null })}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.weapons) {
      return '';
    } else {
      const newWeapons = this.props.weapons;
      return (
        <div className="detailList">
          { newWeapons.map(weapon => {
            let weaponClass = "ListDetail";
            if (this.props.form === "weapon" && this.props.targetId === weapon.id) {
              weaponClass += " activeItem"
            }
            return (
              <div>
                <span className={weaponClass}
                onClick={() => this.props.setDisplayForm({ form: 'weapon', edit: false, targetId: weapon.id })}
                >{weapon.item.name}</span>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    weapons: state.weapons.weapons,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponsList);