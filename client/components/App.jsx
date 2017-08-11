import React from 'react';
import Dashboard from './Dashboard.jsx';
import SplashLogin from './SplashLogin.jsx';
import * as UserModel from '../models/user.js';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      user: {}
    }
  this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentWillMount() {
    //functions in here will be invoked when App initiate
    UserModel.getUser((data) => {
      if (data.passport) {
        //console.log(data.passport.user, 'HERE?');
        this.setState({
          signedIn: true,
          user: data.passport.user
        })
      }
    })
  }

  handleSignOut() {
    UserModel.signOut((data)=>{
      this.setState({
        signedIn: false,
        user: {}
      })
    });
  }

  render() {
    return (
      <div className="app">
        { this.state.signedIn && <button className="signout" onClick={this.handleSignOut}>Sign Out</button> }
        { this.state.signedIn && <Dashboard user={this.state.user} /> }
        { !this.state.signedIn && <SplashLogin/> }
      </div>
    );
  }
}

export default App;


// {!this.state.signedIn && <SplashLogin></SplashLogin>}
