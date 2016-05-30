import React from 'react'

const BorrowedItem = (props) => {
    if (props.borrowed.from) {
        return <div>&#10003;</div>;
    }
    return <div></div>;
}

export default BorrowedItem;