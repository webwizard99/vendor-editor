import React from 'react';

import ExpandableList from '../ExpandableList/ExpandableList';

// redux imports
import { connect  } from 'react-redux';

class PotionsList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
  }

  displayContents() {
    if (!this.props.potions) {
      return '';
    } else {
      const newPotions = this.props.potions;
      return newPotions.map(potion => {
        return (
          <div>
            <span>{potion.nam}</span>
          </div>
        )
          });
    }
  }
}

const mapStateToProps = state => {
  return {
    potions: state.potions.potions
  }
}

export default connect(mapStateToProps)(PotionsList);