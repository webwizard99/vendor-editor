import React from 'react';
import './LevelList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { fetchLevels } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

// js utitlity imports
import formTypes from '../../utilities/formTypes';

class LevelList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentDidMount() {
    this.props.fetchLevels();
  }

  getTitle() {
    return 'Levels';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: formTypes.level, edit: false, targetId: null });
  }

  getNewButton() {
    return (
      <div className="NewLevelButton"
        onClick={this.handleNew}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.levels) {
      return '';
    } else {
      const newLevels = this.props.levels;
      newLevels.sort((level1, level2) => {
        if (level1.number > level2.number) {
          return 1
        } else if (level1.number < level2.number) {
          return -1
        } else {
          return 0;
        }
      })
      return (
        <div className="detailList">
          {newLevels.map(level => {
            let levelClass = "ListDetail";
            if (this.props.form === formTypes.level && this.props.targetId === level.id) {
              levelClass += " activeItem";
            }
            return (
              <p>
                <span className={levelClass}
                  onClick={() => this.props.setDisplayForm({ form: formTypes.level, edit: false, targetId: level.id })}>
                    {level.number}
                </span>
              </p>
            )
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    levels: state.levels.levels,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchLevels: () => dispatch(fetchLevels()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelList);