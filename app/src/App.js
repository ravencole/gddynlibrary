import React, { Component } from 'react';
import NavLink from './components/NavLink';
import { Link } from 'react-router';
import NavBar from './components/NavBar';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main--container">
                {this.props.children}
            </div>
        );
    }
}
