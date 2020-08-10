import React from 'react';
import './WeaponsList.css';

import ExpandableList from '../ExpandableList/ExpandableList';

//redux imports
import { connect } from 'react-redux';

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
    return '';
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
                <span className={weaponClass}>{weapon.item.name}</span>
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

export default connect(mapStateToProps)(WeaponsList);