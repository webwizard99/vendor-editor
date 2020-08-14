import React from 'react';

import PotionFetcher from '../PotionFetcher/PotionFetcher';
import WeaponsFetcher from '../WeaponsFetcher/WeaponsFetcher';

class Fetcher extends React.Component {
  render() {
    return (
      <div className="Fetcher">
        <PotionFetcher />
        <WeaponsFetcher />
      </div>
    )
  }
}

export default Fetcher;