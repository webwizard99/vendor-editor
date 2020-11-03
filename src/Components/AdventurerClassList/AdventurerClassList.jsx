import React from 'react';
import './AdventurerClassList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { fetchAdventurerClasses } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

// js utitlity imports
import formTypes from '../../utilities/formTypes';

class AdventurerClassList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentDidMount() {
    this.props.fetchAdventurerClasses();
  }
  
  getTitle() {
    return 'Classes';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: formTypes.adventurerClass, edit: false, targetId: null });
  }

  getNewButton() {
    return (
      <div className="NewAdventurerClassButton" onClick={this.handleNew}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.adventurerClasses) {
      return '';
    } else {
      const newAdventurerClasses = this.props.adventurerClasses;
      return (
        <div className="detailList">
          {newAdventurerClasses.map(adventurerClass => {
            let adventurerClassClass = "ListDetail";
            if (this.props.form === formTypes.adventurer_class && this.props.targetId === adventurerClass.id) {
              adventurerClassClass += " activeItem";
            }
            return (
              <p>
                <span className={adventurerClassClass}
                  onClick={() => this.props.setDisplayForm({ form: formTypes.adventurer_class, edit: false, targetId: adventurerClass.id })}
                >{adventurerClass.name}</span>
              </p>
            );
          })}
        </div>
      )
    }
    
  }
}

const mapStateToProps = state => {
  return {
    adventurerClasses: state.adventurerClasses.classes,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchAdventurerClasses: () => dispatch(fetchAdventurerClasses()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdventurerClassList);