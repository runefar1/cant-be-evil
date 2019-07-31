import React, { Component } from 'react';
import { Person } from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return null;
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	},
  	  },
  	};
  }

  renderCore () {
    const { person } = this.state;
    return(
    <div className="alert alert-info">
      <h2>Personal Information</h2>
      <p>Apps get to learn some personal information from your personal
         Blockstack profile. Let's take a look...</p>
      { person.name()
        ? <p><strong>Name: </strong>
            Welcome {person.name()}... yes, apps get your name, or
            at least what you said it was when signing up with Blockstack.
            You can change it if you like.</p>
        : <p><strong>Name: </strong>
            You didn't provide a name when signing up for this account.
            That's of course OK. You can set it to whatever you like.
            Whatever name you provide will be available for the apps.</p>
      }
      {
        person.avatarUrl()
        ? <div>
            <p>Nice shot...</p>
            <img src={person.avatarUrl()} className="profile-avatar" />
            <p>Apps get to see your avatar picture.</p>
          </div>
        : <p><strong>Profile image: </strong>
             You haven't yet uploaded an image for your avatar... which is OK.
             Nothing to be ashamed about. Apps don't care. But they may
             make your experience a little nicer if you do. Who
             doesn't like to see themself from time to time ;-)</p>
      }
      { (!person.name() && !person.avatarUrl())
        ? <p>Well, not much to reveal when you haven't provided much personal
            information to reveal... Let's see what else apps get to know about you.</p>
        : null }
    </div>)
  }

  render() {
    const { userSession } = this.props;
    return (
      !userSession.isSignInPending() ? this.renderCore() : null
    );
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
  }
}
