import React from 'react';

const BorrowedView = (props) => {
    const { book, toggleBorrowed } = props;

    return (
        <div 
            className={`form--borrowed ${book.borrowed.from && 'form--borrowed__active'}`} 
            onClick={toggleBorrowed}
        >
            Borrowed
        </div>
    );
}

export default BorrowedView;