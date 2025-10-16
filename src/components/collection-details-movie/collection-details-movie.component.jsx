import React from 'react';
import { Link } from 'react-router-dom';
import './collection-details-movie.styles.scss';

import fetchMovies from '../../assets/movie.data';

class CollectionDetailsMovie extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: 'false',
            collections: []
        }
    }

    componentDidMount(){

        fetchMovies(this);

        fetch('http://localhost:3001/api/signedin', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            if(json===true){
                this.setState({isLoggedIn: 'true'});
            }
            else{
                this.setState({isLoggedIn: 'false'});
            }
        })
        .catch(err => console.log(err));
    }

    bookWithoutLogin = () => {
        alert("In order to purchase tickets, you must sign-in/register.");
    }

    render() {
        const { collections } = this.state;
        const currentCollection = collections.find(collection => collection.imdbID === this.props.match.params.imdbID);
        console.log(currentCollection);

        if(currentCollection===undefined){
            return(<h1>Movie does not exist</h1>);
        }

        return(
            <div className='parent-collection-details-container'>
                <div className='collection-details-container'>
                    <div className='image-container'>
                        <img className='image' alt={currentCollection.Title} src={`${currentCollection.Poster}`} />
                    </div>
                    <div className='content'>
                        <h2>{currentCollection.Title}</h2>
                        <p><span>Released: </span>{currentCollection.Released}</p>
                        <p><span>Rated: </span>{currentCollection.Rated}</p>
                        <p><span>Genre: </span>{currentCollection.Genre}</p>
                        <p><span>Runtime: </span>{currentCollection.Runtime}</p>
                        <p><span>Cast: </span>{currentCollection.Actors}</p>
                        <p><span>Director: </span>{currentCollection.Director}</p>
                        <p><span>Writer: </span>{currentCollection.Writer}</p>
                        <p><span>Plot: </span>{currentCollection.Plot}</p>
                        {
                            currentCollection.Year>=2022 ?
                            (<p><span>IMDB Rating: </span>N/A</p>)
                            :
                            (<p><span>IMDB Rating: </span>{currentCollection.imdbRating}</p>)
                        }
                    </div>
                </div>
                {
                    this.state.isLoggedIn==='true' ?
                    (
                        <Link to={`${this.props.match.url}/${currentCollection.Title.replace(/ /g, "+")}`}>
                            <div className='book-now'>
                                <span>Book Tickets</span>
                            </div>
                        </Link>
                    )
                    :
                    (
                        <Link to='/signin' onClick={this.bookWithoutLogin}>
                            <div className='book-now'>
                                <span>Book Tickets</span>
                            </div>
                        </Link>
                    )
                }
            </div>
        );
    }
}

export default CollectionDetailsMovie;