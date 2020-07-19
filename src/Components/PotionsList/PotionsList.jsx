import React from 'react';

import ExpandableList from '../ExpandableList/ExpandableList';

// redux imports
import { connect  } from 'react-redux';
import { SET_DETAIL_FORM } from '../../actions/types';

class PotionsList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
  }

  getTitle() {
    return 'Potions'
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
                <span className="ListDetail" onClick={() => this.props.setDisplayForm('potion')}>{potion.type}</span>
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
    setDisplayForm: (form) => dispatch({ type: SET_DETAIL_FORM, form: form })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PotionsList);