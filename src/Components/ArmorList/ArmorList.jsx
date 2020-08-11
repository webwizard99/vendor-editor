import React from 'react';
import './ArmorList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { SET_DETAIL_FORM } from '../../actions/types';

class ArmorList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
  }

  getTitle() {
    return 'Armor';
  }

  getNewButton() {
    return (
      <div className="NewArmorButton" onClick={() => this.props.setDisplayForm({ form: 'armor', edit: false, targetId: null })}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.armor) {
      return '';
    } else {
      const newArmor = this.props.armor;
      return (
        <div className="detailList">
          { newArmor.map(armor => {
            let armorClass = "ListDetail";
            if (this.props.form === 'armor' && this.props.targetId === armor.id) {
              armorClass += " activeItem";
            }
            return (
              <p>
                <span className={armorClass}
                  onClick={() => this.props.setDisplayForm({ form: 'armor', edit: false, targetId: armor.id })}
                >{armor.item.name}</span>
              </p>
            )
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    armor: state.armor.armor,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArmorList);