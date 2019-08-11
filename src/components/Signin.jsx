import React, { Component } from 'react';

export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignIn } = this.props;

    return (
        <button
            className="btn btn-primary btn-lg btn-blockstack"
            id="signin-button"
            onClick={ handleSignIn.bind(this) }>
            Sign In with Blockstack
        </button>
    );
  }
}
