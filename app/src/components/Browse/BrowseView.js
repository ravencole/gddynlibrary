import React from 'react';
import BookListItem from '../BookListItem/BookListItem';

const BrowseView = (props) => {
    const { books } = props;

    const renderBooks = books.map((book, index) => {
        return <BookListItem {...book} />;
    });

    return (
        <table className="bookList--container">
            <thead>
                <tr>
                    <th>
                        Cover
                    </th>
                    <th onClick={props.alphabetizeTitle} className="table--order">
                        Title
                    </th>
                    <th onClick={props.alphabetizeByAuthor} className="table--order">
                        Author
                    </th>
                    <th>
                        Genres
                    </th>
                    <th>
                        Borrowed
                    </th>
                    <th>
                        Loaned
                    </th>
                    <th onClick={props.sortByReleaseDate} className="table--order">
                        Released
                    </th>
                </tr>
            </thead>
            <tbody>
                {renderBooks}
            </tbody>
        </table>
    );
}

export default BrowseView;