import React from 'react';
import './MonsterDropListList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

//redux imports
import { connect } from 'react-redux';
import { fetchMonsterDropLists } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';

class MonsterDropListList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentDidMount() {
    this.props.fetchMonsterDropLists();
  }
  
  getTitle() {
    return 'Monster Drop Lists';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: formTypes.monster_drop_list, edit: false, targetId: null });
  }

  getNewButton() {
    return (
      <div className="NewMonsterDropListButton" onClick={this.handleNew}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.monsterDropLists) {
      return '';
    }
    const newMonsterDropLists = this.props.monsterDropLists;
    return (
      <div className="detailList">
        { newMonsterDropLists.map(monsterDropList => {
          let monsterDropListClass = "ListDetail";
          if (this.props.form === formTypes.monster_drop_list && this.props.targetId === monsterDropList.id) {
            monsterDropListClass += " activeItem";
          }
          return (
            <p>
              <span className={monsterDropListClass}
              onClick={() => this.props.setDisplayForm({ form: formTypes.monster_drop_list, edit: false, targetId: monsterDropList.id })}
              >{monsterDropList.monster_drop_list.name}</span>
            </p>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    monsterDropLists: state.dropLists.monster,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchMonsterDropLists: () => dispatch(fetchMonsterDropLists()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterDropListList);