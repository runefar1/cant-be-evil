import React, { Component } from 'react'
import { useBlockstack } from 'react-blockstack'
import { useImage, usePerson } from './common.js'

function Img (props) {
  // CBE compliant image element
  // const [src] = useImage(props.src)
  const {avatarUrl, username} = usePerson()
  const src = avatarUrl
  console.log("Img:", props.src, "->", src)
  return (
    src && <img {...props} src={src || null}/>
  )
}

export default function Profile (props) {
  const { userSession, userData, person, signIn, signOut} = useBlockstack()
  const avatarUrl = person && person.avatarUrl()
  //console.log("Profile image:", avatarUrl)
  function renderCore () {
    const username = userData.username.match(/\w+/g)[0]
    return(
    <div className="alert alert-info">
      <h2></h2>
      <p><strong>You Blockstack username is <span className="badge badge-primary">{username}</span>.</strong> Duh!</p>

      <p>But apps may get to learn
         other personal information from your
         Blockstack profile. Let's take a look...</p>

      <div className="alert alert-light">
      { person.name()
        ? <p><strong>Name: </strong>
            Welcome <span className="badge badge-primary">{person.name()}</span>... yes, apps get your name, or
            at least what you said it was when signing up with Blockstack.
            You can change it if you like.</p>
        : <p><strong>Name: </strong>
            You didn't provide a name when signing up for this account.
            That's of course OK. You can set it to whatever you like.
            Whatever name you provide will be available for the apps.</p>
      }
      </div>
      <div className="alert alert-light">
      { avatarUrl
        ? <div>
            <p>Nice shot...</p>
            <Img src={avatarUrl} className="profile-avatar"/>
            <p className="mt-4 text-center alert alert-warning">
               Apps get to see your avatar picture.
            </p>
          </div>
        : <p><strong>Profile image: </strong>
             You haven't yet uploaded an image for your avatar... which is OK.
             Nothing to be ashamed about. Apps don't care. But they may
             make your experience a little nicer if you do. Who
             doesn't like to see themself from time to time ;-)</p>
      }
      </div>

      { (!person.name() && !avatarUrl)
        ? <p className="alert alert-warning">Well, not much to reveal when you haven't provided much personal
            information to reveal... Let's see what else apps get to know about you.</p>
        : null }

    <div className="alert alert-danger">
       Perhaps it's time
       to <a href="https://browser.blockstack.org/profiles" target="_blank">update your blockstack profile!</a>
    </div>
    </div>
  )
  }

  return (
      userData
      ? renderCore()
      : <div className="alert alert-warning">Not completely signed in</div>
    );
}
