import React from 'react';
import './ArmorList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { fetchArmor } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';

class ArmorList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentDidMount() {
    this.props.fetchArmor();
  }

  getTitle() {
    return 'Armor';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: formTypes.armor, edit: false, targetId: null })
  }

  getNewButton() {
    return (
      <div className="NewArmorButton" onClick={this.handleNew}>
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
            if (this.props.form === formTypes.armor && this.props.targetId === armor.id) {
              armorClass += " activeItem";
            }
            return (
              <p>
                <span className={armorClass}
                  onClick={() => this.props.setDisplayForm({ form: formTypes.armor, edit: false, targetId: armor.id })}
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
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchArmor: () => dispatch(fetchArmor()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArmorList);