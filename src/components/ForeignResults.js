import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue, push } from "firebase/database";
import firebase from "./firebase";
import Error from "./Error.js";
import { useState, useEffect } from 'react';
import axios from 'axios';

const ForeignResults = () => {
  const { movieID } = useParams();

  const [foreignMovieSuggestion, setForeignMovieSuggestion] = useState([]);
  const [foreignMovie, setForeignMovie] = useState([]);
  const [englishMovie, setEnglishMovie] = useState([]);

  useEffect(() => {
    const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;
    axios({
      // add error handling in case api can't connect - stretchgoal
      // new bug - whenever you try to mess with the API link in line 23, you can still search for your given film, but you are directed to the page and results for the film Crater
      url: `https://api.themoviedb.org/3/movie/${movieID}`,
      method: "GET",
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    })
      .then((res) => {
        console.log(res.data);
        const genreCode = res.data.genres
          .map((obj) => {
            return obj.id;
          })
          .join();
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
            page: "1",
          },
        });
      })
      .then((response) => {
        console.log(response.data.results);
        setForeignMovie(response.data.results);
        // setError(true);
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

        console.log(foreignFilteredResults);
        setForeignMovieSuggestion(someNewArray);
      })
      .catch((error) => {
        console.log(`foreignResults error`);
      });
  }, []);

  // stretch goal error handling for foreign search results, remount movie data on page reload


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
