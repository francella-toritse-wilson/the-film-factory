import firebaseData from "./firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

const MySavedMovies = () => {
  // Initializng a state variable named films to hold our data from the api, alongside its updater function
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const database = getDatabase(firebaseData);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push(data[key]);
      }
      setFilms(newState);
    });
  }, []);

  return (
      <section className="savedMovieSection">
       <h2>Your Saved Movies</h2>
        <ul className="savedMovieContainer">
          {films.map((individualSavedMovie) => {
            return (
              <li className="savedMovieList" key={individualSavedMovie}>
                <p>You searched for <span>{individualSavedMovie.englishMovie}</span> and your result was <span>{individualSavedMovie.title}</span></p>
                <img src={`https://image.tmdb.org/t/p/w200/${individualSavedMovie.image}`}
                alt={`Movie poster for ${individualSavedMovie.title}`} />
              </li>
            );
          })}
        </ul>
      </section>
  );
};

export default MySavedMovies;