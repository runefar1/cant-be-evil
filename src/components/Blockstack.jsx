import React, { Component, createContext } from 'react'
import {
  UserSession,
  AppConfig
} from 'blockstack';
import { Atom, swap, useAtom} from "@dbeining/react-atom"

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })
const contextAtom = Atom.of({
  userSession: userSession,
  userData: null
})

export const BlockstackContext = createContext(null)

export function handleSignIn(e) {
  e.preventDefault();
  userSession.redirectToSignIn();
}

export function handleSignOut(e) {
  e.preventDefault();
  userSession.signUserOut();
  swap(contextAtom, state => ( Object.assign({}, state, { userData: null })))
  document.documentElement.classList.remove("user-signed-in")
}

function handleAuthenticated (userData) {
  console.log("Signed In")
  window.history.replaceState({}, document.title, "/")
  swap(contextAtom, state => ( Object.assign({}, state, { userData: userData })))
  document.documentElement.classList.add("user-signed-in")
}

if (userSession.isSignInPending()) {
  userSession.handlePendingSignIn().then( handleAuthenticated )
} else if (userSession.isUserSignedIn()) {
  handleAuthenticated (userSession.loadUserData())
}

export default function Blockstack(props) {
   const context = useAtom(contextAtom)
   // const {userSession, userData} = context
   return <BlockstackContext.Provider value={context}>
            {props.children}
          </BlockstackContext.Provider>
}
