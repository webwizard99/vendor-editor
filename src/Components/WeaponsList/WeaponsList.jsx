import React from 'react';
import './WeaponsList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { fetchWeapons } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';

class WeaponsList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentDidMount() {
    this.props.fetchWeapons();
  }

  getTitle() {
    return 'Weapons';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: formTypes.weapon, edit: false, targetId: null });
  }
  
  getNewButton() {
    return (
      <div className="NewWeaponButton" onClick={this.handleNew}>
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
            if (this.props.form === formTypes.weapon && this.props.targetId === weapon.id) {
              weaponClass += " activeItem"
            }
            return (
              <p>
                <span className={weaponClass}
                onClick={() => this.props.setDisplayForm({ form: formTypes.weapon, edit: false, targetId: weapon.id })}
                >{weapon.item.name}</span>
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
    weapons: state.weapons.weapons,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchWeapons: () => dispatch(fetchWeapons()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeaponsList);