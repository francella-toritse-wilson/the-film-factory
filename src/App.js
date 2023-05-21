import axios from 'axios';
import firebaseData from './components/firebase.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import MovieResults from './components/MovieResults.js';
import './App.css';


function App() {
  const [films, setFilms] = useState([]);
  const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;

  
  function fetchMovies() {
    useEffect(() => {
      const database = getDatabase(firebaseData);
      const dbRef = ref(database);
      onValue(dbRef, (response) => {
        console.log(response.val());
      });
  
      axios({
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        params: {
          api_key: apiKey,
          query: 'fast',
          language: 'en-US',
          page: '1',
        }
      })
        .then((res) => {
          setMovies(res.data.results);
          console.log(res.data.results);
        })
        .catch((error) => {
          console.log(error);
          console.log('Error detected!');
        });
    }, []);
  }

  return (
    <>
      <MovieResults showMovies = {fetchMovies} />
    </>
    // <div>
    //   console.log(`Hello`)
    //   <ul>
    //     {movie.map((individualMovie) => {
    //       return (
    //         <li>
    //           <p>{individualMovie[0].id}</p>
    //         </li>
    //       )
    //     })}
    //   </ul>
        
    // </div>
  )

};

export default App;


// error handling, if array returns with 0 indexed items, show something like "no movies found with that title?"