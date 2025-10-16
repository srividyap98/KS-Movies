import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import './book-show-page.styles.scss';

import BookSeats from '../../components/book-seats/book-seats.component';
import PaymentSection from '../payment/payment.component';

const BookShowPage = ({ match }) => {
    return(
        <div>
            <Switch>
                <Route exact={true} path={`${match.path}`} component={BookSeats} />
                <Route path={`${match.path}/:seat/pay`} component={PaymentSection} />
            </Switch>
        </div>
    );
}

export default BookShowPage;