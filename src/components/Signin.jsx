import React, { Component } from 'react';
import { userSession } from './Global.js';

export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="alert alert-primary mt-4">
        <p className="lead">
          Curious about what Blockstack apps get to know about you?
          Sign in for a personalized interactive guide that reveals
          the facts.</p>
        <button
            className="btn btn-primary btn-lg"
            id="signin-button"
            onClick={ handleSignIn.bind(this) }>
            Sign In with Blockstack
        </button>
      </div>
    );
  }

  componentDidMount() {
    
  }
}
