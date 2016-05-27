import React, { Component } from 'react';
import BookListItem from './BookListItem';
import Request from 'superagent';

const helpers = require('../../tools/helpers')();

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

        this.alphabetizeTitle = this.alphabetizeTitle.bind(this);
        this.alphabetizeByAuthor = this.alphabetizeByAuthor.bind(this);
        this.sortByReleaseDate = this.sortByReleaseDate.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchKeyup = this.onSearchKeyup.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.onRadioClick = this.onRadioClick.bind(this);
    }

    alphabetizeTitle() {
        if (this.state.sortedBy === 'title') {
            const resort = this.state.books.reverse();
            this.setState({books: resort});
        } else {
            const resort = this.state.books.sort((a, b) => {
                if (helpers.capitalize(a.title) < helpers.capitalize(b.title)) return -1;
                if (helpers.capitalize(a.title) > helpers.capitalize(b.title)) return 1;
                return 0;
            });
            this.setState({books: resort, sortedBy: 'title'});
        }
    }

    alphabetizeByAuthor() {
        const getLastName = (name) => {
            const capName = name.split(' ').map( word => {
                return word.charAt(0).toUpperCase() + word.substring(1, word.length);
            });
            return capName[capName.length - 1];
        }

        if (this.state.sortedBy === 'author') {
            const resort = this.state.books.reverse();
            this.setState({books: resort});
        } else {
            const resort = this.state.books.sort((a, b) => {
                const prevAuthorLastName = getLastName(a.author[0].fullName),
                      currAuthorLastName = getLastName(b.author[0].fullName);

                if (prevAuthorLastName < currAuthorLastName) return -1;
                if (prevAuthorLastName > currAuthorLastName) return 1;
                return 0;
            });
            this.setState({books: resort, sortedBy: 'author'});
        }
    }

    sortByReleaseDate() {
        if (this.state.sortedBy === 'year') {
            const resort = this.state.books.reverse();
            this.setState({books: resort});
        } else {
            const resort = this.state.books.sort((a, b) => {
                if (a.released < b.released) return -1;
                if (a.released > b.released) return 1;
                return 0;
            });
            this.setState({books: resort, sortedBy: 'year'});
        }
    }

    onSearchChange(e) {
        this.setState({searchInput: e.target.value});
    }

    onSearchKeyup(e) {
        if (e.keyCode === 13) {
            this.submitSearch();
        }
    }

    submitSearch() {
        Request
            .get(`http://localhost:8080/book/search/${this.state.searchInput}/${this.state.searchType}`)
            .end((err, res) => {
                if (res.body.length < 1) {
                    this.setState({searchInput: '', currentSearch: this.state.searchInput, books: res.body, noResultsFoundInSearch: true});
                } else {
                    this.setState({searchInput: '', currentSearch: this.state.searchInput, books: res.body, noResultsFoundInSearch: false});
                }
            });
    }

    onRadioClick(e) {
        this.setState({searchType: e.target.value});
    }

    render() {
        const renderBooks = this.state.books.map((book, index) => {
            return <BookListItem key={`booklistitem${index}`} {...book} />;
        });

        const renderTable = () => {
            return (
                <table className="bookList--container">
                    <thead>
                        <tr>
                            <th>Cover</th>
                            <th onClick={this.alphabetizeTitle} className="table--order">Title</th>
                            <th onClick={this.alphabetizeByAuthor} className="table--order">Author</th>
                            <th>Genres</th>
                            <th>Borrowed</th>
                            <th>Loaned</th>
                            <th onClick={this.sortByReleaseDate} className="table--order">Released</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderBooks}
                    </tbody>
                </table>
            );
        }

        
        const buttons = ['All', 'Title', 'Author', 'Genre', 'Publisher', 'Release-Date'];

        const renderRadioButtons = buttons.map(button => {
            return (
                <div
                    className={this.state.searchType == button ? 'radio radio--checked' : 'radio radio--unchecked'}
                    onClick={this.onRadioClick}
                    value={button}
                >
                    {button}
                </div>
            );
        });

        return (
            <div>
                <div className="search--container">
                    <div className="searchInput--container">
                        <input 
                            className="search--input" 
                            type="text" 
                            value={this.state.searchInput} 
                            onChange={this.onSearchChange} 
                            onKeyUp={this.onSearchKeyup} 
                            placeholder="Search"
                        />
                        <span><div>&#9906;</div></span>
                    </div>
                    <div className="radio--container">
                        {renderRadioButtons}
                    </div>
                    {(this.state.currentSearch != '' && !this.state.noResultsFoundInSearch) && <h1>Search "{this.state.currentSearch}"</h1>}
                    {(this.state.currentSearch != '' && this.state.noResultsFoundInSearch) && <h1>Your search for "{this.state.currentSearch}" did not return any results.</h1>}
                </div>
                { this.state.books.length >= 1 && renderTable() }
            </div>
        );
    }
}
