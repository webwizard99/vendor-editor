import React from 'react';
import './DetailView.css';

import PotionForm from '../PotionForm/PotionForm';
import PotionDisplay from '../PotionDisplay/PotionDisplay';

import { connect } from 'react-redux';

class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.getDetail = this.getDetail.bind(this);
    this.getPotionDetail = this.getPotionDetail.bind(this);
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
    edit: state.detail.edit
  }
}

export default connect(mapStateToProps)(DetailView);