import React from 'react';
import './MonsterBehaviorDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchMonsterBehaviors } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js utility imports

class MonsterBehaviorDisplay extends DisplayStatic {
  getDeleteButton() {
    return (
      <div className="DeleteMonsterBehaviorButton">
        <DeleteButton />
      </div>
    );
  }

  getDisplay() {
    const allMonsterBehaviors = this.props.monsterBehaviors;
    const thisMonsterBehavior = allMonsterBehaviors.find(monsterBehavior => monsterBehavior.id === this.props.displayId);
    const {
      name,
      confront_weakened_adventurer,
      special_move,
      defend,
      heal,
      block_flee,
      migrate
    } = thisMonsterBehavior;

    return (
      <div className="MonsterBehaviorDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="TownBehaviorEditButton" onClick={() => this.props.setDisplayForm({ form: 'monster_behavior', edit: true, targetId: thisTownBehavior.id })}>
            <EditButton />
          </div>
        </div>
        <div className="display-fields-area">
          <div className="display-group">
              <span className="display-label">Name</span>
              <span className="display-text">{name}</span>
          </div>
          <div className="display-group">
              <span className="display-label">confront weakened adventuer</span>
              <span className="display-text">{confront_weakened_adventurer}</span>
          </div>
          <div className="display-group">
              <span className="display-label">special move</span>
              <span className="display-text">{special_move}</span>
          </div>
          <div className="display-group">
              <span className="display-label">defend</span>
              <span className="display-text">{defend}</span>
          </div>
          <div className="display-group">
              <span className="display-label">heal</span>
              <span className="display-text">{heal}</span>
          </div>
          <div className="display-group">
              <span className="display-label">block flee</span>
              <span className="display-text">{block_flee}</span>
          </div>
          <div className="display-group">
              <span className="display-label">migrate</span>
              <span className="display-text">{migrate}</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    monsterBehaviors: state.monsterBehaviors.behaviors,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchMonsterBehaviors: () => dispatch(fetchMonsterBehaviors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterBehaviorDisplay);