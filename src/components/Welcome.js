import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Welcome = ({
  setEnglishMovie,
  setForeignMovieSuggestion,
  setForeignMovie,
}) => {
  const { movieID } = useParams();

  const [films, setFilms] = useState([]);

  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

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
        setIsClicked(true);
        navigate(`/foreignResults/${movieId}`);
        console.log(res.data);
        const genreCode = res.data.genres
          .map((obj) => {
            return obj.id;
          })
          .join();
        const anythingButEnglish = res.data;

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
            // with_original_language: "fr",
          },
        });
      })
      .then((response) => {
        // console.log(response.data.results);
        setForeignMovie(response.data.results);
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

        // const foreignFilteredResults = response.data.results.map((obj, index ) => {
        //   console.log(obj)
        //   console.log(index)
        //   return obj
        // });

        console.log(foreignFilteredResults);
        setForeignMovieSuggestion(someNewArray);
      })
      .catch((error) => {
        console.log(`foreignResults error`);
      });
  };

  const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;
  const fetchMovies = () => {
    console.log("Welcome");
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
        console.log(res.data.results);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error detected!");
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
              onClick={(event) => handleClick(event, individualMovie.id)}
              key={individualMovie.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200/${individualMovie.poster_path}`}
                alt=""
              />
              <p>{individualMovie.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Welcome;
