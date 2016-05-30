import React from 'react'

const LoanedItem = (props) => {
    if (props.loaned.to) {
        return <div>&#10003;</div>;
    }
    return <div></div>
}

export default LoanedItem;