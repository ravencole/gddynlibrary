'use strict'

import React, { Component } from 'react';
import Request from 'superagent';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import CreateBookView from './CreateBookView';
import ServerConfig from '../.././config/config.server';

export default class NewBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {
                title: '',
                genre: '',
                author: [
                    {
                        fullName: '',
                        firstName: null,
                        middleName: null,
                        lastName: null
                    }
                ],
                bookId: null,
                publisher: '',
                description: '',
                borrowed: {
                    from: false,
                    on: null,
                    returned: {
                        on: null
                    }
                },
                loaned: {
                    to: false,
                    on: null
                },
                released: '',
                cover: ''
            },
            required: {
                title: false,
                author: false,
                publisher: false,
                released: false,
                failed: false
            },
            image: false,
            loggedIn: false
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onPublisherChange = this.onPublisherChange.bind(this);
        this.onReleasedChange = this.onReleasedChange.bind(this);
        this.onBorrowedChange = this.onBorrowedChange.bind(this);
        this.onLoanedChange = this.onLoanedChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onGenreChange = this.onGenreChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.submitFormData = this.submitFormData.bind(this);
        this.formatFormData = this.formatFormData.bind(this);
        this.redirectBookDetailsPage = this.redirectBookDetailsPage.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.submitImageData = this.submitImageData.bind(this);
    }

    componentDidMount() {
        if (localStorage.token) {
            this.setState({loggedIn: true});
        }
    }

    onTitleChange(e) {
        const book = this.state.book;
        book.title = e.target.value;
        this.setState({book: book});
    }

    onAuthorChange(e) {
        const book = this.state.book;
        book.author[0].fullName = e.target.value;
        this.setState({book: book});
    }

    onPublisherChange(e) {
        const book = this.state.book;
        book.publisher = e.target.value;
        this.setState({book: book});
    }

    onReleasedChange(e) {
        const book = this.state.book;
        book.released = e.target.value;
        this.setState({book: book});
    }

    onDescriptionChange(e) {
        const book = this.state.book;
        book.description = e.target.value;
        this.setState({book: book});
    }

    onBorrowedChange() {
        const book = this.state.book;
        book.borrowed.from = !book.borrowed.from;
        this.setState({book: book});
    }

    onLoanedChange() {
        const book = this.state.book;
        book.loaned.to = !book.loaned.to;
        this.setState({book: book});
    }

    onGenreChange(e) {
        const book = this.state.book;
        book.genre = e.target.value;
        this.setState({book: book});
    }

    isValid() {
        const { book, required } = this.state;

        let failed = false;
        for (const prop in required) {
            if (book[prop] == '') {
                required[prop] = true;
                failed = true;
            } else if (book.author[0].fullName == '') {
                required.author = true;
                failed = true;
            } else {
                required[prop] = false;
            }
        }
        
        if (failed) {
            required.failed = true;
            this.setState({required});
            return false;
        }
        required.failed = false;
        this.setState({required});
        return true;
    }

    submitImageData(imageFile) {
        const { image, book } = this.state,
              { hostname, port } = ServerConfig.api;

        if (image) {
            const formData = new FormData;
            formData.append('image', imageFile);   
            Request
                .post(`${hostname}${port}/upload`)
                .send(formData)
                .end((err, res) => {
                    book.cover = res.body;
                    this.setState({ book });
                    this.submitFormData();
                });
        } else {
            this.submitFormData();
        }
    }

    submitFormData() {
        const { book } = this.state,
              { hostname, port } = ServerConfig.api;
        
        Request
            .post(`${hostname}${port}/book/create`)
            .send({book})
            .end((err, res) => {
                browserHistory.push(`/book/${res.body.ops[0]._id}`);
            });
    }

    splitAndTrim(str) {
        return str.split(',').map( genre => genre.trim());
    }

    formatFormData(image) {
        const { book } = this.state;

        if (book.genre) {
            const genres = this.splitAndTrim(this.state.book.genre);
            book.genre = genres;
        } else {
            book.genre = [];
        }
        
        this.setState({ book });
        this.submitImageData(image);
    }

    redirectBookDetailsPage(id) {
        browserHistory.push(`/book/${id}`);
    }

    onSubmit(image) {
        if (this.isValid()) {
            this.formatFormData(image);
        }
    }

    onChangeImage() {
        this.setState({image: true});
    }

    render() {
        const { loggedIn, required, book, image } = this.state;

        return (
            <div className="createBook--container__main">
                { loggedIn ?
                    <CreateBookView
                        required={required}
                        book={book}
                        image={image}
                        loggedIn={loggedIn}
                        onChangeImage={this.onChangeImage}
                        onSubmit={this.onSubmit}
                        onGenreChange={this.onGenreChange}
                        onDescriptionChange={this.onDescriptionChange}
                        onTitleChange={this.onTitleChange}
                        onAuthorChange={this.onAuthorChange}
                        onBorrowedChange={this.onBorrowedChange}
                        onLoanedChange={this.onLoanedChange}
                        onPublisherChange={this.onPublisherChange}
                        onReleasedChange={this.onReleasedChange}
                        submitImageData={this.submitImageData}
                    /> :
                    <h1>You must be logged in to create new books.</h1>
                }
            </div>
        );
    }
}
