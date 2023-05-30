import { Link } from "react-router-dom";
import Error from "./Error.js";
import { Fragment } from "react";

const MovieResults = ({ movies, searchedFilms, userQuery }) => {
  return (
    <div className="movieResultsSection">
      <h2>{`Here are your results for "${userQuery}"`}</h2>
      <ul className="movieResultsContainer">
        {searchedFilms && searchedFilms.length === 0 ? (
          <Error />
        ) : (
          movies.map((individualMovie) => {
            return (
              <Fragment key={individualMovie.id}>
                <li className="searchedList">
                  <Link to={`/foreignResults/${individualMovie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${individualMovie.poster_path}`}
                      alt={`Movie poster for ${individualMovie.title}`}
                    />
                  </Link>
                  <p>{individualMovie.title}</p>
                </li>
              </Fragment>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default MovieResults;
