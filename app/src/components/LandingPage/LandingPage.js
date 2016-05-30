import React, { Component } from 'react';
import { Link } from 'react-router';

const LandingPage = (props) => {
    return (
        <div className="backgroundBodyImage">
            <div className="home--background__heading">GDDYN LIBRARY</div>
            <div className="signin--container">
                <Link to="home" className="signin--btn">Browse</Link>
            </div>
        </div>
    );
}

export default LandingPage;
