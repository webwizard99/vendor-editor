import React from 'react';
import './PotionsList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect  } from 'react-redux';
import { fetchPotions } from '../../actions'
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';

class PotionsList extends ExpandableList {
  constructor(props) {
    super(props);
    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentDidMount() {
    this.props.fetchPotions();
  }

  getTitle() {
    return 'Potions'
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: formTypes.potion, edit: false, targetId: null })
  }

  getNewButton() {
    return (
      <div className="NewPotionButton" onClick={this.handleNew}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.potions) {
      return '';
    } else {
      const newPotions = this.props.potions;
      return (
        <div className="detailList">
          { newPotions.map(potion => {
            let potionClass = "ListDetail";
            if (this.props.form === formTypes.potion && this.props.targetId === potion.id) {
              potionClass += " activeItem"
            }
            return (
              <p>
                <span className={potionClass} 
                onClick={() => this.props.setDisplayForm({ form: formTypes.potion, edit: false, targetId: potion.id })}>{potion.item.name}</span>
              </p>
            )
            })}
        </div>);
    }
  }
}

const mapStateToProps = state => {
  return {
    potions: state.potions.potions,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchPotions: () => dispatch(fetchPotions()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PotionsList);