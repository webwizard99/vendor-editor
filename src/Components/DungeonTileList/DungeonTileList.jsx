import React from 'react';
import './DungeonTileList.css';

// component imports
import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';
import { fetchDungeonTiles } from '../../actions';
import { SET_DETAIL_FORM, SET_DETAIL_REFRESH } from '../../actions/types';

// js utility imports
import formTypes from '../../utilities/formTypes';

class DungeonTileLIst extends ExpandableList {
  constructor(props) {
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.displayContents = this.displayContents.bind(this);
  }

  componentDidMount() {
    this.props.fetchDungeonTiles();
  }

  getTitle() {
    return 'Dungeon Tiles';
  }

  handleNew() {
    this.props.setRefresh(true);
    this.props.setDisplayForm({ form: formTypes.dungeon_tile, edit: false, targetId: null });
  }

  getNewButton() {
    return (
      <div className="NewDungeonTileButton" onClick={this.handleNew}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.dungeonTiles) {
      return '';
    }
    const newDungeonTiles = this.props.dungeonTiles;
    return (
      <div className="detailList">
        {newDungeonTiles.map(dungeonTile => {
          let dungeonTileClass = "ListDetail";
          if (this.props.form === formTypes.dungeon_tile && dungeonTile.id === this.props.targetId) {
            dungeonTileClass += " activeItem";
          }
          return (
            <p>
              <span className={dungeonTileClass}
                onClick={() => this.props.setDisplayForm({ form: formTypes.dungeon_tile, edit: false, targetId: dungeonTile.id })}
                >{dungeonTile.name}</span>
            </p>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dungeonTiles: state.dungeonTiles.tiles,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
   return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchDungeonTiles: () => dispatch(fetchDungeonTiles()),
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DungeonTileLIst);