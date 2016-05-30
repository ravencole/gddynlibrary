import React, { Component } from 'react';
import Request from 'superagent';
import { browserHistory } from 'react-router';
import ServerConfig from '../../.././config/config.server';
import HomeView from './HomeView';

const auth = require('../../auth')();

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: auth.loggedIn(),
            email: '',
            password: '',
            required: {
                email: false,
                password: false,
                failed: false
            },
            signingIn: false
        }

        this.logout           = this.logout.bind(this);
        this.onEmailChange    = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.signIn           = this.signIn.bind(this);
        this.cancelLogIn      = this.cancelLogIn.bind(this);
        this.attemptSignIn    = this.attemptSignIn.bind(this);
        this.loginIsValid     = this.loginIsValid.bind(this);
    }

    cancelLogIn() {
        this.setState({})
    }

    loginIsValid() {
        const { required } = this.state;

        required.failed = true;
        if (this.state.email == '') {
            required.email = true;
            required.failed = false;
        }
        if (this.state.password == '') {
            required.password = true;
            required.failed = false;
        }

        this.setState({ required });
        return required.failed;
    }
    
    logout() {
        if (auth.logout()) {
            this.setState({loggedIn: false});
        }
    }

    onEmailChange(e) {
        this.setState({email: e.target.value});
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    signIn() {
        const { password, required, email } = this.state,
              { hostname, port } = ServerConfig.api;

        if (this.loginIsValid()) {
            Request
                .post(`${hostname}${port}/auth/signin`)
                .send({username: email, password: password})
                .end((err, result) => {
                    if (result.body.auth) {
                        const required = {
                            email: false,
                            password: false,
                            failed: false
                        }
                        this.setState({loggedIn: true, signingIn: false, email: '', password: '', required});
                        localStorage.token = result.body.token;
                        browserHistory.push('/browse');
                    } else {
                        required.password = true;
                        required.failed = true;
                        this.setState({password: '', required });
                    }
                })
        }
    }

    attemptSignIn() {
        this.setState({signingIn: true});
    }

    cancelLogIn() {
        const required = {
            email: false,
            password: false,
            failed: false
        }

        this.setState({signingIn: false, password: '', email: '', required });
        browserHistory.push('/browse');
    }

    render() {
        const { loggedIn, required, email, password, signingIn } = this.state;

        return (
            <HomeView 
                loggedIn={loggedIn}
                required={required}
                email={email}
                password={password}
                signingIn={signingIn}
                logout={this.logout}
                attemptSignIn={this.attemptSignIn}
                onEmailChange={this.onEmailChange}
                onPasswordChange={this.onPasswordChange}
                cancelLogIn={this.cancelLogIn}
                children={this.props.children}
                signIn={this.signIn}
            />
        );
    }
}

/*

 */
