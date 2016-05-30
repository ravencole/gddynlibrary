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
        const { cover, borrowed, loaned, title, _id, author, genre, released } = this.props;

        const loadImage = () => {
            const { hostname, port } = ServerConfig.local;

            if (cover) {
                const img = `${hostname}${port}/images/${cover}`;
                return <img src={img} height="50px"/>;
            }
            return;
        };

        const borrowedItem = () => {
            if (borrowed.from) {
                return <div>&#10003;</div>;
            }
        };

        const loanedItem = () => {
            if (loaned.to) {
                return <div>&#10003;</div>;
            }
        };

        return ( 
                <tr onClick={this.redirectToBookDetails} key={`${title}_${_id}_browsetable`}>
                    <td className="td--center">{loadImage()}</td>
                    <td>{helpers.capitalize(title)}</td>
                    <td>{helpers.capitalize(author[0].fullName)}</td>
                    <td>{ genre.join(', ') }</td>
                    <td className={borrowed.from && 'td--check td--check__borrowed'}>{borrowedItem()}</td>
                    <td className={loaned.to && 'td--check td--check__loaned'}>{loanedItem()}</td>
                    <td className="td--center">{released}</td>
                </tr>
        );
    }
}

BookListItem = Radium(BookListItem);
export default BookListItem;
