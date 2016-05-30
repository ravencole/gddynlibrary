import React, { Component } from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /* 
            THIS.PROPS.CHILDREN CONTAINS ALL OF THE COMPONENTS THAT WILL BE LOADED
            INTO THIS MODULE BY REACT ROUTER

            THIS IS ALSO THE ENTERANCE TO THE FRONT-END OF THE APP
         */
        return (
            <div className="main--container">
                {this.props.children}
            </div>
        );
    }
}
