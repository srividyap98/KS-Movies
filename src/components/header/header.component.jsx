import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header = (props) => {
    function handleLogout() {
        fetch('http://localhost:3001/api/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => {
            alert("You have logged out of your account!");
            window.location.replace("http://localhost:3000");
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='header'>
            <div className='container logo-container'>
                <Link to='/' className='logo'>KS Movies</Link>
            </div>
            <div className='container options'>
                <Link to='/nowshowing' className='option'>Now Showing</Link>
                <Link to='/recommendedmovies' className='option'>Recommended Movies</Link>
                

                {
                    (props.isAdmin === 'true') ? 
                    (<Link to='/managemovies' className='option'>Manage Movies</Link>)
                    :
                    (props.isAdmin)
                }

                {
                    (props.isAdmin === 'true') ? 
                    (<Link to='/manageshowtimes' className='option'>Manage Showtimes</Link>)
                    :
                    (props.isAdmin)
                }

                {
                    (props.isAdmin === 'true') ? 
                    (<Link to='/salesreports' className='option'>Sales Reports</Link>)
                    :
                    (props.isAdmin)
                }


            </div>
            <div className='container sign-in-container'>
                {
                    (props.isLoggedIn==='true') ? 
                    (<Link className='log-out' onClick={handleLogout}>Logout</Link>)
                    :
                    (<Link to='/signin' className='sign-in'>Register or Sign In</Link>)
                }
            </div>
        </div>
    );
}

export default Header;