import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header';
import Search from './Search';
import Movie from './Movie';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=69abca6e";

const App = () =>{

  const [loading,setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(()=>{
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse =>{
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  },[]);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=69abca6e`)
      .then(response => response.json())
      .then(jsonResponse =>{
        if(jsonResponse.Response === 'True'){
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };


  return(
    <div className="App">
      <Header text="Movie Viewer"/>
      <Search search={search}/>
      <p className="App-intro">Sharing a few of our favourite movies</p>

      <div className='movies'>
        {loading && !errorMessage ? (
          <span>loading.....</span>
        ): errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ): (
          movies.map((movie,index) => (
            <Movie key={`${index}-${movie.Title}`} movie = {movie}/>
          ))
        )}

      </div>
    </div>
  )





}

export default App;
