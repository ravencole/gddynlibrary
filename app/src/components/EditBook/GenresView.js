import React from 'react';

const GenresView = (props) => {
    const { genre, index, deleteGenre } = props;
    return (
        <div key={`genre${index}`}>
            {genre} 
            <span 
                onClick={deleteGenre} 
                value={genre} 
                className="form--btn__delete"
            >
                &#9747;
            </span>
        </div>
    );
}

export default GenresView;