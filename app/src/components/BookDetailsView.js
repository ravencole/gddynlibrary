import React, { Component } from 'react';
import server from '../.././config/config.server';
import { Link, browserHistory } from 'react-router';

const helpers = require('../.././tools/helpers')();
const apiRoute = `${server.api.hostname}${server.api.port}`;
const localRoute = `${server.local.hostname}${server.local.port}`;

export default class BookDetailsView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { book, removeModal, loggedIn, editBook, removeBook, cancelRemoveBook, removeBookConfirm } = this.props;
        
        return (
             <div className="details--container">
                     <div className={`remove--modal__container ${ removeModal ? 'remove--modal__active' : 'remove--modal__inactive'}`}>
                         <div>{`Delete ${helpers.capitalize(book.title)}?`}</div>
                         <div onClick={removeBook} className="remove--modal__btn bg--red">Delete</div>
                         <div onClick={cancelRemoveBook} className="remove--modal__btn bg--orange">Cancel</div>
                     </div>
                     { 
                        loggedIn &&
                        <div className="delete--btn__container " onClick={removeBookConfirm}>
                            <div>&#9747;</div>
                            <div className="delete--btn__tooltip">delete</div>
                        </div>
                    }
                    {
                        loggedIn &&
                        <div className="edit--btn__container" onClick={editBook}>
                            <div>&#9756;</div>
                            <div className="edit--btn__tooltip">edit</div>
                        </div>
                    }  
                    <div className="details--container__left">
                        {book.cover && <img height="400px" src={`${localRoute}/images/${book.cover}`} />}
                        {!book.cover && <div className="image--standin"></div>}
                        <div className={book.borrowed.from && 'borrowed--detail'}>
                            {book.borrowed.from && 'this is a borrowed book. be responsible'}
                        </div>
                        <div className={book.loaned.to && 'loaned--detail'}>
                            {book.loaned.to && 'you loaned this thing out. hope its safe'}
                        </div>
                        {book.genre.map(genre => <div><Link to={`/browse/genre/${genre}`}>{genre}</Link></div>)}
                    </div>
                    <div className="details--container__right">
                        <h1>{helpers.capitalize(book.title)}</h1>
                        <h3><Link to={`/browse/author/${book.author[0].fullName}`}>{`By ${helpers.capitalize(book.author[0].fullName)}`}</Link></h3>
                        <p>{`Published by ${helpers.capitalize(book.publisher)} in ${book.released}`}</p>
                        <div style={{width: '60%'}}>{book.description}</div>
                    </div>
                </div>
        );
    }
}
