import { useParams } from "react-router-dom";
import { getDatabase, ref, push } from "firebase/database";
import firebase from "./firebase";
import Error from "./Error.js";
import { useState, useEffect } from 'react';
import axios from 'axios';

const ForeignResults = () => {

  const { movieID } = useParams();

  const [foreignMovieSuggestion, setForeignMovieSuggestion] = useState([]);
  const [englishMovie, setEnglishMovie] = useState([]);

  useEffect(() => {
    // const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;
    axios({
      url: `https://api.themoviedb.org/3/movie/${movieID}`,
      method: "GET",
      params: {
        api_key: `89517ad5b04450b82d2f07f6f3e3d03b`,
        language: "en-US",
      },
    })
      .then((res) => {
        const genreCode = res.data.genres
          .map((obj) => {
            return obj.id;
          })
          .join();
        // the array of English-language movies
        setEnglishMovie(res.data);

        return axios({
          url: `https://api.themoviedb.org/3/discover/movie`,
          method: "GET",
          params: {
            api_key: `89517ad5b04450b82d2f07f6f3e3d03b`,
            language: "en-US",
            with_genres: genreCode,
            page: "1",
          },
        });
      })
      .then((response) => {
        // filtering array of movies that contain the same genreCode as the user's search and then filtered based on the following conditional logic: the films are NOT in English 
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
        setForeignMovieSuggestion(someNewArray);
      })
      .catch((error) => {
        alert("ForeignResults error!");
      });
  }, [movieID]);


  const handleClick = (title, image, englishMovie) => {
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
              alt={`Movie poster for ${englishMovie.original_title}`}
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
                return (
                  <>
                    <li>
                      <div className="imageContainer">
                        <img
                          src={`https://image.tmdb.org/t/p/w200/${singleForeignMovieSuggestion.poster_path}`}
                          alt={`Movie poster for ${singleForeignMovieSuggestion.title}`}
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
