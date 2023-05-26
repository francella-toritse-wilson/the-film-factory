import { useState } from "react";
import MovieResults from "./components/MovieResults.js";
import "./App.css";
import Welcome from "./components/Welcome.js";
import MySavedMovies from "./components/MySavedMovies.js";
import Form from "./components/Form.js";
import Nav from "./components/Nav.js";
import ForeignResults from "./components/ForeignResults.js";
import { Route, Link, Routes, useNavigate } from "react-router-dom";

function App() {
  const [englishMovie, setEnglishMovie] = useState([]);

  const [foreignMovie, setForeignMovie] = useState([]);

  const [displaySearchedFilms, setDisplaySearchedFilms] = useState([]);

  const [foreignMovieSuggestion, setForeignMovieSuggestion] = useState([]);


  const handleMovieData = (e) => {
    setDisplaySearchedFilms(e);
  };

  return (
    <>
      <Nav />
      <Form name={handleMovieData} />

      <Routes>
        <Route path="" element={<Welcome setEnglishMovie={setEnglishMovie}
              setForeignMovieSuggestion={setForeignMovieSuggestion}
              setForeignMovie={setForeignMovie}/>} />

        <Route
          path="/movieResults"
          element={
            <MovieResults
              movies={displaySearchedFilms}
              setEnglishMovie={setEnglishMovie}
              setForeignMovieSuggestion={setForeignMovieSuggestion}
              setForeignMovie={setForeignMovie}
            />
          }
        />

        <Route
          path="/foreignResults/:movieID"
          element={<ForeignResults englishMovie={englishMovie} foreignMovieSuggestion={foreignMovieSuggestion}/>}
        />

        <Route path="/savedMovies" element={<MySavedMovies />} />
      </Routes>
    </>
  );
}

export default App;

// error handling, if array returns with 0 indexed items, show something like "no movies found with that title?"