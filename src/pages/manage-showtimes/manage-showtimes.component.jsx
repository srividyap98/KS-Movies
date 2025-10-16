import React from 'react';
import './manage-showtimes.styles.scss';
import fetchMovies from '../../assets/movie.data';
import { Link } from 'react-router-dom';


class ManageShowtimes extends React.Component {
    constructor(){
        super();
        this.state = {
            collections: [],
            showtimes: [],
            imdbID: "", date: "", time: ""
        }
    }

    componentDidMount() {
        fetchMovies(this)
        this.reloadTimes();
        

    }

    reloadTimes () {
        fetch("http://localhost:3001/api/allshowtimes", {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            .then((response) => response.json())
            .then((showtimes) => {
                this.setState({ showtimes })
            });
    }
    reloadMovies() {
        fetchMovies(this)
    }

    delete_time(timeId) {
        fetch("http://localhost:3001/api/deleteshowtime", {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({ 
                        timeId
                    })
                })
                .then((response) => response.json())
                .then((actualData) => { this.reloadTimes(); });
    }

    addshowtime() {
        fetch("http://localhost:3001/api/updateshowtimes", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ 
                imdbID: this.state.imdbID,
                date: this.state.date,
                time: this.state.time
            })
        })
        .then((response) => response.json())
        .then((actualData) => { this.reloadTimes(); });
    }

    render(){
        const { collections, showtimes } = this.state;


        let movieNames = {};
        for(let i = 0; i < collections.length; i++) {
            movieNames[collections[i].imdbID] = collections[i].Title;
        }

        return(
            <div className='some-container'>
                <h1>Manage Showtimes</h1>

                <br/>

                <div className="addshowtime">
                    <h3>Add a new showtime</h3>
                    <input type="text" placeholder="imdbID" onChange={ (event) => this.setState( { imdbID: event.target.value }) }/> 
                    <input type="text" placeholder="date"   onChange={ (event) => this.setState( { date: event.target.value }) }/> 
                    <input type="text" placeholder="time"   onChange={ (event) => this.setState( { time: event.target.value }) }/>
                    <button onClick={ () => { this.addshowtime() }}>Add</button>
                </div>

                <br/>

                <table>
                    <tr>
                        <th></th>
                        <th>Movie</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                    {
                        showtimes.map(st => <tr><td className='cursor' onClick={() => this.delete_time(st._id)}>❌</td><td>{ movieNames[st.imdbID] }</td><td>{ st.date }</td><td>{ st.time }</td></tr>)
                    }
                </table>
            </div>
        )
    }
}

export default ManageShowtimes;