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
      console.log('no potions in PotionsList')
      return '';
    } else {
      console.log('potions in potionList');
      const newPotions = this.props.potions;
      console.log(newPotions);
      return (
        <div>
          { newPotions.map(potion => {
            return (
              <div>
                <span>{potion.type}</span>
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

export default connect(mapStateToProps)(PotionsList);