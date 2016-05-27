import React, { Component } from 'react';
import Request from 'superagent';
import { browserHistory } from 'react-router';

const auth = require('../auth')();

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
        return (
            <div className="sigin--container__main">
                <div className="signin--container__inner">
                    <div className="signin--heading">Sign-In</div>
                    <div className="signin--input__container">
                        <div>Email:</div>
                        <input 
                            className={this.props.required.email ? 'required--signin' : ''} 
                            type="text" 
                            value={this.props.email}
                            onChange={this.props.onEmailChange}
                        />
                    </div>
                    <div className="signin--input__container">
                        <div>Password:</div>
                        <input 
                            className={this.props.required.password ? 'required--signin' : ''} 
                            type="password" 
                            value={this.props.password}
                            onChange={this.props.onPasswordChange}
                        />
                    </div>
                    <div className="signin--btn siginpage--btn" onClick={this.props.signIn}>Sign-In</div>
                    <div className="signin--btn__cancel" onClick={this.props.cancelLogIn}>Cancel</div>
                </div>
            </div>
        );
    }
}










