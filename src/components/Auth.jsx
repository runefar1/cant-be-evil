import React, { Component, Link } from 'react';
import Profile from './Profile.jsx';
import Signin from './Signin.jsx';
import { Person } from 'blockstack';
import { useBlockstack } from 'react-blockstack';
import { usePerson } from './common'

export default function Auth (props) {
    const { userSession, userData, signIn, signOut} = useBlockstack()
    const { avatarUrl, username } = usePerson()
    return (
      <div className ="Auth">
          { person ?
            <span className= "avatar">
            {avatarUrl ?
                <img src={ avatarUrl ? avatarUrl : avatarFallbackImage}
                    className = "avatar-image" id="avatar-image" />
                :
                <i className={"fas fa-user-secret"}
                   style={{fontSize: "1.6rem", marginRight: "0.5em"}}></i>}
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
