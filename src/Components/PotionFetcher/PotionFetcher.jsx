import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class PotionFetcher extends React.Component {
  constructor(props) {
    this.fetchPotions = this.fetchPotions.bind(this);
  }

  componentDidMount() {
    const thisRef = this;
    window.potionFetcher = thisRef;
  }

  fetchPotions() {
    this.props.fetchPotions();
  }

  render() {
    return '';
  }
}

export default connect(null, actions)(PotionFetcher);