import React from 'react';
import { Link } from 'react-router-dom';

import './movie-date.styles.scss';

const MovieDate = ({ match }) => {
    const imdbID = match.params.imdbID;

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
            setShowtimes(actualData);
        });

    }, []);

    return(
        <div className='date-list-container'>
            <h1>Select a Date</h1>
            <div className='date-list'>
                {
                    showtimes.length == 0 ? "" :
                    <div>
                        <h3>Premium Screening</h3>

                        { showtimes.map(timing => <Link to={`${match.url}/${timing.date}`}><span>{timing.date}</span></Link>) }
                    </div>
                }
                

                <h2>Upcoming</h2>
                <Link to={`${match.url}/22-11-2022`}><span>22-11-2022</span></Link>
                <Link to={`${match.url}/23-11-2022`}><span>23-11-2022</span></Link>
                <Link to={`${match.url}/24-11-2022`}><span>24-11-2022</span></Link>
                <Link to={`${match.url}/25-11-2022`}><span>25-11-2022</span></Link>
                <br/>
                <br/>
                <br/>
                <Link to={`${match.url}/26-11-2022`}><span>26-11-2022</span></Link>
                <Link to={`${match.url}/27-11-2022`}><span>27-11-2022</span></Link>
                <Link to={`${match.url}/28-11-2022`}><span>28-11-2022</span></Link>
                <br/>
                <br/>
                <br/>
                <Link to={`${match.url}/29-11-2022`}><span>29-11-2022</span></Link>
                <Link to={`${match.url}/30-11-2022`}><span>30-11-2022</span></Link>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h2>Next Month</h2>
                <Link to={`${match.url}/01-12-2022`}><span>01-12-2022</span></Link>
                <Link to={`${match.url}/02-12-2022`}><span>02-12-2022</span></Link>
                <Link to={`${match.url}/03-12-2022`}><span>03-12-2022</span></Link>
                <br/>
                <br/>
                <br/>
                <Link to={`${match.url}/04-12-2022`}><span>04-12-2022</span></Link>
                <Link to={`${match.url}/05-12-2022`}><span>05-12-2022</span></Link>
                <Link to={`${match.url}/06-12-2022`}><span>06-12-2022</span></Link>
                <br/>
                <br/>
                <br/>
                <Link to={`${match.url}/07-12-2022`}><span>07-12-2022</span></Link>
                <Link to={`${match.url}/08-12-2022`}><span>08-12-2022</span></Link>
                <Link to={`${match.url}/09-12-2022`}><span>09-12-2022</span></Link>
            </div>
        </div>
    );
}

export default MovieDate;