import firebaseData from "./firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

const MySavedMovies = () => {
  // Initializng a state variable named films to hold our data from the api, along side its updater function
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const database = getDatabase(firebaseData);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      console.log(response.val());
      const newState = [];
      const data = response.val();

      for (let key in data) {
        newState.push(data[key]);
      }

      setFilms(newState);
    });
  }, []);

  return (
    <div>
      <ul>
        {films.map((individualSavedMovie) => {
          return (
            <li key={individualSavedMovie}>
              <p>{individualSavedMovie}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MySavedMovies;
