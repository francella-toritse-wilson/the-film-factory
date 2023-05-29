import { useState } from "react";
import MovieResults from "./components/MovieResults.js";
import "./App.css";
import Welcome from "./components/Welcome.js";
import MySavedMovies from "./components/MySavedMovies.js";
import Form from "./components/Form.js";
import Nav from "./components/Nav.js";
import ForeignResults from "./components/ForeignResults.js";
import RootErrorPage from "./components/RootErrorPage.js";
import { Route, Routes } from "react-router-dom";

function App() {
  const [searchedFilms, setSearchedFilms] = useState([]);
  const [userInput, setUserInput] = useState("");

  const [displaySearchedFilms, setDisplaySearchedFilms] = useState([]);


  const handleMovieData = (e) => {
    setDisplaySearchedFilms(e);
  };

  return (
    <div className="wrapper">
      <Nav />
      <Form name={handleMovieData} setSearchedFilms={setSearchedFilms} setUserInput={setUserInput} userInput={userInput}
/>

      <Routes>
        <Route
          path=""
          element={
            <Welcome
            />
          }
        />

        <Route
          path="/movieResults"
          element={
            <MovieResults
              movies={displaySearchedFilms}
              searchedFilms={searchedFilms}
              userInput={userInput}
            />
          }
        />

        <Route
          path="/foreignResults/:movieID"
          element={
            <ForeignResults
            />
          }
        />

        <Route path="/savedMovies" element={<MySavedMovies />} />
        <Route path="*" element={<RootErrorPage />} />
      </Routes>
      <footer> 
        <div className="footerText">
          <p>Created by Toritse, Wilson & Francella @ Juno College</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

// error handling, if array returns with 0 indexed items, show something like "no movies found with that title?"
