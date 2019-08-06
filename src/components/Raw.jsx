import React, { Component } from 'react'

class Raw extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
    this.userSession = this.props.userSession

  }

  handleChange(event) {
   this.setState({value: event.target.value});
  }

  renderCore() {
    this.userData = this.userSession.loadUserData()
    const userData = this.userData
    const appPrivatekey = userData.appPrivatekey
    const username = userData.username
    const email = userData.email
    const app = this.state.app
    const authResponseToken = userData.authResponseToken
    const coreSessionToken = userData.coreSessionToken
    const decentralizedID = userData.decentralizedID
    const gaiaAssociationToken = userData.gaiaAssociationToken
    const hubUrl = userData.hubUrl
    const identityAddress = userData.identityAddress
    const profile = userData.profile
    return (
      <div className="row">
        <div className="table-responsive">
          <table className="table table-dark table-striped">
           <tbody>
            <tr><th>username</th><td>{username}</td></tr>
            <tr><th>email</th><td>{email}</td></tr>
            <tr><th>appPrivatekey</th><td>{appPrivatekey}</td></tr>
            <tr><th>authResponseToken</th><td>{authResponseToken}</td></tr>
            <tr><th>coreSessionToken</th><td>{coreSessionToken}</td></tr>
            <tr><th>decentralizedID</th><td>{decentralizedID}</td></tr>
            <tr><th>gaiaAssociationToken</th><td>{gaiaAssociationToken}</td></tr>
            <tr><th>hubUrl</th><td>{hubUrl}</td></tr>
            <tr><th>identityAddress</th><td>{identityAddress}</td></tr>
            <tr><th>profile</th><td>{JSON.stringify(profile)}</td></tr>
           </tbody>
          </table>

          <div className="col-12-w-100">
                <div className="w-100">
                    <div className="card-body">
                        <h5 className="card-title">Profile</h5>


            <div className="table-responsive">
              <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Profile key</th>
                  <th>Profile value</th>
                </tr>
              </thead>
                <tbody>
                  {
                    Object.entries(profile).map (([key, val]) => {
                    return(
                       <tr key={key}><th>{key}</th><td>{JSON.stringify(val)}</td></tr>
                    )}) }
                </tbody>
              </table>
                  </div>
                </div>
            </div>
          </div>
          </div>

        <hr />
    </div>
    );
  }

  render () {
    const userSession = this.userSession
    return (userSession.isUserSignedIn() ? this.renderCore() : null)
  }

  componentDidMount() {
    const userSession = this.userSession
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(this.forceUpdate.bind(this))
    }
  }


}

export default Raw
