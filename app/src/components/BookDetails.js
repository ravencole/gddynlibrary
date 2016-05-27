import React, { Component } from 'react';
import Request from 'superagent';
import { Link, browserHistory } from 'react-router';

const helpers = require('../.././tools/helpers')();

export default class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
            removeModal: false,
            loggedIn: false
        };

        this.editBook = this.editBook.bind(this);
        this.removeBookConfirm = this.removeBookConfirm.bind(this);
        this.cancelRemoveBook = this.cancelRemoveBook.bind(this);
        this.removeBook = this.removeBook.bind(this);
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
            .get(`http://localhost:8080/book/remove/${this.state.book._id}`)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    browserHistory.push('/browse');
                }
            });
    }

    render() {
        const renderDetails = () => {
            return (
                <div className="details--container">
                    <div className={`remove--modal__container ${this.state.removeModal ? 'remove--modal__active' : 'remove--modal__inactive'}`}>
                        <div>{`Delete ${helpers.capitalize(this.state.book.title)}?`}</div>
                        <div onClick={this.removeBook} className="remove--modal__btn bg--red">Delete</div>
                        <div onClick={this.cancelRemoveBook} className="remove--modal__btn bg--orange">Cancel</div>
                    </div>
                    { 
                        this.state.loggedIn &&
                        <div className="delete--btn__container " onClick={this.removeBookConfirm}>
                            <div>&#9747;</div>
                            <div className="delete--btn__tooltip">delete</div>
                        </div>
                    }
                    {
                        this.state.loggedIn &&
                        <div className="edit--btn__container" onClick={this.editBook}>
                            <div>&#9756;</div>
                            <div className="edit--btn__tooltip">edit</div>
                        </div>
                    }  
                    <div className="details--container__left">
                        {this.state.book.cover && <img height="400px" src={`http://localhost:3000/images/${this.state.book.cover}`} />}
                        {!this.state.book.cover && <div className="image--standin"></div>}
                        <div className={this.state.book.borrowed.from && 'borrowed--detail'}>
                            {this.state.book.borrowed.from && 'this is a borrowed book. be responsible'}
                        </div>
                        <div className={this.state.book.loaned.to && 'loaned--detail'}>
                            {this.state.book.loaned.to && 'you loaned this thing out. hope its safe'}
                        </div>
                        {this.state.book.genre.map(genre => <div><Link to={`/browse/genre/${genre}`}>{genre}</Link></div>)}
                    </div>
                    <div className="details--container__right">
                        <h1>{helpers.capitalize(this.state.book.title)}</h1>
                        <h3><Link to={`/browse/author/${this.state.book.author[0].fullName}`}>{`By ${helpers.capitalize(this.state.book.author[0].fullName)}`}</Link></h3>
                        <p>{`Published by ${helpers.capitalize(this.state.book.publisher)} in ${this.state.book.released}`}</p>
                        <div style={{width: '60%'}}>{this.state.book.description}</div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                { this.state.book.title && renderDetails() }
            </div>
        );
    }
}
