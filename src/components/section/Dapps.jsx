import React, { Component } from 'react';
import { Person } from 'blockstack';
import { BlockstackContext} from '../Blockstack.jsx'
import Dapp from '../Dapp.jsx'

export default class Dapps extends Component {
  constructor(props) {
  	super(props);
  }

  renderCore () {
    const { userSession, userData } = this.context
    const profile = userData.profile
    const person = new Person(profile)
    const apps = person.profile().apps
    const defaultApps = {"https://cantbeevil.app": null}
    const appCount = Object.keys(apps || defaultApps).filter(app => !app.includes("localhost")).length
    const devCount = Object.keys(apps || defaultApps).filter(app => app.includes("localhost")).length
    return(
    <div className="card">
      <h1 className="card-header">Dapps You Have Used</h1>
        <div className="alert alert-info alert-dismissible fade show" role="alert"
           hidden={!apps}>
          <p>Found {Object.keys(apps || defaultApps).filter(app => !app.includes("localhost")).length}
          &nbsp;Blockstack dapps in the app history for this account.</p>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div className="row mx-1">
      { Object.entries(apps || defaultApps).map( ([app, storage]) =>
           !app.includes("localhost") ?
           <div className="col col-6 col-sm-3 col-md-2 col-lg-2 mb-4" key={app}>
             <Dapp app={app} storage={storage} userSession={userSession} />
           </div>
           : <span key={app}/>)
        }
      </div>
      {devCount > 0 ? <div className="alert alert-warning">
                        Your app usage history also reveals you're a dapp developer...
                        {devCount} apps were used from <i>localhost.</i>
                      </div>
                    : null}
       <div className="alert alert-info">
         <div className="row mx-1">
           <div className="col col-sm-9 col-md-10 mb-4">
             That apps get to know what other dapps you've used can be beneficial.
             It allows dapps to integrate by accessing each other's data.
              Moreover, here is one app that uses this data for good to recall
              apps you have used in the past so you can get back to them:
            </div>
            <div className="col col-6 col-sm-3 col-md-2 col-lg-2 mb-4 mx-auto">
              <Dapp app={"https://dappity.app"} userSession={userSession} link={true} />
            </div>
          </div>
       </div>
    </div>)
  }

  render() {
    const { userSession } = this.context
    return (
      userSession.isUserSignedIn()
      ? this.renderCore()
      : <span />
    );
  }

  componentDidMount() {
  }
}

Dapps.contextType = BlockstackContext
