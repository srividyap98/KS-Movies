import React from 'react';
import './manage-movies.styles.scss';
import fetchMovies from '../../assets/movie.data';
import { Link } from 'react-router-dom';


class ManageMovies extends React.Component {
    constructor(){
        super();
        this.state = {
            collections: []
        }
    }

    componentDidMount() {
        fetchMovies(this)
    }

    reloadMovies() {
        fetchMovies(this)
    }

    delete_movie(movie, movieId) {
        if(  window.confirm("Are you sure you want to delete " + movie + "?") ) 
        {
            fetch("http://localhost:3001/api/deletemovie", {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({ 
                        movieId
                    })
                })
                .then((response) => response.json())
                .then((actualData) => { console.log(actualData); this.reloadMovies(); });
        } else {
        }

        

    }

    render(){
        const { collections } = this.state;

        return(
            <div className='some-container'>
                <h1>Manage Movies</h1>
                <Link to='/addormodifymovie/null' className='movie-link'>Add a new movie</Link>

                <br/>
                <br/>
                <br/>
                <br/>

                <table>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Movie</th>
                        <th>Genre</th>
                    </tr>
                    {
                        collections.map(movie => <tr><td className='cursor'> <Link to={'/addormodifymovie/'+movie._id} className='option'>✏️</Link> </td><td className='cursor' onClick={() => this.delete_movie(movie.Title, movie._id)}>❌</td><td>{ movie.Title }</td><td>{ movie.Genre }</td></tr>)
                    }
                </table>
            </div>
        )
    }
}

export default ManageMovies;