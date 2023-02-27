import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import NowShowing from './pages/now-showing/now-showing.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import CollectionDetailsPage from './pages/collection-details-page/collection-details-page.component';
import RecommendedMovies from './pages/recommendedmovies/recommendedmovies.component';
import ManageMovies from './pages/manage-movies/manage-movies.component';
import AddModifyMovie from './pages/add-modify-movie/add-modify-movie.component';
import ManageShowtimes from './pages/manage-showtimes/manage-showtimes.component';
import SalesReports from './pages/sales-reports/sales-reports.component';

class App extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: 'false'
    }
  }

  onChange = ({ isLoggedIn, isAdmin }) => {
    this.setState({
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin
    });
  }

  componentDidMount(){
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
    .catch(err => console.log(err))

    fetch('http://localhost:3001/api/getlevel', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(json => {
      this.setState({ isAdmin: json });
    })
    .catch(err => console.log(err))

  }
  
  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} onAuthChange={this.onChange} />
        <Switch>
            <Route exact={true} path='/' component={HomePage} />
            <Route path='/nowshowing' component={NowShowing} />
            <Route path='/recommendedmovies' component={RecommendedMovies} />
            <Route path='/managemovies' component={ManageMovies} />
            <Route path='/manageshowtimes' component={ManageShowtimes} />
            <Route path='/salesreports' component={SalesReports} />
            <Route path='/addormodifymovie/:movieId' component={AddModifyMovie} />
            <Route path='/signin' component={() => <SignInAndSignUp onAuthChange={this.onChange} />}  />
            <Route path='/:imdbID' component={CollectionDetailsPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
