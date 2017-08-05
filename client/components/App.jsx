import React from 'react';
import Dashboard from './Dashboard.jsx';
import SplashLogin from './SplashLogin.jsx';
import * as UserModel from '../models/user.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: true,

    }
  }

  componentDidMount() {
    //functions in here will be invoked when App initiate
  }

  render() {
    //can do if statement here to decide on rendering the splashlogin or the dashboard
    return (
      <div className="app">
        <h1>Events Manager</h1>
          {this.state.signedIn && <Dashboard/>}
          
        
      </div>
    );
  }
}

export default App;


// {!this.state.signedIn && <SplashLogin></SplashLogin>}