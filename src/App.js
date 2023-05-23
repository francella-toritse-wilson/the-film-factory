import axios from "axios";
import { useState } from "react";
import MovieResults from "./components/MovieResults.js";
import "./App.css";
import Welcome from "./components/Welcome.js";
import MySavedMovies from "./components/MySavedMovies.js";
import Form from "./components/Form.js";
import Nav from "./components/Nav.js";
import { Route, Link, Routes, useNavigate } from "react-router-dom";

function App() {

  const [displaySearchedFilms, setDisplaySearchedFilms] = useState([]);

  const handleMovieData =  (e) => {
    setDisplaySearchedFilms(e);
  }
  // Initializng a state variable named films to hold our data from the api, along side its updater function on page load


  // intitalizing a state variable to hold searched results
  // const [searchedFilms, setSearchedFilms] = useState([]);

  // // initializing a state variable to store a boolean to see if search was performed
  // const [isSearchMade, setIsSearchMade] = useState(false);


  // // Using the useEffect function here to call the sideeffct and include the depedency array to only call it once

  // const navigate = useNavigate();
  // const fetchSearchMovies = (keyword) => {
  //   const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;

  //   // calling our api data
  //   axios({
  //     url: "https://api.themoviedb.org/3/search/movie",
  //     method: "GET",
  //     params: {
  //       api_key: apiKey,
  //       query: keyword,
  //       language: "en",
  //       include_adult: false,
  //       page: "1",
  //     },
  //   })
  //     .then((res) => {
  //       setSearchedFilms(res.data.results);
  //       console.log(res.data.results);
  //       setIsSearchMade(true);
  //       navigate("/movieResults");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log("Error detected!");
  //     });
  // };

  return (
    <>
      <Nav />
      <Form name={handleMovieData}/>

      <Routes>
        <Route
          path="/"
          element={
            <Welcome />
          }
        />

        <Route
          path="/movieResults"
          element={<MovieResults movies={displaySearchedFilms} />}
        />

        <Route path="/savedMovies" element={<MySavedMovies />} />
      </Routes>
    </>
  );

};

export default App;

// error handling, if array returns with 0 indexed items, show something like "no movies found with that title?"
