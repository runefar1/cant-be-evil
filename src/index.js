import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Auth from "./components/Auth.jsx"
import App from './components/App.jsx'
import Raw from './components/Raw.jsx'
import Signin from './components/Signin.jsx'
import Dapps from './components/section/Dapps.jsx'
import ThemeSwitch from './components/ThemeSwitch'
import { AppConfig } from 'blockstack'
import { initBlockstack } from 'react-blockstack'

// import bootstrap from 'bootstrap/dist/css/bootstrap.css'
//import bootstrap from 'bootswatch/dist/flatly/bootstrap.css'

import $ from 'jquery'
import Popper from 'popper.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import '@fortawesome/fontawesome-free/css/all.min.css'


const appConfig = new AppConfig(['store_write'])
initBlockstack({appConfig})

ReactDOM.render(<App/>,
                document.getElementById('app-root'))
ReactDOM.render(<Signin/>,
                document.getElementById('signin-root'))
ReactDOM.render(<Auth/>,
                document.getElementById('auth-root'))
ReactDOM.render(<Dapps/>,
                document.getElementById('dapps-section'))
ReactDOM.render(<Raw/>,
                document.getElementById('raw-root'))

ReactDOM.render(<ThemeSwitch/>,
                document.getElementById('ThemeSwitch'))
