import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Auth from "./components/Auth.jsx"
import App from './components/App.jsx'
import Raw from './components/Raw.jsx'
import {
  UserSession,
  AppConfig
} from 'blockstack';

// Require Sass file so webpack can build it
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import style from './styles/style.css'

const appConfig = new AppConfig()
const userSession = new UserSession({ appConfig: appConfig })

ReactDOM.render(<App userSession={userSession} />, document.getElementById('app-root'))
ReactDOM.render(<Auth userSession={userSession} />, document.getElementById('auth-root'))
ReactDOM.render(<Raw userSession={userSession} />, document.getElementById('raw-root'))
