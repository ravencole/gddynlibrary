import React from 'react';
import { Link } from 'react-router';

export default class NavLink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link {...this.props} className="nav--btn" activeClassName="nav--btn__active" />
        );
    }
}