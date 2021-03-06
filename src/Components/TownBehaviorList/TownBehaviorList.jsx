import React from 'react';
import './TownBehaviorList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { fetchTownBehaviors } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';

class TownBehaviorList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);

  }

  componentDidMount() {
    this.props.fetchTownBehaviors();
  }

  getTitle() {
    return 'Town Behaviors';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: formTypes.town_behavior, edit: false, targetId: null })
  }

  getNewButton() {
    return (
      <div className="NewTownBehaviorButton" onClick={this.handleNew}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.townBehaviors) {
      return '';
    } else {
      const newTownBehaviors = this.props.townBehaviors;
      return (
        <div className="detailList">
          {newTownBehaviors.map(townBehavior => {
            let townBehaviorClass = "ListDetail";
            if (this.props.form === formTypes.town_behavior && this.props.targetId === townBehavior.id) {
              townBehaviorClass += " activeItem";
            }
            return (
              <p>
                <span className={townBehaviorClass}
                  onClick={() => this.props.setDisplayForm({ form: formTypes.town_behavior, edit: false, targetId: townBehavior.id })}
                >{townBehavior.name}</span>
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
    townBehaviors: state.behaviors.townBehaviors,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchTownBehaviors: () => dispatch(fetchTownBehaviors()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TownBehaviorList);