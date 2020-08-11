import React from 'react';
import './ArmorDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
// import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';

class ArmorDisplay extends DisplayStatic {
  getDeleteButton() {
    return (
      <div className="DeleteArmorButton"
      >
        <DeleteButton />
      </div>
    )
  }

  getDisplay() {
    return (
      <div className="ArmorDisplay">
        ArmorDisplay
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    armor: state.armor.armor,
    displayId: state.detail.targetId
  }
}

export default connect(mapStateToProps)(ArmorDisplay);