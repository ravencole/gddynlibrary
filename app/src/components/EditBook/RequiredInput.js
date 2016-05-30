import React from 'react';

const RequiredInput = (props) => {
    const { required } = props;
    
    return (
        <span className="required--symbol">
            {required && '*'}
        </span>
    );
}

export default RequiredInput;