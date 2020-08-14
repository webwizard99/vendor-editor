import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class WeaponsFetcher extends React.Component {
  constructor(props) {
    super(props);

    this.fetchWeapons = this.fetchWeapons.bind(this);
  }

  componentDidMount() {
    const thisRef = this;
    window.weaponsFetcher = thisRef;
  }

  fetchWeapons() {
    this.props.fetchWeapons();
  }

  render() {
    return '';
  }
}

export default connect(null, actions)(WeaponsFetcher);