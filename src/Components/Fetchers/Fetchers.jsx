import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class Fetcher extends React.Component {
  constructor(props) {
    super(props);

    this.fetchPotions = this.fetchPotions.bind(this);
    this.fetchWeapons = this.fetchWeapons.bind(this);
    this.fetchArmor = this.fetchArmor.bind(this);
    this.fetchSuppliers = this.fetchSuppliers.bind(this);
  }

  componentWillMount() {
    const thisRef = this;
    window.fetcher = thisRef;
  }

  fetchPotions() {
    this.props.fetchPotions();
  }

  fetchWeapons() {
    this.props.fetchWeapons();
  }

  fetchArmor() {
    this.props.fetchArmor();
  }

  fetchSuppliers() {
    this.props.fetchSuppliers();
  }


  render() {
    return ''
  }
}

export default connect(null, actions)(Fetcher);