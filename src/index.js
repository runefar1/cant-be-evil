import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Auth from "./components/Auth.jsx"
import App from './components/App.jsx';
import Raw from './components/Raw.jsx'

// Require Sass file so webpack can build it
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import style from './styles/style.css';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Auth />, document.getElementById('auth-root'));
ReactDOM.render(<Raw />, document.getElementById('raw-root'));
