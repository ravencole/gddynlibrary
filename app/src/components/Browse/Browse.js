import React, { Component } from 'react';
import Request from 'superagent';
import ServerConfig from '../../.././config/config.server';
import BrowseView from './BrowseView';

const helpers = require('../../../tools/helpers')();

export default class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            sortedBy: '',
        }

        this.getByAuthor = this.getByAuthor.bind(this);
        this.getByGenre = this.getByGenre.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.alphabetizeTitle = this.alphabetizeTitle.bind(this);
        this.alphabetizeByAuthor = this.alphabetizeByAuthor.bind(this);
        this.sortByReleaseDate = this.sortByReleaseDate.bind(this);
    }

    componentDidMount() {
        const { author, genre } = this.props.params;

        if (genre) {
            this.getByGenre(genre);
        } else if (author) {
            this.getByAuthor(author);
        } else {
            this.getIndex();
        }

    }

    getByAuthor(author) {
        const { hostname, port } = ServerConfig.api;

        Request
            .get(`${hostname}${port}/author/author/${author}`)
            .end((err, res) => {
                const books = res.body.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                });
                this.setState({ books });
            });
    }

    getByGenre(genre) {
        const { hostname, port } = ServerConfig.api;

        Request
            .get(`${hostname}${port}/book/genre/${genre}`)
            .end((err, res) => {
                const books = res.body.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                });
                this.setState({ books });
            });
    }

    getIndex() {
        const { hostname, port } = ServerConfig.api;

        Request
            .get(`${hostname}${port}/book`)
            .end((err, res) => {
                const books = res.body.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                });
                this.setState({ books });
            });
    }

    alphabetizeTitle() {
        const { books, sortedBy } = this.state;

        if (sortedBy === 'title') {
            const resort = books.reverse();
            this.setState({books: resort});
        } else {
            const resort = books.sort((a, b) => {
                if (helpers.capitalize(a.title) < helpers.capitalize(b.title)) return -1;
                if (helpers.capitalize(a.title) > helpers.capitalize(b.title)) return 1;
                return 0;
            });
            this.setState({books: resort, sortedBy: 'title'});
        }
    }

    alphabetizeByAuthor() {
        const { books, sortedBy } = this.state;

        const getLastName = (name) => {
            const capName = name.split(' ').map( word => {
                return word.charAt(0).toUpperCase() + word.substring(1, word.length);
            });
            return capName[capName.length - 1];
        }

        if (sortedBy === 'author') {
            const resort = books.reverse();
            this.setState({books: resort});
        } else {
            const resort = books.sort((a, b) => {
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
        const { books, sortedBy } = this.state;

        if (sortedBy === 'year') {
            const resort = books.reverse();
            this.setState({books: resort});
        } else {
            const resort = books.sort((a, b) => {
                if (a.released < b.released) return -1;
                if (a.released > b.released) return 1;
                return 0;
            });
            this.setState({books: resort, sortedBy: 'year'});
        }
    }

    render() {
        const { books } = this.state;
        return (
            <BrowseView 
                alphabetizeTitle={this.alphabetizeTitle}
                alphabetizeByAuthor={this.alphabetizeByAuthor}
                sortByReleaseDate={this.sortByReleaseDate}
                books={books}
            />
        );
    }
}
