

const fetchMovies = (context) => {
    fetch('http://localhost:3001/api/movies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }  
    })
    .then(res => res.json())
    .then(json => {
        // console.log(json)
        context.setState({ collections: json });
    })
    .catch(err => console.log(err));
}

export default fetchMovies;