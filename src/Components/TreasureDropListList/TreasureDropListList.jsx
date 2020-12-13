import React from 'react';
import './TreasureDropListList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { fetchTreasureDropLists } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';

class TreasureDropListList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentDidMount() {
    this.props.fetchTreasureDropLists();
  }

  getTitle() {
    return 'Treasure Drop Lists';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: formTypes.treasure_drop_list, edit: false, targetId: null });
  }

  getNewButton() {
    return (
      <div className="NewTreasureDropListButton" onClick={this.handleNew}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.treasureDropLists) {
      return '';
    }
    const newTreasureDropLists = this.props.treasureDropLists;
    return (
      <div className="detailList">
        { newTreasureDropLists.map(treasureDropList => {
          let treasureDropListClass = "ListDetail";
          if (this.props.form === formTypes.treasure_drop_list && treasureDropList.id === this.props.targetId) {
            treasureDropListClass += " activeItem";
          }
          return (
            <p>
              <span className={treasureDropListClass}
                onClick={() => this.props.setDisplayForm({ form: formTypes.treasure_drop_list, edit: false, targetId: treasureDropList.id })}
                >{treasureDropList.treasure_drop_list.name}</span>
            </p>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    treasureDropLists: state.dropLists.treasure,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchTreasureDropLists: () => dispatch(fetchTreasureDropLists()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TreasureDropListList);