import React from 'react';
import './DetailView.css';

import PotionForm from '../PotionForm/PotionForm';
import PotionDisplay from '../PotionDisplay/PotionDisplay';

// redux imports
import { connect } from 'react-redux';
import { SET_DETAIL_UPDATE } from '../../actions/types';

class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.getDetail = this.getDetail.bind(this);
    this.getPotionDetail = this.getPotionDetail.bind(this);
  }

  componentDidUpdate() {
    if (this.props.detailUpdate) {
      this.props.setDetailUpdate(false);
    }
  }

  getPotionDetail() {
    if (this.props.targetId === null || this.props.edit) {
      return <PotionForm />
    } else {
      return <PotionDisplay />
    }
  }

  getDetail() {
    if (!this.props.formType) {
      return (<div className="BlankForm">no details to display</div>);
    }

    switch(this.props.formType) {
      case 'potion':
        return this.getPotionDetail();
      default:
        return (<div className="BlankForm">detail type unknown</div>)
    }
  }
  
  render() {
    return (
      <div className="DetailView">
        {this.getDetail()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formType: state.detail.type,
    targetId: state.detail.targetId,
    edit: state.detail.edit,
    detailUpdate: state.state.detailUpdate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDetailUpdate: (val) => dispatch({ type: SET_DETAIL_UPDATE, val: val })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);