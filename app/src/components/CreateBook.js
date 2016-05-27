'use strict'

import React, { Component } from 'react';
import Request from 'superagent';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

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
        const required = this.state.required;
        let failed = false;
        for (const prop in required) {
            if (this.state.book[prop] == '') {
                required[prop] = true;
                failed = true;
            } else if (this.state.book.author[0].fullName == '') {
                required.author = true;
                failed = true;
            } else {
                required[prop] = false;
            }
        }
        
        if (failed) {
            required.failed = true;
            this.setState({required: required});
            return false;
        }
        required.failed = false;
        this.setState({required: required});
        return true;
    }

    submitImageData() {
        if (this.state.image) {
            const image = ReactDOM.findDOMNode(this.refs.createimage).files[0];
            const formData = new FormData;
            formData.append('image', image);   
            Request
                .post('http://localhost:8080/upload')
                .send(formData)
                .end((err, res) => {
                    const book = this.state.book;
                    book.cover = res.body;
                    this.setState({book: book});
                    this.submitFormData();
                });
        } else {
            this.submitFormData();
        }
    }

    submitFormData() {
        const book = this.state.book;
        Request
            .post('http://localhost:8080/book/create')
            .send({book: book})
            .end((err, res) => {
                browserHistory.push(`/book/${res.body.ops[0]._id}`);
            });
    }

    splitAndTrim(str) {
        return str.split(',').map( genre => genre.trim());
    }

    formatFormData() {
        const book = this.state.book;
        if (book.genre) {
            const genres = this.splitAndTrim(this.state.book.genre);
            book.genre = genres;
        } else {
            book.genre = [];
        }
        
        this.setState({book: book});
        
    }

    redirectBookDetailsPage(id) {
        browserHistory.push(`/book/${id}`);
    }

    onSubmit() {
        if (this.isValid()) {
            this.formatFormData();
            this.submitImageData();
        }
    }

    onChangeImage() {
        this.setState({image: true});
    }

    render() {
        return (
            <div className="createBook--container__main">
                { this.state.loggedIn ?
                    <div className="createBook--container">
                        <div>
                            <label>Title:</label><input className={`${this.state.required.title && 'create--required'}`} onChange={this.onTitleChange} value={this.state.book.title} type="text" />
                        </div>
                        <hr />
                        <div>
                            <label>Author:</label><input className={`${this.state.required.author && 'create--required'}`} onChange={this.onAuthorChange} value={this.state.book.author[0].fullName} type="text" />
                        </div>
                        <hr />
                        <div>
                            <label>Publisher:</label><input className={`${this.state.required.publisher && 'create--required'}`} onChange={this.onPublisherChange} value={this.state.book.publisher} type="text" />
                        </div>
                        <hr />
                        <div>
                            <label>Release Year:</label><input className={`${this.state.required.released && 'create--required'}`} onChange={this.onReleasedChange} value={this.state.book.released} type="text" />
                        </div>
                        <hr />
                        <div>
                            <label>Genre: <span className="small--text">seperate with commas</span></label><input onChange={this.onGenreChange} value={this.state.book.genre} type="text" />
                        </div>
                        <hr />
                        <div>
                            <div>Borrowed:</div>
                            <input type="checkbox" onChange={this.onBorrowedChange} value={this.state.book.borrowed.from} className="toggle toggle--borrowed" id="borrowed" />
                            <label for="borrowed"></label>
                        </div>
                        <hr />
                        <div>
                            <div>Loaned:</div>
                            <input type="checkbox" onChange={this.onLoanedChange} value={this.state.book.loaned.to} className="toggle toggle--loaned" id="loaned" />
                            <label for="loaned"></label>
                        </div>
                        <hr />
                        <div>
                            <label>Cover:</label><input type="file" onChange={this.onChangeImage} name="createimage" ref="createimage"/>
                        </div>
                        <hr />
                        <div>
                            <label>Description:</label>
                            <textarea onChange={this.onDescriptionChange} value={this.state.book.description} className="textarea"/>
                        </div>
                        <div onClick={this.onSubmit} className="createBook--btn">
                            Submit
                        </div>
                    </div> :
                    <h1>You must be logged in to create new books.</h1>
                }
            </div>
        );
    }
}
