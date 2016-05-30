import React from 'react';

const DefaultInput = (props) => {
    const { className, value, onChange } = props;
    return (
        <input className={className} value={value} onChange={onChange} type="text" />
    );
}

export default DefaultInput;