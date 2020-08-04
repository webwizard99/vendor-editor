import React from 'react';
import './ObjectListColumn.css';

// component imports
// import ExpandableList from '../ExpandableList/ExpandableList';
import PotionsList from '../PotionsList/PotionsList';

// redux imports
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

class ObjectListColumn extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (this.props.dialogActive && !this.nextProps.dialogActive) {
      this.props.setDetailForm({
        type: false,
        targetId: null,
        edit: false
      })
    }
  }

  componentDidMount() {
    this.props.fetchPotions();
  }

  render() {
    return (
      <div className="ObjectListColumn">
        <PotionsList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    potions: state.potions.potions,
    dialogActive: state.dialog.active
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDetailForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload })
  }
}

const allDispatches = {
  ...mapDispatchToProps,
  ...actions
}

export default connect(mapStateToProps, allDispatches)(ObjectListColumn);