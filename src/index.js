import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Auth from "./components/Auth.jsx"
import App from './components/App.jsx'
import Raw from './components/Raw.jsx'
import Signin from './components/Signin.jsx'
import Blockstack, {handleSignIn, handleSignOut} from './components/Blockstack.jsx'

// Require Sass file so webpack can build it
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import style from './styles/style.css'

ReactDOM.render(<Blockstack><App /></Blockstack>,
                document.getElementById('app-root'))
ReactDOM.render(<Blockstack><Signin handleSignIn={handleSignIn}/></Blockstack>,
                document.getElementById('signin-root'))
ReactDOM.render(<Blockstack><Auth /></Blockstack>,
                document.getElementById('auth-root'))
ReactDOM.render(<div><Blockstack><Raw /></Blockstack></div>,
                document.getElementById('raw-root'))
