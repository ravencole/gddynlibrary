import React from 'react';

const RadioButton = (props) => {
    const { searchType, button, onRadioClick } = props;

    return (
        <div
            className={
                searchType == button ? 
                'radio radio--checked' : 
                'radio radio--unchecked'
            }
            onClick={onRadioClick}
            value={button}
        >
            {button}
        </div>
    );
}

export default RadioButton;