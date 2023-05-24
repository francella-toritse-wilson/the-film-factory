import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const MovieResults = ({ movies, setEnglishMovie }) => {
  const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;

  const [foreignMovie, setForeignMovie] = useState([]);

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
        setEnglishMovie(res.data);
        return axios({
          url: `https://api.themoviedb.org/3/discover/movie`,
          method: "GET",
          params: {
            api_key: apiKey,
            language: "en-US",
            with_genres: "18,28",
            with_original_language: "fr",
          },
        });
      })
      .then((response) => {
        console.log(response.data.results);
        setForeignMovie(response.data.results);
        const foreignFilteredResults = response.data.results.filter((obj) => {
          return obj.original_language !== "en";
        });
      })
      .catch((error) => {
        console.log(`foreignResults error`);
      });
  };

  return (
    <>
      <ul>
        {movies.map((individualMovie) => {
          return (
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
          );
        })}
      </ul>
    </>
  );
};

export default MovieResults;
