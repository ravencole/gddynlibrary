/* THIS COMPONENT COULD USE MORE MODULARIZATION */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GenresView from './GenresView';
import BookCover from './BookCover';
import BorrowedView from './BorrowedView';
import LoanedView from './LoanedView';
import AddGenreView from './AddGenreView';
import RequiredInput from './RequiredInput';
import DescriptionView from './DescriptionView';
import DefaultInput from './DefaultInput';
import SaveView from './SaveView';

export default class EditBookView extends Component {
    constructor(props) {
        super(props);

        this.onSubmitImage = this.onSubmitImage.bind(this);

        this.state = {
            imageLoaded: false
        }
    }

    onSubmitImage(e) {
        const file = ReactDOM.findDOMNode(this.refs.image).files[0];

        this.props.onSubmitImage(file);
        e.preventDefault();
    }

    render() {
        const { book, loggedIn, required, newCover, uploadingFile, genre } = this.props;

        /* CAN'T BE SENT TO ITS OWN FUNCTION BECAUSE WE NEED THE REF ON THE INPUT */
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
                            <div className={`edit--image ${uploadingFile ? 'upload--active overlay--active' : 'upload--inactive overlay--inactive'}`}>
                                <div onClick={this.props.uploadImage}>Change Book Cover</div>
                                { uploadingFile && renderImageUploader()}
                            </div>
                            <BookCover cover={book.cover} />
                        </div>
                        <BorrowedView book={book} toggleBorrowed={this.props.toggleBorrowed} />
                        <LoanedView book={book} toggleLoaned={this.props.toggleLoaned} />
                        {
                            book.genre.map((genre, i) => {
                                return <GenresView genre={genre} index={i} deleteGenre={this.props.deleteGenre} />;
                            })
                        }
                        <AddGenreView genre={genre} onChangeGenre={this.props.onChangeGenre} addGenre={this.props.addGenre} />
                    </div>
                    <form className="form--container">
                        <DefaultInput 
                            className={`form--group__title ${required.title && 'required'}`}  
                            onChange={this.props.onChangeTitle} 
                            value={book.title} 
                        />
                        <RequiredInput required={required.title} />

                        <br />

                        <span className="form--group__author">By </span>
                        <DefaultInput 
                            className={`form--group__author ${required.author && 'required'}`}  
                            onChange={this.props.onChangeAuthor} 
                            value={book.author[0].fullName} 
                        />
                        <RequiredInput required={required.author} />

                        <br />

                        <span>Published By </span>
                        <DefaultInput 
                            className={`form--group ${required.publisher && 'required'}`}  
                            onChange={this.props.onChangePublisher} 
                            value={book.publisher} 
                        />
                        <RequiredInput required={required.publisher} />
                        <span>
                            { ' in ' }
                        </span>
                        <DefaultInput 
                            className={`form--group form--group__year ${required.released && 'required'}`}  
                            onChange={this.props.onChangeYear} 
                            value={book.released} 
                        />
                        <RequiredInput required={required.released} />

                        <br />

                        <DescriptionView onChangeDescription={this.onChangeDescription} description={book.description} />
                    </form>
                </div>
                <SaveView onSubmit={this.props.onSubmit} />
            </div>
        );
    }    
}
