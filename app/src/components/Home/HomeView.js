import React from 'react';
import SignIn from '../Signin/SignIn';
import NavBar from '../NavBar';
import { Link } from 'react-router';

export default class HomeView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            logout, 
            signingIn,
            attemptSignIn,
            loggedIn,
            required,
            email,
            password,
            signIn,
            onEmailChange,
            onPasswordChange,
            cancelLogIn
        } = this.props;
        return (
            <div>
                <NavBar logout={logout} attemptSignIn={attemptSignIn} loggedIn={loggedIn} />
                <div className="subnav--container">
                    <Link to="/browse" activeClassName="nav--btn__active" className="subnav--item">Catalog</Link>
                    <Link to="/search" activeClassName="nav--btn__active" className="subnav--item">Search</Link>
                    <Link to="/create" activeClassName="nav--btn__active" className="subnav--item">Create</Link>
                </div>
                <div className="home--children__container">
                    {
                        signingIn ?
                        <SignIn 
                            loggedIn={loggedIn}
                            required={required}
                            email={email} 
                            password={password} 
                            signIn={signIn} 
                            onEmailChange={onEmailChange}
                            onPasswordChange={onPasswordChange}
                            cancelLogIn={cancelLogIn}
                        /> :
                        this.props.children
                    }
                </div>
            </div>
        );
    }
}