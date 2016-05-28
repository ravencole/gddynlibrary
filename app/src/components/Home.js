import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router';
import SignIn from './SignIn';
import Request from 'superagent';
import { browserHistory } from 'react-router';
import ServerConfig from '../.././config/config.server';

const auth = require('../auth')();

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

        this.logout = this.logout.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.cancelLogIn = this.cancelLogIn.bind(this);
        this.attemptSignIn = this.attemptSignIn.bind(this);
        this.loginIsValid = this.loginIsValid.bind(this);
    }

    cancelLogIn() {
        this.setState({})
    }

    loginIsValid() {
        const required = this.state.required;
        required.failed = true;
        if (this.state.email == '') {
            required.email = true;
            required.failed = false;
        }
        if (this.state.password == '') {
            required.password = true;
            required.failed = false;
        }

        this.setState({required: required});
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
        if (this.loginIsValid()) {
            Request
                .post(`${ServerConfig.api.hostname}${ServerConfig.api.port}/auth/signin`)
                .send({username: this.state.email, password: this.state.password})
                .end((err, result) => {
                    if (result.body.auth) {
                        this.setState({loggedIn: true, signingIn: false, email: '', password: ''});
                        localStorage.token = result.body.token;
                        browserHistory.push('/browse');
                    } else {
                        const required = this.state.required;
                        required.password = true;
                        required.failed = true;
                        this.setState({password: '', required: required});
                    }
                })
        }
    }

    attemptSignIn() {
        this.setState({signingIn: true});
    }

    cancelLogIn() {
        const required = this.state.required;
        required.email = false;
        required.password = false;
        required.failed = false;
        this.setState({signingIn: false, password: '', email: '', required: required });
        browserHistory.push('/browse');
    }

    render() {
        return (
            <div>
                <NavBar logout={this.logout} attemptSignIn={this.attemptSignIn} loggedIn={this.state.loggedIn} />
                <div className="subnav--container">
                    <Link to="/browse" activeClassName="nav--btn__active" className="subnav--item">Catalog</Link>
                    <Link to="/search" activeClassName="nav--btn__active" className="subnav--item">Search</Link>
                    <Link to="/create" activeClassName="nav--btn__active" className="subnav--item">Create</Link>
                </div>
                <div className="home--children__container">
                    {
                        this.state.signingIn ?
                        <SignIn 
                            loggedIn={this.state.loggedIn}
                            required={this.state.required}
                            email={this.state.email} 
                            password={this.state.password} 
                            signIn={this.signIn} 
                            onEmailChange={this.onEmailChange}
                            onPasswordChange={this.onPasswordChange}
                            cancelLogIn={this.cancelLogIn}
                        /> :
                        this.props.children
                    }
                </div>
            </div>
        );
    }
}
