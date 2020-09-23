import React from 'react';
import './DungeonBehaviorList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { fetchDungeonBehaviors } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

class DungeonBehaviorList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentDidMount() {
    this.props.fetchDungeonBehaviors();
  }

  getTitle() {
    return 'Dungeon Behaviors';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: 'dungeon_behavior', edit: false, targetId: null })
  }

  getNewButton() {
    return (
      <div className="NewDungeonBehaviorButton" onClick={this.handleNew}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.dungeonBehaviors) {
      return '';
    } else {
      const newDungeonBehaviors = this.props.dungeonBehaviors;
      return (
        <div className="detailList">
          {newDungeonBehaviors.map(dungeonBehavior => {
            let dungeonBehaviorClass = "ListDetail";
            if (this.props.form === 'dungeon_behavior' && dungeonBehavior.id === this.props.targetId) {
              dungeonBehaviorClass += " activeItem";
            }
            return (
              <p>
                <span className={dungeonBehaviorClass}
                  onClick={() => this.props.setDisplayForm({ form: 'dungeon_behavior', edit: false, targetId: dungeonBehavior.id })}
                >{dungeonBehavior.name}</span>
              </p>
            )
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    dungeonBehaviors: state.behaviors.dungeonBehaviors,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchDungeonBehaviors: () => dispatch(fetchDungeonBehaviors()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonBehaviorList);