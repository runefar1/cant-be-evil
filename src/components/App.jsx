import React, { Component, Link } from 'react'
import ReactDOM from 'react-dom'
import Profile from './Profile.jsx'
import Signin from './Signin.jsx'
import { handleSignIn, handleSignOut, BlockstackContext} from './Blockstack.jsx'

const settingsFilename = "settings_1"

export default class App extends Component {

  constructor(props) {
  	super(props);
    this.state = {}
  }

  render() {
    const context = this.context
    const {userSession, userData} = context
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { (!userSession.isUserSignedIn() && !userSession.isSignInPending()) ?
            <Signin userSession={userSession} handleSignIn={ handleSignIn } />
            : !userSession.isSignInPending() ?
            <Profile userSession={userSession} handleSignOut={ handleSignOut } />
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
    const {userSession} = this.context
    const historyFile = "history/" + this.uuidv4()
    const timeStamp = "" + Date.now()
    userSession.putFile(historyFile, JSON.stringify({when: timeStamp}))

    if (true){
      this.setState({userData: userData,
                     historyFile: historyFile})
      userSession.listFiles(file => true)
      .then(this.setVisitCount.bind(this))
      .catch( err => console.log("Failed to count visits:", err))
      .finally(value => console.log("Visits:", value))
    }
  }

  componentDidMount() {
    // const userSession = this.props.userSession
    const {userSession, userData} = this.context
    console.log("Session:", !!userSession)
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(this.handleSignedIn.bind(this));
    } else if (userSession.isUserSignedIn()) {
      this.handleSignedIn.bind(this)(userSession.loadUserData())
    } else {
      document.documentElement.classList.remove("user-signed-in")
    }
  }
}

App.contextType = BlockstackContext
