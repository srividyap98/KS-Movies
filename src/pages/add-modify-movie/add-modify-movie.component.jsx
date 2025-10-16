import React from 'react';
import './add-modify-movie.styles.scss';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const AddModifyMovie = (props) => {

    const [data, setData] = React.useState([]);
    const [dataUpdated, setDataUpdated] = React.useState(false);


    const [movidId, setMovieId] = React.useState(null);
    const [movieTitle, setMovieTitle]  = React.useState("");
    const [movieReleased, setMovieReleased]  = React.useState("");
    const [movieGenre, setMovieGenre]  = React.useState("");
    const [movieRuntime, setMovieRuntime]  = React.useState("");
    const [movieCast, setMovieCast]  = React.useState("");
    const [movieDirector, setMovieDirector]  = React.useState("");
    const [movieWriter, setMovieWriter]  = React.useState("");
    const [moviePlot, setMoviePlot]  = React.useState("");
    const [movieImdbId, setMovieImdbId] = React.useState("");
    const [movieImdbRating, setMovieImdbRating]  = React.useState("");
    const [movieThumbnailURL, setMovieThumbnailURL]  = React.useState("");


    const updateMovie = () => {
        fetch("http://localhost:3001/api/setmoviedetails", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ 
                    _id: movidId,
                    Title: movieTitle,
                    Released: movieReleased,
                    Genre: movieGenre,
                    Runtime: movieRuntime,
                    Actors: movieCast,
                    Director: movieDirector,
                    Writer: movieWriter,
                    Plot: moviePlot,
                    imdbID: movieImdbId,
                    imdbRating: movieImdbRating,
                    Poster: movieThumbnailURL
            })
        })
        .then((response) => response.json())
        .then((actualData) => { console.log(actualData); setDataUpdated(true); });
    }

    let { movieId } = useParams();

    React.useEffect(() => {

        if (movieId == 'null') return; 

        fetch("http://localhost:3001/api/getmoviedetails", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ movieId })
        })
        .then((response) => response.json())
        .then((actualData) => {
            setData(actualData);

            const movie = actualData[0];
            setMovieId(movie._id)
            setMovieTitle(movie.Title)
            setMovieReleased(movie.Released)
            setMovieGenre(movie.Genre)
            setMovieRuntime(movie.Runtime)
            setMovieCast(movie.Actors)
            setMovieDirector(movie.Director)
            setMovieWriter(movie.Writer)
            setMoviePlot(movie.Plot)
            setMovieImdbId(movie.imdbID)
            setMovieImdbRating(movie.imdbRating)
            setMovieThumbnailURL(movie.Poster)
        });

    }, []);

    
    return (
        <div className='addmovie-container'>
             
            <Link to='/managemovies' className='movie-link'>Go back to Movie Management</Link>
            {
                movieId != 'null' ? <h1>Add or Modify Movie '{ data ? movieTitle: "" }' </h1> : <h1>Add a new movie </h1>
            }
            
            <div className='movieForm'>
                <div className="input-row"><label htmlFor="">Title</label><input type="text" value={movieTitle} onChange={ (e) => { setMovieTitle(e.target.value) } }  /></div>
                <div className="input-row"><label htmlFor="">Released</label><input type="text" value={movieReleased} onChange={ (e) => { setMovieReleased(e.target.value) } } /></div>
                <div className="input-row"><label htmlFor="">Genre</label><input type="text" value={movieGenre} onChange={ (e) => { setMovieGenre(e.target.value) } } /></div>
                <div className="input-row"><label htmlFor="">Runtime</label><input type="text" value={movieRuntime} onChange={ (e) => { setMovieRuntime(e.target.value) } } /></div>
                <div className="input-row"><label htmlFor="">Cast</label><input type="text" value={movieCast} onChange={ (e) => { setMovieCast(e.target.value) } } /></div>
                <div className="input-row"><label htmlFor="">Director</label><input type="text" value={movieDirector} onChange={ (e) => { setMovieDirector(e.target.value) } } /></div>
                <div className="input-row"><label htmlFor="">Writer</label><input type="text" value={movieWriter} onChange={ (e) => { setMovieWriter(e.target.value) } } /></div>
                <div className="input-row"><label htmlFor="">Plot</label><input type="text" value={moviePlot} onChange={ (e) => { setMoviePlot(e.target.value) } }/></div>
                <div className="input-row"><label htmlFor="">IMDB ID</label><input type="text" value={movieImdbId} onChange={ (e) => { setMovieImdbId(e.target.value) } } /></div>
                <div className="input-row"><label htmlFor="">IMDB Rating</label><input type="text" value={movieImdbRating} onChange={ (e) => { setMovieImdbRating(e.target.value) } } /></div>
                <div className="input-row"><label htmlFor="">Thumbnail URL</label><input type="text" value={movieThumbnailURL} onChange={ (e) => { setMovieThumbnailURL(e.target.value)} } /></div>
            </div>

            <button onClick={ () => updateMovie() }>Add / Update Movie</button>

            { dataUpdated ? <Redirect to="/managemovies"/> : ""}
        </div>
    )
}



export default AddModifyMovie;