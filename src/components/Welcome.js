import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Welcome = () => {
  const [films, setFilms] = useState([]);

  const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;
  const fetchMovies = () => {
    axios({
      url: "https://api.themoviedb.org/3/discover/movie",
      method: "GET",
      params: {
        api_key: apiKey,
        language: "en-US",
        include_adult: false,
        page: "1",
        with_original_language: "en",
      },
    })
      .then((res) => {
        setFilms(res.data.results);
      })
      .catch((error) => {
        alert("Error detected!");
      });
  };
  useEffect(() => fetchMovies(), []);

  return (
    <div className="welcomeContainer">
      <h2>Trending Movies</h2>
      <ul className="trendingList">
        {films.map((individualMovie) => {
          return (
            <li
              key={individualMovie.id}
            ><Link to={`/foreignResults/${individualMovie.id}`}>
                <img
                src={`https://image.tmdb.org/t/p/w200/${individualMovie.poster_path}`}
                alt={`Movie poster for ${individualMovie.title}`}
              />
            </Link>
              <p>{individualMovie.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Welcome;
