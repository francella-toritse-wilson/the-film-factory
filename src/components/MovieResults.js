import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


const MovieResults = ({ movies, setEnglishMovie, setForeignMovie }) => {
  const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;

// const [foreignMovie, setForeignMovie] = useState([]);

  const [englishGenreIds, setEnglishGenreIds] = useState([]);

  const handleClick = (event, movieId) => {
    axios({
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      method: "GET",
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.genres);

        // in this API endpoint, there is a property called genres whereas in the discover endpoint, there is a genre_ids array. so we need to target genres so we can map through it.

        const genreIds = res.data.genres.map((genre) => genre.id);
        // using map to target each genre object and then an arrow function to target each ID, which is stored in genreIds

        setEnglishGenreIds(genreIds);
        // we set genreIds in state 
        console.log(genreIds);
        setEnglishMovie(res.data);

        // here we do our API call for the foreign language film
        axios({
          url: `https://api.themoviedb.org/3/discover/movie`,
          method: "GET",
          params: {
            api_key: apiKey,
            language: "en-US",
            // genreIds is an array but the with_genres param only accepts strings, so we use the .join() to take the items in the array of the desired english language film and put them in a string that is separated by commas
            with_genres: genreIds.join(),
            // with_original_language: "en",
          },
        })
          .then((response) => {
            console.log(response.data.results);
            const foreignFilteredResults = response.data.results.filter(
              (obj) =>
                {return obj.original_language !== "en" &&
                (englishGenreIds.length === 0 ||
                obj.genre_ids.every((genreId) => genreIds.includes(genreId)))}
                // here we are filtering out the results of our API call based on the following logic: return films that are NOT in english and contains any of the english-language genre Ids. englishGenreIds.length === 0 allows for a broader return of results so we can see multiple genre Ids return. (ie. titanic is both 18 and 28, so we see films that contain either 18 or 28 or both)
            );
            setForeignMovie(foreignFilteredResults);
            console.log(foreignFilteredResults);
          })
          .catch((error) => {
            console.log(`Error fetching foreign movies:`, error);
          });
      })
      .catch((error) => {
        console.log(`Error fetching English movie:`, error);
      });
  };


  return (
    <>
      <ul>
        {movies.map((individualMovie) => {
          return (
            <div>

              <li
                onClick={(event) => handleClick(event, individualMovie.id)}
                key={individualMovie.id}
              >
                <p>{individualMovie.title}</p>
                <Link to={`/foreignResults/${individualMovie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${individualMovie.poster_path}`}
                    alt=""
                  />
                </Link>
                
              </li>
              
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default MovieResults;
