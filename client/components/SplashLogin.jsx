import React from 'react';
import { render } from 'react-dom';
import {Grid, Col} from 'react-bootstrap';

class SplashLogin extends React.Component {
	constructor(props) {
		super(props)
	}

	handleLogin() {
		// send to backend so we can authorize user
		// should receive back token?
		// pass back token so we can send to app to send to dashboard
	}

	render() {
		<div className="splash">
			<h1 className="appName">Concreet</h1>
			<h4 className="tagline">Never miss a meeting again</h4>
			<a onClick={this.handleLogin.bind(this)}>Sign in with google</a>
		</div>
	}
}

export default SplashLogin;