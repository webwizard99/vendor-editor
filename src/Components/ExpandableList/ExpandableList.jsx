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

  getNewButton() {
    return ''
  }

  getTitle() {
    return 'Item'
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
        <div className="TitleBar">
          <span className="expansionBtn" onClick={this.setExpansion}>
            {this.state.expanded ? '-' : '+'}
          </span>
          <span className="ExpanderTitle">{this.getTitle()}</span>
          {this.getNewButton()}
        </div>
        {this.state.expanded ? this.displayContents() : ''}
      </div>
    )
  }
}

export default ExpandableList;