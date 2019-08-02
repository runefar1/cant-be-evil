import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import { userSession } from './Global.js';

const settingsFilename = "settings_1"

export default class App extends Component {

  constructor(props) {
  	super(props);
    this.state = {}
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

  uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  setVisitCount(n) {
    this.setState({visitCount: n})
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('.app-visit-count::before {content:"' + n + '"}');
  }

  handleSignedIn (userData) {
    // window.location = window.location.origin;
    console.log("User Signed In")

    const historyFile = "history/" + this.uuidv4()
    const timeStamp = "" + Date.now()
    userSession.putFile(historyFile, JSON.stringify({when: timeStamp}))

    if (this){
      this.setState({userData: userData,
                     historyFile: historyFile})
      userSession.listFiles(file => true)
      .then(this.setVisitCount.bind(this))
      .catch( err => console.log("Failed to count visits:", err))
      .finally(value => console.log("Visits:", value))
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
