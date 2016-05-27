import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Request from 'superagent';
import { browserHistory } from 'react-router';
import EditBookView from './EditBookView';

export default class EditBook extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            book: {},
            required: {
                title: false,
                author: false,
                released: false,
                publisher: false
            },
            genre: '',
            uploadingFile: false,
            newCover: '',
            loggedIn: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangePublisher = this.onChangePublisher.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.addGenre = this.addGenre.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.deleteGenre = this.deleteGenre.bind(this);
        this.toggleLoaned = this.toggleLoaned.bind(this);
        this.toggleBorrowed = this.toggleBorrowed.bind(this);
        this.isValid = this.isValid.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.onSubmitImage = this.onSubmitImage.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
    }

    componentDidMount() {
        Request
            .get(`http://localhost:8080/book/id/${this.props.params.id}`)
            .end((err, res) => {
                this.setState({ book: res.body });

            });

        if (localStorage.token) {
            this.setState({loggedIn: true});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid(this.state.book)) {
            Request
                .post(`http://localhost:8080/book/id/${this.state.book._id}`)
                .send({book: this.state.book})
                .end((err, res) => {
                    browserHistory.push(`/book/${this.state.book._id}`);
                });
        }
    }

    isValid(book) {
        const required = {};
        if (book.title == '') {
            required.title = true;
            required.failed = true;
        }
        if (book.author[0].fullName == '') {
            required.author = true;
            required.failed = true;
        }
        if (book.released == '') {
            required.released = true;
            required.failed = true;
        }

        if (book.publisher == '') {
            required.publisher = true;
            required.failed = true;
        }

        if (!required.failed) {
            this.setState({required: {}});
            return true;
        }

        this.setState({required: required});
        return false;
    }

    onChangeTitle(e) {
        const book = this.state.book;
        book.title = e.target.value;
        this.setState({'book': book});
    }

    onChangeAuthor(e) {
        const book = this.state.book;
        book.author[0].fullName = e.target.value;
        this.setState({'book': book});
    }

    onChangePublisher(e) {
        const book = this.state.book;
        book.publisher = e.target.value;
        this.setState({'book': book});
    }

    onChangeYear(e) {
        const book = this.state.book;
        book.released = e.target.value;
        this.setState({'book': book});
    }

    onChangeDescription(e) {
        const book = this.state.book;
        book.description = e.target.value;
        this.setState({'book': book});
    }

    deleteGenre(e) {
        const book = this.state.book,
              genreIndex = this.state.book.genre.indexOf(e.target.value);

        if (genreIndex != -1) {
            book.genre.splice(genreIndex, 1);
            this.setState({book: book});
        }
    }

    addGenre(e) {
        if (e.keyCode === 13) {
            const book = this.state.book;
            book.genre.push(e.target.value);
            this.setState({book: book, genre: ''});
        }
    }

    onChangeGenre(e) {
        this.setState({genre: e.target.value});
    }

    toggleLoaned() {
        const book = this.state.book;
        book.loaned.to = !book.loaned.to;

        this.setState({book: book});
    }

    toggleBorrowed() {
        const book = this.state.book;
        book.borrowed.from = !book.borrowed.from;

        this.setState({book: book});
    }

    uploadImage() {
        this.setState({uploadingFile: !this.state.uploadingFile});
    }

    onSubmitImage(file) {
        const formData = new FormData;
        formData.append('image', file);   
        Request
            .post('http://localhost:8080/upload')
            .send(formData)
            .end((err, res) => {
                const book = this.state.book;
                book.cover = res.body;
                this.setState({book: book, uploadingFile: false});
            });
    }

    render() {
        return (
            <div>
                {(this.state.book.title && this.state.loggedIn) ?
                    <EditBookView 
                            book={this.state.book}
                            genre={this.state.genre}
                            newCover={this.state.newCover}
                            uploadingFile={this.state.uploadingFile}
                            required={this.state.required}
                            toggleBorrowed={this.toggleBorrowed}
                            toggleLoaned={this.toggleLoaned}
                            onChangeGenre={this.onChangeGenre}
                            addGenre={this.addGenre}
                            deleteGenre={this.deleteGenre}
                            onChangeDescription={this.onChangeDescription}
                            onChangeYear={this.onChangeYear}
                            onChangePublisher={this.onChangePublisher}
                            onChangeAuthor={this.onChangeAuthor}
                            onChangeTitle={this.onChangeTitle}
                            onSubmit={this.onSubmit}
                            onSubmitImage={this.onSubmitImage}
                            uploadImage={this.uploadImage}
                        /> 
                        : <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translateX(-50%)'}}>You must be logged in to edit the books.</div>
                }
            </div>
        );
    }
}


