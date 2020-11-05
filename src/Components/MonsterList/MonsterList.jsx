import React from 'react';
import './MonsterList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';
import MonsterDropListList from '../MonsterDropListList/MonsterDropListList';
import MonsterBehaviorList from '../MonsterBehaviorList/MonsterBehaviorList';

// redux imports
import { connect } from 'react-redux';
import { fetchMonsters } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';

class MonsterList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentDidMount() {
    this.props.fetchMonsters();
  }
  
  getTitle() {
    return 'Monsters';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: formTypes.monster, edit: false, targetId: null });
  }

  getNewButton() {
    return (
      <div className="NewMonsterButton" onClick={this.handleNew}>
        <NewButton />
      </div>
    );
  }

  displayContents() {
    if (!this.props.monsters) {
      return (
        <div className="detailList">
          <MonsterDropListList />
          <MonsterBehaviorList />
        </div>
      )
    }
    const newMonsters = this.props.monsters;
    return (
      <div className="detailList">
        { newMonsters.map(monster => {
          let monsterClass = "ListDetail";
          if (this.props.form === formTypes.monster && this.props.targetId === monster.id) {
            monsterClass += " activeItem";
          }
          return (
            <p>
              <span className={monsterClass}
                onClick={() => this.props.setDisplayForm({ form: formTypes.monster, edit: false, targetId: monster.id })}
                >{monster.name}
                
                </span>
            </p>
          )
        })}
        <MonsterDropListList />
        <MonsterBehaviorList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    monsters: state.monsters.monsters,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchMonsters: () => dispatch(fetchMonsters()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MonsterList);