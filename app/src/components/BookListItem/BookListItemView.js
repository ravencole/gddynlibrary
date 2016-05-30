import React, { Component } from 'react';
import ServerConfig from '../../.././config/config.server';
import LoadImage from './LoadImage';
import BorrowedItem from './BorrowedItem';
import LoanedItem from './LoanedItem';

const helpers = require('../../.././tools/helpers')();

const BookListItemView = (props) => {
    const { cover, borrowed, loaned, title, _id, author, genre, released } = props;

    return ( 
        <tr onClick={props.redirectToBookDetails} key={`${title}_${_id}_browsetable`}>
            <td className="td--center">
                <LoadImage cover={cover} />
            </td>
            <td>
                { helpers.capitalize(title) }
            </td>
            <td>
                { helpers.capitalize(author[0].fullName) }
            </td>
            <td>
                { genre.join(', ') }
            </td>
            <td className={borrowed.from && 'td--check td--check__borrowed'}>
                <BorrowedItem borrowed={borrowed} />
            </td>
            <td className={loaned.to && 'td--check td--check__loaned'}>
                <LoanedItem loaned={loaned} />
            </td>
            <td className="td--center">
                { released }
            </td>
        </tr>
    );
}

export default BookListItemView;
