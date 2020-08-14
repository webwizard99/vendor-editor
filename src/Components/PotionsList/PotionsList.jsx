import React from 'react';
import './PotionsList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect  } from 'react-redux';
import * as actions from '../../actions'
import { SET_DETAIL_FORM } from '../../actions/types';

function withAction(wrappedComponent, actions) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return connect(null, actions)(<wrappedComponent />)
    }
  }
}

class PotionsList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.fetchPotions());
    // console.log(this.props.setDisplayForm);
    this.props.fetchPotions();
  }

  getTitle() {
    return 'Potions'
  }

  getNewButton() {
    return (
      <div className="NewPotionButton" onClick={() => this.props.setDisplayForm({ form: 'potion', edit: false, targetId: null })}>
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.potions) {
      return '';
    } else {
      const newPotions = this.props.potions;
      return (
        <div className="detailList">
          { newPotions.map(potion => {
            let potionClass = "ListDetail";
            if (this.props.form === "potion" && this.props.targetId === potion.id) {
              potionClass += " activeItem"
            }
            return (
              <p>
                <span className={potionClass} 
                onClick={() => this.props.setDisplayForm({ form: 'potion', edit: false, targetId: potion.id })}>{potion.item.name}</span>
              </p>
            )
            })}
        </div>);
    }
  }
}

const mapStateToProps = state => {
  return {
    potions: state.potions.potions,
    potionCount: state.potions.count,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAction(PotionsList, actions));