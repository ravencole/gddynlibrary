import React from 'react';

const SaveInput = (props) => {
    const { onSubmit } = props;
    
    return (
        <div className="form--submit__btn" onClick={onSubmit}>Save</div>
    );
}

export default SaveInput;