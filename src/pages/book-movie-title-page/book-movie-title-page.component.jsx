import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './book-movie-title-page.styles.scss';

import MovieDate from '../../components/movie-date/movie-date.component';
import BookDatePage from '../book-date-page/book-date-page.component';

const BookMovieTitlePage = ({ match }) => {
    return(
        <div>
            <Switch>
                <Route exact={true} path={`${match.path}`} component={MovieDate} />
                <Route path={`${match.path}/:date`} component={BookDatePage} />
            </Switch>
        </div>
    );
}

export default BookMovieTitlePage;