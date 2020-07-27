import React from 'react';
import './PotionList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect  } from 'react-redux';
import { SET_DETAIL_FORM } from '../../actions/types';

class PotionsList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
  }

  getTitle() {
    return 'Potions'
  }

  getNewButton() {
    return (
      <div className="NewPotionButton" onClick={() => this.props.setDisplayForm('potion')}>
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
            return (
              <div>
                <span className="ListDetail" onClick={() => this.props.setDisplayForm({ form: 'potion', edit: false, targetId: null })}>{potion.item.name}</span>
              </div>
            )
            })}
        </div>);
    }
  }
}

const mapStateToProps = state => {
  return {
    potions: state.potions.potions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PotionsList);