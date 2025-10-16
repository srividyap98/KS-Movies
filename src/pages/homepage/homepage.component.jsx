import React from 'react';
import {  Link } from 'react-router-dom';

import fetchMovies from '../../assets/movie.data';
import './homepage.styles.scss';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import CollectionSearchPreview from '../../components/collection-search-preview/collection-search-preview.component';   


class HomePage extends React.Component {
    constructor(){
        super();
        this.state = {
            collections: [],
            searchTerm: "",
            genreTerm: ""
        }
    }

    componentDidMount() {
        fetchMovies(this)
    }



    render() {
        const { collections } = this.state;
        const { genreTerm, searchTerm } = this.state;
        return(
            <div className='home-page'>

                <div className='search-section'>
                    <div className='search-inline'>
                        <input className='search-box' onChange={(event) => { this.setState({ searchTerm: event.target.value }); console.log(event.target.value) }} type="text" placeholder="Search for movies..."/>
                        <select onChange={(event) => { this.setState({ genreTerm: event.target.value }); console.log(event.target.value) }} className='genre-select' name="genre">
                            <option>All</option>
                            <option>Action</option>
                            <option>Adventure</option>
                            <option>Biography</option>
                            <option>Comedy</option>
                            <option>Crime</option>
                            <option>Drama</option>
                            <option>Documentry</option>
                            <option>Family</option>
                            <option>Fantasy</option>
                            <option>History</option>
                            <option>Music</option>
                            <option>Mystery</option>
                            <option>Music</option>
                            <option>Romance</option>
                            <option>Sci-Fi</option>
                            <option>Sport</option>
                            <option>Thriller</option>
                            <option>War</option>
                            <option>Western</option>
                            
                        </select>
                    </div>
                    
                    <div className='search-scroll-view'>
                        <CollectionSearchPreview searchTerm={searchTerm} genreTerm={genreTerm} collections={collections} />
                    </div>
                </div>

                <div className='home-page-now-showing'>
                    <h1>Now Showing</h1>
                    <CollectionPreview collectionType='now-showing-indirect' collections={collections} />
                    <Link to='/nowshowing' className='load-more-items' >
                        <div>
                            Load More Movies
                        </div>
                    </Link>            
                </div>
                <div className='home-page-popular'>
                    <h1>Recommended by KS Movies</h1>
                    <CollectionPreview collectionType='popular-indirect' collections={collections} />
                    <Link to='/popular' className='load-more-items'>
                        <div>
                            Load More Movies
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default HomePage;