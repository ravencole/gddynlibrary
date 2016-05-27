import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import SignIn from './components/SignIn';
import Browse from './components/Browse';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import EditBook from './components/EditBook';
import CreateBook from './components/CreateBook';
import Search from './components/Search';

require('./styles/styles.scss');

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LandingPage} />
            <Route path="/home" component={Home} >
                <Route path="/browse" component={Browse}>
                    <Route path="/browse/genre/:genre" component={Browse} />
                    <Route path="/browse/author/:author" component={Browse} />
                </Route>
                <Route path="/search" component={Search} />
                <Route path="/book/:id" component={BookDetails} />
                <Route path="/book/edit/:id" component={EditBook} />
                <Route path="/create" component={CreateBook} />
            </Route>
        </Route>
    </Router>
    ), document.getElementById('app'));