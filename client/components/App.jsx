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
  }

  componentWillMount() {
    //functions in here will be invoked when App initiate

    window.getUser((data) => {
      if (data.passport) {
        console.log(data.passport.user, 'HERE?');
        this.setState({
          signedIn: true,
          user: data.passport.user
        })
      }
    })
    // $.ajax({
    //   type: "GET",
    //   url: '/session',
    //   contentType: 'application/json',
    //   success: (data) => {
    //     console.log(data, "IS THIS HERE?")
    //     if (data.passport) {
    //       this.setState({
    //         signedIn: true,
    //         user: data.passport.user
    //       })
    //     }
    //   }
    // })
  }
          // {this.state.signedIn && <Dashboard></Dashboard>}
          // {!this.state.signedIn && <SplashLogin></SplashLogin>}

  render() {
    //can do if statement here to decide on rendering the splashlogin or the dashboard
    return (
      <div className="app">
        {this.state.signedIn && <Dashboard user={this.state.user} />}
        {!this.state.signedIn && <SplashLogin/>}
      </div>
    );
  }
}

export default App;


// {!this.state.signedIn && <SplashLogin></SplashLogin>}
