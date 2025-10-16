import React from 'react';
import './recommendedmovies.styles.scss';
import fetchMovies from '../../assets/movie.data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';


class RecommendedMovies extends React.Component {
    constructor(){
        super();
        this.state = {
            collections: []
        }
    }

    componentDidMount() {
        fetchMovies(this)
    }

    render(){
        const { collections } = this.state;
        return(
            <div className='recommended-container'>
                <h1>Recommended by KS Movies</h1>
                <CollectionPreview collectionType='popular-direct' collections={collections} />
            </div>
        )
    }
}

export default RecommendedMovies;