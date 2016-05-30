import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import Browse from './components/Browse/Browse';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import BookDetails from './components/BookDetails/BookDetails';
import EditBook from './components/EditBook/EditBook';
import CreateBook from './components/CreateBook/CreateBook';
import Search from './components/Search/Search';

export default class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
        );
    }
}