import React from 'react';
import './DungeonTileForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

// redux imports
import { connect } from 'react-redux';
import { fetchDungeonTiles } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import formTypes from '../../utilities/formTypes';

class DungeonTileForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: formTypes.dungeon_tile, targetId: this.props.displayId, edit: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    dungeonTiles: state.dungeonTiles.tiles,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchDungeonTiles: () => dispatch(fetchDungeonTiles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonTileForm);