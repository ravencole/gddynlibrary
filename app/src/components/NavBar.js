import React from 'react';
import { Link } from 'react-router';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loggedIn, logout, attemptSignIn } = this.props;

        return (
            <div className="nav--container">
                <div className="nav--container__left">
                    <Link to="/home" className="nav--btn">GDDYN LIBRARY</Link>
                </div>
                <div className="nav--container__right">
                    { loggedIn ?
                        <div className="nav--btn" onClick={logout}>Log-Out</div> :
                        <div className="nav--btn" onClick={attemptSignIn}>Sign-In</div>
                    }
                </div>
            </div>
        );
    }
}