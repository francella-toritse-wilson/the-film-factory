import { Link } from "react-router-dom";
import axios from "axios";
// import { useState } from "react";
import Error from "./Error.js";

const MovieResults = ({
  movies,
  setEnglishMovie,
  setForeignMovieSuggestion,
  setForeignMovie,
  searchedFilms,
  userQuery,
}) => {
  const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;

  // const [searchedFilm, setSearchedFilm] = useState("");

  // const [error, setError] = useState([]);

  const handleClick = (event, movieId) => {
    axios({
      // add error handling in case api can't connect - stretchgoal
      // new bug - whenever you try to mess with the API link in line 23, you can still search for your given film, but you are directed to the page and results for the film Crater
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      method: "GET",
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    })
      .then((res) => {
        console.log(res.data);
        const genreCode = res.data.genres
          .map((obj) => {
            return obj.id;
          })
          .join();
        console.log(genreCode);
        // the array of English-language movies
        setEnglishMovie(res.data);

        return axios({
          url: `https://api.themoviedb.org/3/discover/movie`,
          method: "GET",
          params: {
            api_key: apiKey,
            language: "en-US",
            with_genres: genreCode,
            // page: "2",
          },
        });
      })
      .then((response) => {
        console.log(response.data.results);
        setForeignMovie(response.data.results);
        // setError(true);
        const foreignFilteredResults = response.data.results.filter((obj) => {
          return obj.original_language !== "en";
        });

        const someNewArray = [];

        const arrayLength =
          foreignFilteredResults.length < 10
            ? foreignFilteredResults.length
            : 10;

        for (let i = 0; i < arrayLength; i++) {
          someNewArray.push(foreignFilteredResults[i]);
        }
        console.log(someNewArray);

        console.log(foreignFilteredResults);
        setForeignMovieSuggestion(someNewArray);
      })
      .catch((error) => {
        console.log(`foreignResults error`);
      });
  };

  // in the event that the array is empty (ie. in the case with Alien), we should either have a message rendered or an alert OR it should render a random foreign-language film
  // if enters gibberish and returns ZERO English-language film, there should be a message on the screen ("Sorry, we couldn't find that film for you!")
  // display three new foreign-language films (ie. Titanic is 18 for Romance. If you search other romance films (such as, An Officer and a Gentleman), you get the same three foreign-language films as you did when you searched Titanic. This would be an issue if a user is searching English-language films in succession)


  
  return (
    <div className="movieResultsSection">       
      <h2>{`Here are your results for "${userQuery}"`}</h2>
      <ul className="movieResultsContainer">
        {searchedFilms && searchedFilms.length === 0 ? (
          <Error />
        ) : (
          movies.map((individualMovie) => {
            return (
              <>
              <li className="searchedList"
                onClick={(event) => handleClick(event, individualMovie.id)}
                key={individualMovie.id}
              >

                <Link to={`/foreignResults/${individualMovie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${individualMovie.poster_path}`}
                    alt=""
                  />
                </Link>
                <p>{individualMovie.title}</p>
              </li>
              </>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default MovieResults;
