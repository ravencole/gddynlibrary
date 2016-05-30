import React from 'react';

const SignInView = (props) => {
    const { required, email, onEmailChange, password, onPasswordChange, signIn, cancelLogIn } = props;

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
                        onChange={onEmailChange}
                    />
                </div>
                <div className="signin--input__container">
                    <div>Password:</div>
                    <input 
                        className={required.password ? 'required--signin' : ''} 
                        type="password" 
                        value={password}
                        onChange={onPasswordChange}
                    />
                </div>
                <div className="signin--btn siginpage--btn" onClick={signIn}>Sign-In</div>
                <div className="signin--btn__cancel" onClick={cancelLogIn}>Cancel</div>
            </div>
        </div>
    );
}

export default SignInView;