const MovieResults = ({ movies }) => {
  return (
    <ul>
      {movies.map((individualMovie) => {
        return (
          <li key={individualMovie.id}>
            <p>{individualMovie.title}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieResults;
