import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import { userSession } from './Global.js';

export default class App extends Component {

  constructor(props) {
  	super(props);
  }

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { userSession.isUserSignedIn() ?
            <Profile userSession={userSession} handleSignOut={ this.handleSignOut } />
            : !userSession.isSignInPending() ?
            <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
            : <div className="alert alert-warning" hidden={true}>Signing you in...</div>
          }
        </div>
      </div>
    );
  }

  handleSignedIn (userData) {
    // window.location = window.location.origin;
    console.log("User Signed In")
    if (this){
      this.setState({userData: userData})
    }
    document.documentElement.className += "user-signed-in"
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(this.handleSignedIn.bind(this));
    } else if (userSession.isUserSignedIn()) {
      this.handleSignedIn (userSession.loadUserData(), true)
    } else {
      document.documentElement.className -= "user-signed-in"
    }
  }
}
