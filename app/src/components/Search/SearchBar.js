import React from 'react'

const SearchBar = (props) => {
    const { searchInput, onSearchChange, onSearchKeyup } = props;

    return (
        <div className="searchInput--container">
            <input 
                className="search--input" 
                type="text" 
                value={searchInput} 
                onChange={onSearchChange} 
                onKeyUp={onSearchKeyup} 
                placeholder="Search"
            />
            <span><div>&#9906;</div></span>
        </div>
    );
}

export default SearchBar;