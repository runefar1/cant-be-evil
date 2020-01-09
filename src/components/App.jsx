import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useBlockstack } from 'react-blockstack'
import Profile from './Profile.jsx'
import Signin from './Signin.jsx'

const settingsFilename = "settings_1"

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

export default function App (props) {
  const { userSession, userData, signIn, signOut } = useBlockstack()
  const [state, setState] = useState()

  function setVisitCount (n) {
    setState({visitCount: n})
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('.app-visit-count::before {content:"' + n + '"}');
  }

  function onSignedIn (userData) {
    console.log("User Signed In")
    const historyFile = "history/" + uuidv4()
    const timeStamp = "" + Date.now()
    userSession.putFile(historyFile, JSON.stringify({when: timeStamp}))

    if (true){
      setState({userData: userData,
                historyFile: historyFile})
      userSession.listFiles(file => true)
      .then(setVisitCount)
      .catch( err => console.log("Failed to count visits:", err))
      .finally(value => console.log("Visits:", value))
    }
  }

  useEffect(() => {
      if (userData) {
        document.documentElement.classList.add("user-signed-in")
        onSignedIn(userData)
      } else {
        document.documentElement.classList.remove("user-signed-in")
      }
    }, [userData])

  return (
       <div className="site-wrapper">
         <div className="site-wrapper-inner">
           { signIn ?
             <Signin userSession={userSession} handleSignIn={ signIn } />
             : signOut ?
             <Profile userSession={userSession} handleSignOut={ signOut } />
             : <div className="alert alert-warning">Signin pending</div>
           }
         </div>
       </div>
     );
}
