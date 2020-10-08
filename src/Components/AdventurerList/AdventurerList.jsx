import React from 'react';
import './AdventurerList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';
import AdventurerClassList from '../AdventurerClassList/AdventurerClassList';

// redux imports
import { connect } from 'react-redux';
import { fetchAdventurers } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

class AdventurerList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentDidMount() {
    this.props.fetchAdventurers();
  }
  
  getTitle() {
    return 'Adventurers';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: 'adventurer', edit: false, targetId: null });
  }

  getNewButton() {
    return (
      <div className="NewAdventurerButton" onClick={this.handleNew}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.adventurers) {
      return (
        <div className="detailList">
          <AdventurerClassList />
        </div>
      )
    } else {
      const newAdventurers = this.props.adventurers;
      return (
        <div className="detailList">
          { newAdventurers.map(adventurer => {
            let adventurerClass = "ListDetail";
            if (this.props.form === 'adventurer' && this.props.targetId === adventurer.id) {
              adventurerClass += " activeItem";
            }
            return (
              <p>
                <span className={adventurerClass}
                  onClick={() => this.props.setDisplayForm({ form: 'adventurer', edit: false, targetId: adventurer.id })}
                  >{adventurer.name}</span>
              </p>
            )
          })}
          <AdventurerClassList />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    adventurers: state.adventurers.adventurers,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchAdventurers: () => dispatch(fetchAdventurers()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdventurerList);