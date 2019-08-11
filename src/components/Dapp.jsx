import React, { Component, Link } from 'react';

export default class Dapp extends Component {

  constructor(props) {
  	super(props);
    this.state = {
  	  manifest: {},
      hideIcon: false
  	}
    this.controller = new AbortController()
  }

  render() {
    console.log("Manifest:", this.state.manifest)
    const appUrl = this.props.app
    const appOrigin = this.props.storage
    const title = this.state.manifest.short_name ||
                  this.state.manifest.name ||
                  (new URL(appUrl)).hostname
    const description = this.state.manifest.description
    const icons = this.state.manifest.icons
    const icon = icons ? new URL(icons[0].src, appUrl) : null
    return (
      <div className="card Dapp h-100 shadow-sm"
           href={appUrl} target="_blank">
        <div className="card-media">
          <div className="m-2">
            {icon && !this.state.hideIcon ?
                <img src={icon}
                     className="dapp-icon"
                     onError={() => this.setState({hideIcon: true})}
                     style={{height: "auto", width: "100%", marginRight: "1em"}} />
              : <div className="alert alert-warning dapp-icon w-100 h-100"
                     style={{fontSize: "2em", fontColor: "white"}}>
                   {title? title.charAt(0) : null}
                </div> }
          </div>
        </div>
        <div className="card-text py-0 mb-0 mt-1 d-flex h-100">
          <div className="card-title text-center d-flex align-items-end justify-content-center mx-auto">
                  {title}
          </div>
        </div>
        {this.props.link ?
          <a href={appUrl} className="stretched-link" target="_blank"></a>
          : null}
      </div>
    );
  }

  handleManifest (manifest) {
    console.log("Manifest:", manifest)
    this.setState({
      manifest: manifest
    })
  }

  componentWillUnmount () {
    this.controller.abort()
  }

  componentDidMount() {
    fetch(this.props.app + "/manifest.json", {signal: this.controller.signal})
    .then ( response => {response.json().then(this.handleManifest.bind(this))})
    .catch ( err => console.log("Failed to get manifest for:", this.props.app, err))
  }
}
