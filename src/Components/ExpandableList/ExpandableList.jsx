import React from 'react';
import './ExpandableList.css';

class ExpandableList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

    this.setExpansion = this.setExpansion.bind(this);
  }

  setExpansion() {
    const currentState = this.state.expanded;
    this.setState({
      expanded: !currentState
    });
  }

  displayContents() {
    return (
      <div>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </div>
    )
  }
  
  render() {
    return (
      <div className="ExpandableList">
        {this.state.expanded ? this.displayContents : ''}
        {this.state.expanded ? '-' : '+'}
      </div>
    )
  }
}

export default ExpandableList;