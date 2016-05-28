import React, { Component } from 'react';
import Request from 'superagent';
import BookListItem from './BookListItem';
import ServerConfig from '../.././config/config.server';

const helpers = require('../../tools/helpers')();

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
        if (this.props.params.genre) {
            this.getByGenre(this.props.params.genre);
        } else if (this.props.params.author) {
            this.getByAuthor(this.props.params.author);
        } else {
            this.getIndex();
        }
    }

    getByAuthor(author) {
        Request
            .get(`${ServerConfig.api.hostname}${ServerConfig.api.port}/author/author/${author}`)
            .end((err, res) => {
                const books = res.body.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                });
                this.setState({ books: books });
            });
    }

    getByGenre(genre) {
        Request
            .get(`${ServerConfig.api.hostname}${ServerConfig.api.port}/book/genre/${genre}`)
            .end((err, res) => {
                const books = res.body.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                });
                this.setState({ books: books });
            });
    }

    getIndex() {
        Request
            .get(`${ServerConfig.api.hostname}${ServerConfig.api.port}/book`)
            .end((err, res) => {
                const books = res.body.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                });
                this.setState({ books: books });
            });
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

    render() {
        const renderBooks = this.state.books.map((book, index) => {
            return <BookListItem {...book} />;
        });

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
}
