import React, { Component } from 'react';
import Request from 'superagent';
import { browserHistory } from 'react-router';
import SignInView from './SignInView';

const auth = require('../../auth')();

export default class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            browserHistory.push('/browse');
        }
    }

    render() {
        const { required, email, password } = this.props;

        return (
            <SignInView 
                required={required}
                email={email}
                password={password}
                onEmailChange={this.props.onEmailChange}
                onPasswordChange={this.props.onPasswordChange}
                signIn={this.props.signIn}
                cancelLogIn={this.props.cancelLogIn}
            />
        );
    }
}










