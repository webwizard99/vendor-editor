import React from 'react';
import './DetailView.css';

import PotionForm from '../PotionForm/PotionForm';

import { connect } from 'react-redux';

class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.getDetailForm = this.getDetailForm.bind(this);
  }

  getDetailForm() {
    if (!this.props.formType) {
      return 'no details to display';
    }

    switch(this.props.formType) {
      case 'potion':
        return <PotionForm />;
      default:
        return 'detail type unknown'
    }
  }
  
  render() {
    return (
      <div className="DetailView">
        {this.getDetailForm()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formType: state.detail.type
  }
}

export default connect(mapStateToProps)(DetailView);