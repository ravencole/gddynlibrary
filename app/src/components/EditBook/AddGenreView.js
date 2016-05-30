import React from 'react';

const AddGenreView = (props) => {
    const { genre, onChangeGenre, addGenre } = props;

    return (
        <input 
            value={genre} 
            onChange={onChangeGenre} 
            onKeyUp={addGenre} 
            type="text" 
            placeholder="Add Genre..." 
        />
    );
}

export default AddGenreView;