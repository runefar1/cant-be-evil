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

console.log("KEYS:", dark.use, Object.keys(dark))
light.use()

function toggleTheme(darkMode) {
  console.log("TOGGLE:", darkMode, require.cache)
  const replaceDocumentClass = (before, after) => {
    document.documentElement.className = document.documentElement.className.replace (before, after)}
  if (darkMode) {
    replaceDocumentClass("theme-light", 'theme-dark')
    document.documentElement.setAttribute('data-theme', 'dark')
    //setTheme("/proxy/stackpath.bootstrapcdn.com/bootswatch/4.3.1/darkly/bootstrap.min.css");
    //setTheme("/css/style.css");
    // delete require.cache[require.resolve("../styles/dark.lazy.css")]
    if (theme.dark) {
      if (theme.light) {theme.light.unuse()}
      theme.dark.use()
    }
  } else {
    replaceDocumentClass("theme-dark", 'theme-light')
    document.documentElement.setAttribute('data-theme', 'light')
    //delete require.cache[require.resolve("../styles/light.lazy.css")]
    if (theme.light) {
      if (theme.dark) {theme.dark.unuse()}
      theme.light.use()
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
