import { useParams } from "react-router-dom";

const ForeignResults = ({ englishMovie }) => {
  const { movieID } = useParams();
  return (
    <>

      <ul>
        <h1> {englishMovie.original_title} </h1>
        <img src={`https://image.tmdb.org/t/p/w200/${englishMovie.poster_path}`}></img>
        <p>{englishMovie.overview}</p>
      </ul>
      <button> Save</button>
    </>
  );
};

export default ForeignResults;
