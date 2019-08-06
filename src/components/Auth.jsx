import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import { Person } from 'blockstack';
import { handleSignIn, handleSignOut, BlockstackContext} from './Blockstack.jsx'

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Auth extends Component {

  constructor(props) {
  	super(props);
    this.state = {
        person: {
          name() {
              return 'Anonymous';
            },
          avatarUrl(){
            return avatarFallbackImage;
            }
          }
        }
    }

  render() {
    const {person} = this.state;
    const {userSession} = this.context
    return (
      <div className ="Auth">
          { userSession.isUserSignedIn() ?
            <span className= "avatar">
                <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage}
                    className = "avatar-image" id="avatar-image" />
                { person.name() }
            </span>
            : null }

          { !userSession.isUserSignedIn() ?
            <button
              className="btn btn-primary"
              onClick={ handleSignIn }
            >
              Sign In
            </button>
            : <button
              className="btn btn-outline-secondary"
              onClick={ handleSignOut }
            >
              Sign Out
            </button>
          }
      </div>
    );
  }

  handleSignedIn (userData) {
    this.setState({person: new Person(userData.profile) })
  }

  componentDidMount() {
    const userSession = this.context.userSession
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(this.handleSignedIn.bind(this))
    } else if (userSession.isUserSignedIn()) {
        const userData = userSession.loadUserData()
        this.handleSignedIn.bind(this)(userData)
    };
  }
}

Auth.contextType = BlockstackContext
