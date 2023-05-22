const MovieResults = ({ movies }) => {
  return (
    <ul>
      {movies.map((individualMovie) => {
        return (
          <li key={individualMovie.id}>
            <p>{individualMovie.title}</p>
            <img src={individualMovie.poster_path} alt=""/>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieResults;
