import React from 'react';
import './MonsterBehaviorList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { fetchMonsterBehaviors } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

class MonsterBehaviorList extends ExpandableList {
  constructor(props) {
    super(props);

    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.displayContents = this.displayContents.bind(this);
  }

  componentDidMount() {
    this.props.fetchMonsterBehaviors();
  }

  getTitle() {
    return 'Monster Behaviors';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: 'monster_behavior', edit: false, targetId: null });
  }

  getNewButton() {
    return (
      <div className="NewMonsterBehaviorButton" onClick={this.handleNew}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.monsterBehaviors) {
      return '';
    }
    const newMonsterBehaviors = this.props.monsterBehaviors;
    return (
      <div className="detailList">
        {newMonsterBehaviors.map(monsterBehavior => {
          let monsterBehaviorClass = "ListDetail";
          if (this.props.form === 'monster_behavior' && monsterBehavior.id === this.props.targetId) {
            monsterBehaviorClass += " activeItem";
          }
          return (
            <p>
              <span className={monsterBehaviorClass}
                onClick={() => this.props.setDisplayForm({ form: 'monster_behavior', edit: false, targetId: monsterBehavior.id })}
              >{monsterBehavior.name}</span>
            </p>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    monsterBehaviors: state.monsterBehaviors.behaviors,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchMonsterBehaviors: () => dispatch(fetchMonsterBehaviors()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterBehaviorList);