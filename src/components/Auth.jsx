import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import { Person } from 'blockstack';
import { useBlockstack } from 'react-blockstack';

const avatarFallbackImage = '/proxy/s3.amazonaws.com/onename/avatar-placeholder.png';

export default function Auth (props) {
    const { userSession, userData, person, signIn, signOut} = useBlockstack()
    return (
      <div className ="Auth">
          { person ?
            <span className= "avatar">
                <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage}
                    className = "avatar-image" id="avatar-image" />
                { person.name() }
            </span>
            : null }

          { signIn ?
            <button
              className="btn btn-primary"
              onClick={ signIn }
            >
              Sign In
            </button>
            : signOut ?
            <button
              className="btn btn-outline-secondary"
              onClick={ signOut }
            >
              Sign Out
            </button>
           :null
          }
      </div>
    );
  }
