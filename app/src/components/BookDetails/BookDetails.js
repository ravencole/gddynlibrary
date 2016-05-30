import React, { Component } from 'react';
import Request from 'superagent';
import { Link, browserHistory } from 'react-router';
import ServerConfig from '../../../config/config.server';
import BookDetailsView from './BookDetailsView';

const helpers    = require('../../../tools/helpers')(),
      apiRoute   = `${ServerConfig.api.hostname}${ServerConfig.api.port}`,
      localRoute = `${ServerConfig.local.hostname}${ServerConfig.local.port}`;

export default class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
            removeModal: false,
            loggedIn: false
        };

        this.editBook          = this.editBook.bind(this);
        this.removeBookConfirm = this.removeBookConfirm.bind(this);
        this.cancelRemoveBook  = this.cancelRemoveBook.bind(this);
        this.removeBook        = this.removeBook.bind(this);
    }

    componentDidMount() {
        Request
            .get(`${apiRoute}/book/id/${this.props.params.id}`)
            .end((err, res) => {
                this.setState({ book: res.body });
            });
        if (localStorage.token) {
            this.setState({loggedIn: true});
        }
    }

    editBook() {
        browserHistory.push(`/book/edit/${this.state.book._id}`);
    }

    removeBookConfirm() {
        this.setState({removeModal: true});
    }

    cancelRemoveBook() {
        this.setState({removeModal: false});
    }

    removeBook() {
        Request 
            .get(`${apiRoute}/book/remove/${this.state.book._id}`)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    browserHistory.push('/browse');
                }
            });
    }

    render() {
        const { book, loggedIn, removeModal } = this.state;
        
        return (
            <div>
                { 
                    book.title && 
                    <BookDetailsView
                        removeModal={removeModal}
                        book={book}
                        loggedIn={loggedIn}
                        removeBook={this.removeBook}
                        cancelRemoveBook={this.cancelRemoveBook}
                        removeBookConfirm={this.removeBookConfirm}
                        editBook={this.editBook}
                    /> 
                }
            </div>
        );
    }
}
