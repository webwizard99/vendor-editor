import React from 'react';
import './MenuBar.css';

import { connect } from 'react-redux';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.renderLogin = this.renderLogin.bind(this);
    this.renderGameLink = this.renderGameLink.bind(this);
  }

  renderLogin() {
    
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/facebook">Login with Facebook</a></li>
        );
      default:
        return (
          <li><a href="/api/logout">Logout</a></li>
        );
    }
  }

  renderGameLink() {
    switch(this.props.auth) {
      case null:
        return false;
      case false:
        return false;
      default:
        const userType = this.props.auth.type;
        if (userType === 'owner') {
          return (
            <li key="gameLink"><a className="GameLink" href="/">game</a></li>
          )
        } else {
          return false;
        }
    }

  }
  
  render() {
    return (
      <div className="MenuBar">
        <span className="MenuTitle"><a href="/">VENDOR</a></span>
        <ul className="LoginContainer">
          {this.renderGameLink()}
          {this.renderLogin()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(MenuBar);