import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Connect from './Connect/Connect';
import Callback from './Callback/Callback';
import Game from './Game/Game';
import NotFound from './NotFound/NotFound';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import './App.css';
import auth0Client from './Auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true
    };
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Connect} />
          <Route exact path='/callback' component={Callback} />
          <SecuredRoute
            path='/game'
            component={Game}
            checkingSession={this.state.checkingSession}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
