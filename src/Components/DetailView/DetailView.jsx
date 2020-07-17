import React from 'react';
import './DetailView.css';

import ExpandableList from '../ExpandableList/ExpandableList';

class DetailView extends React.Component {
  render() {
    return (
      <div className="DetailView">
        DetailView
        <ExpandableList />
      </div>
    )
  }
}

export default DetailView;