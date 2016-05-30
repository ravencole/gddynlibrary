import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CreateBookView extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        const image = ReactDOM.findDOMNode(this.refs.createimage).files[0];
        this.props.onSubmit(image);
    }

    render() {
        const { required, book, image, loggedIn } = this.props;

        return (
            <div className="createBook--container">
                <div>
                    <label>Title:</label><input className={`${required.title && 'create--required'}`} onChange={this.props.onTitleChange} value={book.title} type="text" />
                </div>
                <hr />
                <div>
                    <label>Author:</label><input className={`${required.author && 'create--required'}`} onChange={this.props.onAuthorChange} value={book.author[0].fullName} type="text" />
                </div>
                <hr />
                <div>
                    <label>Publisher:</label><input className={`${required.publisher && 'create--required'}`} onChange={this.props.onPublisherChange} value={book.publisher} type="text" />
                </div>
                <hr />
                <div>
                    <label>Release Year:</label><input className={`${required.released && 'create--required'}`} onChange={this.props.onReleasedChange} value={book.released} type="text" />
                </div>
                <hr />
                <div>
                    <label>Genre: <span className="small--text">seperate with commas</span></label><input onChange={this.props.onGenreChange} value={book.genre} type="text" />
                </div>
                <hr />
                <div>
                    <div>Borrowed:</div>
                    <input type="checkbox" onChange={this.props.onBorrowedChange} value={book.borrowed.from} className="toggle toggle--borrowed" id="borrowed" />
                    <label for="borrowed"></label>
                </div>
                <hr />
                <div>
                    <div>Loaned:</div>
                    <input type="checkbox" onChange={this.props.onLoanedChange} value={book.loaned.to} className="toggle toggle--loaned" id="loaned" />
                    <label for="loaned"></label>
                </div>
                <hr />
                <div>
                    <label>Cover:</label><input type="file" onChange={this.props.onChangeImage} name="createimage" ref="createimage"/>
                </div>
                <hr />
                <div>
                    <label>Description:</label>
                    <textarea onChange={this.props.onDescriptionChange} value={book.description} className="textarea"/>
                </div>
                <div onClick={this.onSubmit} className="createBook--btn">
                    Submit
                </div>
            </div>
        );
    }
}
