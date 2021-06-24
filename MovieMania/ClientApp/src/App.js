import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Switch>
                <Route exact path='/profiles' component={Home} />
                <Redirect to='/profiles' />
            </Switch>
        </Layout>
    );
  }
}
