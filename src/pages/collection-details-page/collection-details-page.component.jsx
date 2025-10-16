import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './collection-details-page.styles.scss';

import fetchMovies from '../../assets/movie.data';

import BookMovieTitlePage from '../book-movie-title-page/book-movie-title-page.component';
import CollectionDetailsMovie from '../../components/collection-details-movie/collection-details-movie.component';

// const CollectionDetailsPage = ({ match }) => {


//     const collections = [];
//     const currentCollection = collections.find(collection => collection.imdbID === match.params.imdbID);
//     console.log(currentCollection);
//     return(
//         <div>
//             <Switch>
//                 <Route exact={true} path={`${match.path}`} component={CollectionDetailsMovie} />
//                 <Route path={`${match.path}/:Title`} component={BookMovieTitlePage} />
//             </Switch>
//         </div>
//     );
// }

class CollectionDetailsPage  extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collections: []
        }
    }

    componentDidMount() {
        fetchMovies(this)
    }

    render() {
        const {collections} = this.state;
        const currentCollection = collections.find(collection => collection.imdbID === this.props["match"].params.imdbID);
        
        return (
            <div>
                <Switch>
                    <Route exact={true} path={`${this.props["match"].path}`} component={CollectionDetailsMovie} />
                    <Route path={`${this.props["match"].path}/:Title`} component={BookMovieTitlePage} />
                </Switch>
            </div>
        );
    }
}

export default CollectionDetailsPage;