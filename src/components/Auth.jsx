import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import { Person } from 'blockstack';

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


  handleSignIn(e) {
    e.preventDefault();
    const userSession = this.props.userSession
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    const userSession = this.props.userSession
    userSession.signUserOut(window.location.origin);
  }

  render() {
    const {person} = this.state;
    const {userSession} = this.props
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
              onClick={ this.handleSignIn.bind(this) }
            >
              Sign In
            </button>
            : <button
              className="btn btn-outline-secondary"
              onClick={ this.handleSignOut.bind(this) }
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
    const userSession = this.props.userSession
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(this.handleSignedIn.bind(this))
    } else if (userSession.isUserSignedIn()) {
        const userData = userSession.loadUserData()
        this.handleSignedIn.bind(this)(userData)
    };
  }
}
