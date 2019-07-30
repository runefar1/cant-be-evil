import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import {
  UserSession,
  AppConfig,
  Person
} from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

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
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    const {person} = this.state;
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
              onClick={ this.handleSignIn }
            >
              Sign In
            </button>
            : <button
              className="btn btn-outline-secondary"
              onClick={ this.handleSignOut }
            >
              Sign Out
            </button>
          }
      </div>
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
        this.setState({person: new Person(userData.profile)
        })
      });
    }
  }
}
