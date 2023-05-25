import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from './firebase';

const ForeignResults = ({ englishMovie, foreignMovieSuggestion }) => {
  const { movieID } = useParams();

  const handleClick = (title, image) => {
    console.log("click!")
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const movieInfo = {
      title,
      image
    }
     push(dbRef, movieInfo);
  }

  return (
    <>

      <div>
        <h1> {englishMovie.original_title} </h1>
        <img src={`https://image.tmdb.org/t/p/w200/${englishMovie.poster_path}`}></img>
        <p>{englishMovie.overview}</p>
      </div>
      
      <button> Save</button>

      <ul>
      {foreignMovieSuggestion.map((singleForeignMovieSuggestion) => {
         {console.log(singleForeignMovieSuggestion)}
        

          return (
            <>
            <li>
              <h1> {singleForeignMovieSuggestion.title} </h1>
              <img src={`https://image.tmdb.org/t/p/w200/${singleForeignMovieSuggestion.poster_path}`}></img>
              <p>{singleForeignMovieSuggestion.overview}</p>
              <button onClick={() => handleClick(singleForeignMovieSuggestion.title, singleForeignMovieSuggestion.poster_path)}>Like this</button>
            </li>
            </>
    
          )
      })}
       
      </ul>
    
    </>
  );
};

export default ForeignResults;