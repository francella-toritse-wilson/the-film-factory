import { useParams } from "react-router-dom";
;

const ForeignResults = ({ englishMovie, foreignMovie }) => {
  const { movieID } = useParams();

  // console.log(foreignMovie[0].original_title);
  return (
    <>

      <ul>
        <h1> {englishMovie.original_title} </h1>
        <img src={`https://image.tmdb.org/t/p/w200/${englishMovie.poster_path}`}></img>
        <p>{englishMovie.overview}</p>
      </ul>
        {/* <h2>If you like {englishMovie.original_title}, you will like...{foreignMovie[0].title}</h2> */}
      <button> Save</button>
    </>
  );
};

export default ForeignResults;
