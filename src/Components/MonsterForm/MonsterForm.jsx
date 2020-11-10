import React from 'react';
import './MonsterForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
// import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { fetchMonsters, loadMonsterDetails } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import formTypes from '../../utilities/formTypes';
// import formComposer from '../../utilities/formComposer';
import breadcrumb from '../../utilities/breadcrumb';

class MonsterForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getMonsterBehaviorOptions = this.getMonsterBehaviorOptions.bind(this);
    this.getMonsterDropListOptions = this.getMonsterDropListOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.monsterBehaviors || !this.props.monsterDropLists) {
      this.props.loadMonsterDetails();
    }
  }
  
  getMonsterBehaviorOptions() {
    const monsterOptions = this.props.monsterBehaviors;
    return monsterOptions.map(monsterOption => {
      return <option value={monsterOption.id}>{monsterOption.name}</option>
    });
  }

  getMonsterDropListOptions() {
    const dropLists = this.props.monsterDropLists;
    return dropLists.map(dropList => {
      return <option value={dropList.id}>{dropList.monster_drop_list.name}</option>
    });
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.breadcrumbFormdata) {
      breadcrumb.clearBreadcrumbForm();
    }
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: formTypes.monster, targetId: this.props.displayId, edit: false });
    } 
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  getForm() {
    return 'MonsterForm';
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    monsters: state.monsters.monsters,
    monsterBehaviors: state.monsterBehaviors.behaviors,
    monsterDropLists: state.dropLists.monster,
    displayId: state.detail.targetId,
    breadcrumbFormdata: state.breadcrumb.formData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchMonsters: () => dispatch(fetchMonsters()),
    loadMonsterDetails: () => dispatch(loadMonsterDetails())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonsterForm);