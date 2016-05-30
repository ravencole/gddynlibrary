import React from 'react';

const DescriptionView = (props) => {
    const { description, onChangeDescription } = props;

    return (
        <textarea 
            className="form--group form--group__description" 
            onChange={onChangeDescription} 
            value={description} 
        />
    );
}

export default DescriptionView;