import React from 'react';

const LoanedView = (props) => {
    const { book, toggleLoaned } = props;

    return (
        <div 
            className={`form--loaned ${book.loaned.to && 'form--loaned__active'}`} 
            onClick={toggleLoaned}
        >
            Loaned
        </div>
    );
}

export default LoanedView;