import React, { Component } from 'react';
import BookListItem from '../BookListItem/BookListItem';
import Request from 'superagent';
import ServerConfig from '../../.././config/config.server';
import RadioButton from './RadioButton';
import SearchBar from './SearchBar';
import SearchTable from './SearchTable';

const helpers = require('../../../tools/helpers')();

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            sortedBy: '',
            searchInput: '',
            currentSearch: '',
            noResultsFoundInSearch: false,
            searchType: 'All'
        }

        this.alphabetizeTitle     = this.alphabetizeTitle.bind(this);
        this.alphabetizeByAuthor  = this.alphabetizeByAuthor.bind(this);
        this.sortByReleaseDate    = this.sortByReleaseDate.bind(this);
        this.onSearchChange       = this.onSearchChange.bind(this);
        this.onSearchKeyup        = this.onSearchKeyup.bind(this);
        this.submitSearch         = this.submitSearch.bind(this);
        this.onRadioClick         = this.onRadioClick.bind(this);
        this.resultsFoundInSearch = this.resultsFoundInSearch.bind(this);
        this.searchIsNotEmpty     = this.searchIsNotEmpty.bind(this);
        this.sortBooksBy          = this.sortBooksBy.bind(this);
    }

    sortBooksBy(e) {
        const type = e.target.value;
        const { sortedBy, books } = this.state;
        if (sortedBy === type) {
            const resort = books.reverse();
            this.setState({books: resort});
        } else {
            switch(type) {
                case 'title':
                    this.alphabetizeTitle();
                    break;
                case 'author':
                    this.alphabetizeByAuthor();
                    break;
                case 'year': 
                    this.sortByReleaseDate()
                    break;
            }
        }
    }

    alphabetizeTitle() {
        const { books } = this.state;
        const resort = books.sort((a, b) => {
            if (helpers.capitalize(a.title) < helpers.capitalize(b.title)) return -1;
            if (helpers.capitalize(a.title) > helpers.capitalize(b.title)) return 1;
            return 0;
        });

        this.setState({books: resort, sortedBy: 'title'});
    }

    alphabetizeByAuthor() {
        const { books } = this.state;

        const getLastName = (name) => {
            const capName = name.split(' ').map( word => {
                return word.charAt(0).toUpperCase() + word.substring(1, word.length);
            });
            return capName[capName.length - 1];
        }
        const resort = books.sort((a, b) => {
            const prevAuthorLastName = getLastName(a.author[0].fullName),
                  currAuthorLastName = getLastName(b.author[0].fullName);

            if (prevAuthorLastName < currAuthorLastName) return -1;
            if (prevAuthorLastName > currAuthorLastName) return 1;
            return 0;
        });

        this.setState({books: resort, sortedBy: 'author'});
}

    sortByReleaseDate() {
        const { books } = this.state;

        const resort = books.sort((a, b) => {
            if (a.released < b.released) return -1;
            if (a.released > b.released) return 1;
            return 0;
        });

        this.setState({books: resort, sortedBy: 'year'});
}

    onSearchChange(e) {
        this.setState({searchInput: e.target.value});
    }

    onSearchKeyup(e) {
        const ENTER_KEY = 13;

        if (e.keyCode === ENTER_KEY) {
            this.submitSearch();
        }
    }

    submitSearch() {
        const { hostname, port } = ServerConfig.api,
              { searchInput, searchType } = this.state;

        Request
            .get(`${hostname}${port}/book/search/${searchInput}/${searchType}`)
            .end((err, res) => {
                if (res.body.length < 1) {
                    this.setState({searchInput: '', currentSearch: searchInput, books: res.body, noResultsFoundInSearch: true});
                } else {
                    this.setState({searchInput: '', currentSearch: searchInput, books: res.body, noResultsFoundInSearch: false});
                }
            });
    }

    onRadioClick(e) {
        this.setState({searchType: e.target.value});
    }

    resultsFoundInSearch() {
        return !this.state.noResultsFoundInSearch;
    }

    searchIsNotEmpty() {
        return this.state.currentSearch != '';
    }

    render() {
        const { books, searchType, searchInput, currentSearch } = this.state,
              buttons = ['All', 'Title', 'Author', 'Genre', 'Publisher', 'Release-Date'];

        return (
            <div>
                <div className="search--container">
                    <SearchBar searchInput={searchInput} onSearchChange={this.onSearchChange} onSearchKeyup={this.onSearchKeyup} />
                    <div className="radio--container">
                        {
                            buttons.map(button => {
                                return <RadioButton searchType={searchType} onRadioClick={this.onRadioClick} button={button} />
                            })
                        }
                    </div>
                    { 
                        ( this.searchIsNotEmpty() && this.resultsFoundInSearch()) && 
                        <h1>Search "{currentSearch}"</h1>
                    }
                    { 
                        ( this.searchIsNotEmpty() && !this.resultsFoundInSearch()) && 
                        <h1>Your search for "{currentSearch}" did not return any results.</h1>
                    }
                </div>
                { 
                    books.length >= 1 ?
                    <SearchTable 
                        books={books}
                        sortBooksBy={this.sortBooksBy}
                    /> :
                    <div></div>
                }
            </div>
        );
    }
}
