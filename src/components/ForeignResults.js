import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue, push } from "firebase/database";
import firebase from "./firebase";
import Error from "./Error.js";

const ForeignResults = ({
  englishMovie,
  foreignMovieSuggestion,
  foreignMovie,
}) => {
  const { movieID } = useParams();

  const handleClick = (title, image, englishMovie) => {
    console.log("click!");
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const movieInfo = {
      title,
      image,
      englishMovie,
    };
    push(dbRef, movieInfo);
  };

  return (
    <>
      <section className="foreignResults">
        <div className="englishMovie">
          <div className="imageContainer">
            <img
              src={`https://image.tmdb.org/t/p/w200/${englishMovie.poster_path}`}
            />
          </div>
            <div className="englishMovieText">
              <h2> {englishMovie.original_title} </h2>
              <p>{englishMovie.overview}</p>
              
                <button>Save</button>
              
            </div>
        </div>

        <div className="foreignMovie">
          <h2 className={foreignMovieSuggestion && foreignMovieSuggestion.length === 0 ? 'hide' : ''}>Based on your search, we think you might like these foreign-language films</h2>
          <ul className="foreignMovieList">
            {foreignMovieSuggestion && foreignMovieSuggestion.length === 0 ? (
              <Error />
            ) : (
              foreignMovieSuggestion.map((singleForeignMovieSuggestion) => {
                {
                  console.log(singleForeignMovieSuggestion);
                }

                return (
                  <>
                    <li>
                      <div className="imageContainer">
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${singleForeignMovieSuggestion.poster_path}`}
                        ></img>
                      </div>
                      <div className="foreignMovieText">
                        <h2> {singleForeignMovieSuggestion.title} </h2>
                        <p>{singleForeignMovieSuggestion.overview}</p>
                        <button
                          onClick={() =>
                            handleClick(
                              singleForeignMovieSuggestion.title,
                              singleForeignMovieSuggestion.poster_path,
                              englishMovie.original_title
                            )
                          }
                        >
                        Like
                        </button>
                      </div>
                      
                    </li>
                  </>
                );
              })
            )}
          </ul>
        </div>
        
      </section>
    </>
  );
};

export default ForeignResults;
