import React from 'react';
import { Link } from 'react-router-dom';

import './movie-time.styles.scss';

const MovieTime = ({ match }) => {
    const imdbID = match.params.imdbID;
    const date = match.params.date;

    const [showtimes, setShowtimes] = React.useState([]);

    React.useEffect(() => {

        fetch("http://localhost:3001/api/getshowtimesformovie", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ imdbID })
        })
        .then((response) => response.json())
        .then((actualData) => {
            actualData = actualData.filter(x => x.date === match.params.date)
            setShowtimes(actualData);
        });

    }, []);

    return(
        <div className='show-list-container'>
            <h1>Show timings</h1>
            <div className='show-list'>
                {
                    showtimes.length == 0 ? "" :
                    <div>
                        <h3>Premium Screening Times</h3>

                        { showtimes.map(timing => <Link to={`${match.url}/${timing.time}`}><span>{timing.time}</span></Link>) }
                    </div>
                }

                <h2>Regular Timings</h2>
                <Link to={`${match.url}/08:00`}><span>08:00</span></Link>
                <br/>
                <br/>
                <br/>
                <br/>
                <Link to={`${match.url}/10:30`}><span>10:30</span></Link>
                <br/>
                <br/>
                <br/>
                <br/>
                <Link to={`${match.url}/14:00`}><span>14:00</span></Link>
                <Link to={`${match.url}/17:00`}><span>17:00</span></Link>
                <br/>
                <br/>
                <br/>
                <br/>
                <Link to={`${match.url}/21:30`}><span>21:30</span></Link>
                <Link to={`${match.url}/23:50`}><span>23:50</span></Link>
            </div>
        </div>
    );
}

export default MovieTime;