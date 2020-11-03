import React from 'react';
import './MonsterBehaviorDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchMonsterBehaviors } from '../../actions';
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';
import deleteRequests from '../../utilities/deleteRequests';

class MonsterBehaviorDisplay extends DisplayStatic {
  constructor(props) {
    super(props);

    this.deleteMonsterBehavior = this.deleteMonsterBehavior.bind(this);
  }
  
  getDeleteButton() {
    const thisRef = this;
    window.dialogRef = thisRef;
    return (
      <div className="DeleteMonsterBehaviorButton"
        onClick={() => this.props.setDialog({
          active: true,
          text: 'Delete Monster Behavior from Database?'
        })}>
        <DeleteButton />
      </div>
    );
  }

  *deleteMonsterBehavior() {
    yield deleteRequests.makeRequest('monster_behavior', this.props.displayId);
  }

  handleYes() {
    const deleteMonsterBehavior = this.deleteMonsterBehavior();
    deleteMonsterBehavior.next().value.then(() => {
      this.props.fetchMonsterBehaviors();
      this.props.setDialog({ active: false, text: '' });
      this.props.setDisplayForm({ form: false, edit: false, targetId: null });
    })
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
          <div className="MonsterBehaviorEditButton" onClick={() => this.props.setDisplayForm({ form: formTypes.monster_behavior, edit: true, targetId: thisMonsterBehavior.id })}>
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
    fetchMonsterBehaviors: () => dispatch(fetchMonsterBehaviors()),
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterBehaviorDisplay);