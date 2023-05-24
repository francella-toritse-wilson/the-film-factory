import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ForeignResults from "./ForeignResults";

const MovieResults = ({ movies }) => {
  const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;
  const [ englishMovie, setEnglishMovie ] = useState();

  const handleClick = (event) => {

    axios({
      url: `https://api.themoviedb.org/3/movie/597`,
      method: "GET",
        params: {
          api_key:apiKey,
          language: 'en-US'
        },
      //   headers: {
      //     accept: 'application/json',
      //     Authorization: 'Bearer 89517ad5b04450b82d2f07f6f3e3d03b'
      // }
    })
      .then((res) => {
        console.log(res.data)

        setEnglishMovie(res.data);
      })
      .catch((error) => {
        console.log(`foreignResults error`)
      })
  }

  return (
    <>
    <ul>
      {movies.map((individualMovie) => {
        return (
          <li onClick={handleClick} key={individualMovie.id}>
            <p>{individualMovie.title}</p>
            <Link to={`/movie/${individualMovie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w200/${individualMovie.poster_path}`} alt="" />
            </Link>
          </li>
        );
      })}
    </ul>
    <ForeignResults clickedMovie={englishMovie} />
    </>
  );
};

export default MovieResults;
