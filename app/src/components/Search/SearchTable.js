import React from 'react';
import BookListItem from '../BookListItem/BookListItem';

const SearchTable = (props) => {
    const { books, sortBooksBy } = props;

    return (
       <table className="bookList--container">
            <thead>
                <tr>
                    <th>Cover</th>
                    <th onClick={sortBooksBy} value='title' className="table--order">Title</th>
                    <th onClick={sortBooksBy} value='author' className="table--order">Author</th>
                    <th>Genres</th>
                    <th>Borrowed</th>
                    <th>Loaned</th>
                    <th onClick={sortBooksBy} value='year' className="table--order">Released</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map((book, index) => {
                       return <BookListItem key={`booklistitem${index}`} {...book} />; 
                    })
                }
            </tbody>
        </table>
    );
}

export default SearchTable;