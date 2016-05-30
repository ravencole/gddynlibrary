import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class EditBookView extends Component {
    constructor(props) {
        super(props);

        this.onSubmitImage = this.onSubmitImage.bind(this);

        this.state = {
            imageLoaded: false
        }
    }

    componentDidMount() {

    }

    onSubmitImage(e) {
        const file = ReactDOM.findDOMNode(this.refs.image).files[0];

        this.props.onSubmitImage(file);
        e.preventDefault();
    }

    render() {
        const { book, loggedIn, required, newCover, uploadingFile, genre } = this.props;

        const renderGenres = () => {
            return book.genre.map( (genre, index) => {
                return (
                    <div key={`genre${index}`}>
                        {genre} 
                        <span 
                            onClick={this.props.deleteGenre} 
                            value={genre} 
                            className="form--btn__delete"
                        >
                            &#9747;
                        </span>
                    </div>
                );
            });
        }

        const renderImageUploader = () => {
            return (
                <form className="imageUpload--form" onSubmit={this.onSubmitImage}>
                    <input type="file" name="image" ref="image" />
                    <button type="submit">Submit</button>
                </form>
            );
        }

        return (
            <div>
                <div className="editForm--container">
                    <div className="left--container">
                        <div className="cover--container">
                            <div 
                                className={`edit--image ${uploadingFile ? 'upload--active overlay--active' : 'upload--inactive overlay--inactive'}`} 
                            >
                                <div onClick={this.props.uploadImage}>Change Book Cover</div>
                                { uploadingFile && renderImageUploader()}
                            </div>
                            { book.cover && <img height="400px" src={`http://localhost:3000/images/${book.cover}`} />}
                            { !book.cover && <div className="image--standin"></div> }
                        </div>
                        <div 
                            className={`form--borrowed ${book.borrowed.from && 'form--borrowed__active'}`} 
                            onClick={this.props.toggleBorrowed}
                        >
                            Borrowed
                        </div>

                        <div 
                            className={`form--loaned ${book.loaned.to && 'form--loaned__active'}`} 
                            onClick={this.props.toggleLoaned}
                        >
                            Loaned
                        </div>

                        {renderGenres()}

                        <input 
                            value={genre} 
                            onChange={this.props.onChangeGenre} 
                            onKeyUp={this.props.addGenre} 
                            type="text" 
                            placeholder="Add Genre..." 
                        />
                    </div>
                    <form className="form--container">
                        <input 
                            className={`form--group__title ${required.title && 'required'}`} 
                            type="text" 
                            onChange={this.props.onChangeTitle} 
                            value={book.title} 
                        />
                        <span className="required--symbol">
                            {required.title && '*'}
                        </span>

                        <br />

                        <span className="form--group__author">By </span>
                        <input 
                            className={`form--group__author ${required.author && 'required'}`} 
                            type="text" 
                            onChange={this.props.onChangeAuthor} 
                            value={book.author[0].fullName} 
                        />
                        <span className="required--symbol">
                            {required.author && '*'}
                        </span>

                        <br />
                        
                        <span>Published By </span>
                        <input 
                            className={`form--group ${required.publisher && 'required'}`} 
                            type="text" onChange={this.props.onChangePublisher} 
                            value={book.publisher} 
                        />
                        <span className="required--symbol">
                            {required.publisher && '*'}
                        </span>
                        <span>
                            { ' in ' }
                        </span>
                        <input 
                            className={`form--group form--group__year ${required.released && 'required'}`} 
                            type="text" onChange={this.props.onChangeYear} 
                            value={book.released} 
                        />
                        <span className="required--symbol">
                            {required.released && '*'}
                        </span>

                        <br />

                        <textarea 
                            className="form--group form--group__description" 
                            onChange={this.props.onChangeDescription} 
                            value={book.description} 
                        />
                    </form>
                </div>
                <div className="form--submit__btn" onClick={this.props.onSubmit}>Save</div>
            </div>
        );
    }    
}
