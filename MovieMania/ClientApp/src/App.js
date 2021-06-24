import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/HomePage/Home';
import ProfileComponent from './components/Profile/ProfileComponent';

export default class App extends Component {
  static displayName = App.name;

    render() {
        const ProfilePage = ({ match }) => {
            return (
                <ProfileComponent profileId={match.params.profileId} />
            );
        }
        return (
            <Layout>
                <Switch>
                    <Route exact path='/profiles' component={Home} />
                    <Route path='/profile/:profileId' component={ProfilePage} />
                    <Redirect to='/profiles' />
                </Switch>
            </Layout>
        );
    }
}
