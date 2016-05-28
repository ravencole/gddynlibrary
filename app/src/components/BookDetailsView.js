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
        return (
             <div className="details--container">
                     <div className={`remove--modal__container ${this.props.removeModal ? 'remove--modal__active' : 'remove--modal__inactive'}`}>
                         <div>{`Delete ${helpers.capitalize(this.props.book.title)}?`}</div>
                         <div onClick={this.props.removeBook} className="remove--modal__btn bg--red">Delete</div>
                         <div onClick={this.props.cancelRemoveBook} className="remove--modal__btn bg--orange">Cancel</div>
                     </div>
                     { 
                        this.props.loggedIn &&
                        <div className="delete--btn__container " onClick={this.props.removeBookConfirm}>
                            <div>&#9747;</div>
                            <div className="delete--btn__tooltip">delete</div>
                        </div>
                    }
                    {
                        this.props.loggedIn &&
                        <div className="edit--btn__container" onClick={this.props.editBook}>
                            <div>&#9756;</div>
                            <div className="edit--btn__tooltip">edit</div>
                        </div>
                    }  
                    <div className="details--container__left">
                        {this.props.book.cover && <img height="400px" src={`${localRoute}/images/${this.props.book.cover}`} />}
                        {!this.props.book.cover && <div className="image--standin"></div>}
                        <div className={this.props.book.borrowed.from && 'borrowed--detail'}>
                            {this.props.book.borrowed.from && 'this is a borrowed book. be responsible'}
                        </div>
                        <div className={this.props.book.loaned.to && 'loaned--detail'}>
                            {this.props.book.loaned.to && 'you loaned this thing out. hope its safe'}
                        </div>
                        {this.props.book.genre.map(genre => <div><Link to={`/browse/genre/${genre}`}>{genre}</Link></div>)}
                    </div>
                    <div className="details--container__right">
                        <h1>{helpers.capitalize(this.props.book.title)}</h1>
                        <h3><Link to={`/browse/author/${this.props.book.author[0].fullName}`}>{`By ${helpers.capitalize(this.props.book.author[0].fullName)}`}</Link></h3>
                        <p>{`Published by ${helpers.capitalize(this.props.book.publisher)} in ${this.props.book.released}`}</p>
                        <div style={{width: '60%'}}>{this.props.book.description}</div>
                    </div>
                </div>
        );
    }
}
