import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import BookListItemView from './BookListItemView';

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

        return (
            <BookListItemView 
                cover={cover}
                borrowed={borrowed}
                loaned={loaned}
                title={title}
                _id={_id}
                author={author}
                genre={genre}
                released={released}
                redirectToBookDetails={this.redirectToBookDetails}
            />
        );
    }
}

export default BookListItem;
