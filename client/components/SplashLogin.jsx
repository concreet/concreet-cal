import React from 'react';
import { render } from 'react-dom';
import {Grid, Col} from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class SplashLogin extends React.Component {
	constructor(props) {
		super(props)
	}

	handleLogin() {
		// send to backend so we can authorize user
		// should receive back token?
		// pass back token so we can send to app to send to dashboard
		console.log('hello')
	}

	render() {
		return (
			<div className="splash">
				<div className="logo">
					<img className="logoImage" src={"/static/images/logo.png"} />
				</div>
				<h1 className="appName">Concreet</h1>
				<h4 className="tagline">Never miss a meeting again</h4>
				<a href="/auth/google"><button className="signinButton">Sign in with Google</button></a>
				<div>
					<img className="meetingImage" src={"/static/images/meeting1.jpg"} />
				</div>
				<div>
					<img className="meetingImage" src={"/static/images/meeting2.jpeg"} />
				</div>
				<div>
					<img className="meetingImage" src={"/static/images/meeting3.jpg"} />
				</div>
				<div>
					<img className="meetingImage" src={"/static/images/meeting4.jpg"} />
				</div>
			</div>
		)
	}
}

export default SplashLogin;