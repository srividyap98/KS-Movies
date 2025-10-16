import React from 'react';
import './sales-reports.styles.scss';
import fetchMovies from '../../assets/movie.data';
import { Link } from 'react-router-dom';


class SalesReports extends React.Component {
    constructor(){
        super();
        this.state = {
            bookings: [],
            collections: []
        }
    }

    componentDidMount() {
        fetchMovies(this)
        this.getBookings();
        

    }

    getBookings () {
        fetch("http://localhost:3001/api/bookings", {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            .then((response) => response.json())
            .then((bookings) => {
                this.setState({ bookings })
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


    render(){
        const { collections, bookings } = this.state;


        let movieNames = {}, moviePrice = {};
        for(let i = 0; i < collections.length; i++) {
            movieNames[collections[i].imdbID] = collections[i].Title;
            const releaseYear = collections[i].Released.split(" ").pop();

            moviePrice[collections[i].imdbID]  = (2022 - releaseYear) * 3.03;
        }

        let total = 0;
        for(let i = 0; i < bookings.length; i++) {
            const imdbID = bookings[i].booking.split('/')[0]
            total += moviePrice[imdbID];
        }




        return(
            <div className='some-container'>
                <h1>Sales</h1>
                <br/>

                <table>
                    <tr>
                        <th>Movie</th>
                        <th>Date</th>
                        <th>Sale</th>
                    </tr>
                    {
                        bookings.map(b => <tr><td>{ movieNames[b.booking.split('/')[0]] }</td><td>{ b.booking.split('/')[1] }</td><td>{moviePrice[b.booking.split('/')[0]] } </td></tr>)
                    }
                </table>

                <h1>Grand Total: ${total} </h1>

                <br/>
            </div>
        )
    }
}

export default SalesReports;