import React from 'react';

// import stylesheetUrl from "file-loader!extract-loader!css-loader!./src/styles/dark.lazy.css";

function setTheme (theme){
  var el = document.createElement('link');
  el.setAttribute("rel", 'stylesheet');
  el.setAttribute("href", theme);
  el.setAttribute("type", 'text/css');
  el.setAttribute("media",  'screen');
  document.head.append(el);
}

import light from "../styles/light.lazy.scss"
import dark from "../styles/dark.lazy.scss"

const theme = {light, dark}
light.use()

const replaceDocumentClass = (before, after) => {
    document.documentElement.className = document.documentElement.className.replace (before, after)}

function toggleTheme(darkMode) {
  if (darkMode) {
    replaceDocumentClass("theme-light", 'theme-dark')
    document.documentElement.setAttribute('data-theme', 'dark')
    if (theme.dark) {
      theme.dark.use()
      if (theme.light) {theme.light.unuse()}
    }
  } else {
    replaceDocumentClass("theme-dark", 'theme-light')
    document.documentElement.setAttribute('data-theme', 'light')
    if (theme.light) {
      theme.light.use()
      if (theme.dark) {theme.dark.unuse()}
    }
  }
}

// TODO: persist theme preference in localstore
// TODO: Use settings as default: window.matchMedia('(prefers-color-scheme: dark)').matches

export default function ThemeSwitch () {
  return(
  <div className="ThemeSwitch custom-control custom-switch ml-4">
        <span style={{position: "relative", left: "-2.5rem"}}>😇</span>
        <input key="ThemeSwitch" type="checkbox"
               className="custom-control-input"
               id="customSwitch"
               onChange={(e) => toggleTheme(e.target.checked)}/>
      <label className="custom-control-label" htmlFor="customSwitch">😈</label>
  </div>)
}
