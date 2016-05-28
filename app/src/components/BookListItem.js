import React, { Component } from 'react';
import Radium from 'radium';
import { browserHistory } from 'react-router';
import ServerConfig from '../.././config/config.server';

const helpers = require('../.././tools/helpers')();

class BookListItem extends Component {
    constructor(props) {
        super(props);

        this.redirectToBookDetails = this.redirectToBookDetails.bind(this);
    }

    redirectToBookDetails() {
        browserHistory.push(`/book/${this.props._id}`);
    }

    render() {
        const loadImage = () => {
            if (this.props.cover) {
                const img = `${ServerConfig.local.hostname}${ServerConfig.local.port}/images/${this.props.cover}`;
                return <img src={img} height="50px"/>;
            }
            return;
        };

        const borrowed = () => {
            if (this.props.borrowed.from) {
                return <div>&#10003;</div>;
            }
        };

        const loaned = () => {
            if (this.props.loaned.to) {
                return <div>&#10003;</div>;
            }
        };

        return ( 
                <tr onClick={this.redirectToBookDetails} key={`${this.props.title}_${this.props._id}_browsetable`}>
                    <td className="td--center">{loadImage()}</td>
                    <td>{helpers.capitalize(this.props.title)}</td>
                    <td>{helpers.capitalize(this.props.author[0].fullName)}</td>
                    <td>{ this.props.genre.join(', ') }</td>
                    <td className={this.props.borrowed.from && 'td--check td--check__borrowed'}>{borrowed()}</td>
                    <td className={this.props.loaned.to && 'td--check td--check__loaned'}>{loaned()}</td>
                    <td className="td--center">{this.props.released}</td>
                </tr>
        );
    }
}

BookListItem = Radium(BookListItem);
export default BookListItem;
