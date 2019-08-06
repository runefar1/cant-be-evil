import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import ReactDOM from 'react-dom'

const settingsFilename = "settings_1"

export default class App extends Component {

  constructor(props) {
  	super(props);
    this.state = {}
  }

  handleSignIn(e) {
    e.preventDefault();
    this.props.userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    this.props.userSession.signUserOut(window.location.origin);
  }

  render() {
    const userSession = this.props.userSession
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { (!userSession.isUserSignedIn() && !userSession.isSignInPending()) ?
            <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />
            : !userSession.isSignInPending() ?
            <Profile userSession={userSession} handleSignOut={ this.handleSignOut } />
            : <div className="alert alert-warning">Signin pending</div>
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
    console.log("User Signed In")

    const historyFile = "history/" + this.uuidv4()
    const timeStamp = "" + Date.now()
    const userSession = this.props.userSession
    userSession.putFile(historyFile, JSON.stringify({when: timeStamp}))

    window.history.replaceState({}, document.title, "/")

    if (true){
      this.setState({userData: userData,
                     historyFile: historyFile})
      userSession.listFiles(file => true)
      .then(this.setVisitCount.bind(this))
      .catch( err => console.log("Failed to count visits:", err))
      .finally(value => console.log("Visits:", value))
    }
    document.documentElement.classList.add("user-signed-in")
  }

  componentDidMount() {
    const userSession = this.props.userSession
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(this.handleSignedIn.bind(this));
    } else if (userSession.isUserSignedIn()) {
      this.handleSignedIn.bind(this)(userSession.loadUserData())
    } else {
      document.documentElement.classList.remove("user-signed-in")
    }
  }
}
