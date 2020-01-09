import React, { Component } from 'react';
import { useBlockstack } from 'react-blockstack';

export default function Signin (props) {
  const { signIn } = useBlockstack()
  return (
      <button
          className="btn btn-primary btn-lg btn-blockstack"
          id="signin-button"
          disabled={!signIn}
          onClick={ signIn }>
          Sign In with Blockstack
      </button>
  )
}
