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
        const { required, email, password } = this.props;

        return (
            <div className="sigin--container__main">
                <div className="signin--container__inner">
                    <div className="signin--heading">Sign-In</div>
                    <div className="signin--input__container">
                        <div>Email:</div>
                        <input 
                            className={required.email ? 'required--signin' : ''} 
                            type="text" 
                            value={email}
                            onChange={this.props.onEmailChange}
                        />
                    </div>
                    <div className="signin--input__container">
                        <div>Password:</div>
                        <input 
                            className={required.password ? 'required--signin' : ''} 
                            type="password" 
                            value={password}
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










