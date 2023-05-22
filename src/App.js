import axios from "axios";
import { useEffect, useState } from "react";
import MovieResults from "./components/MovieResults.js";
import "./App.css";
import MySavedMovies from "./components/MySavedMovies.js";
import Form from "./components/Form.js";
import Nav from "./components/Nav.js";
import { Route, Link, Routes } from "react-router-dom";

function App() {
  // Initializng a state variable named films to hold our data from the api, along side its updater function on page load
  const [films, setFilms] = useState([]);

  // intitalizing a state variable to hold searched results 
  const [searchedFilms, setSearchedFilms] =useState([])

  const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;

  // Creating a callback function that generates random query calls so on page load our movie selections are different each time it loads.

  const generateRandomMovies = () => {
    // creating variable called queries that holds an array of possible string that can be passed in the query parameter
    const queries = ["fast", "comedy", "action", "horror"];
    // creating a randomizer function that will shuffle between the array and pick one
    const shuffleRandomizer = Math.floor(Math.random() * queries.length);
    // returning an random index
    return queries[shuffleRandomizer];
  };

  const fetchMovies = () => {
    const randomMovieGenerator = generateRandomMovies();
    // calling our api data
    axios({
      url: "https://api.themoviedb.org/3/discover/movie",
      method: "GET",
      params: {
        api_key: apiKey,
        query: randomMovieGenerator,
        language: "en-US",
        include_adult: false,
        page: "1",
      },
    })
      .then((res) => {
        setFilms(res.data.results);
        console.log(res.data.results);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error detected!");
      });
  };

  // Using the useEffect function here to call the sideeffct and include the depedency array to only call it once
  useEffect(fetchMovies, []);

  const fetchSearchMovies = (keyword) => {
    const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;
    // calling our api data
    axios({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      params: {
        api_key: apiKey,
        query: keyword,
        language: "en",
        include_adult: false,
        page: "1",
      },
    })
      .then((res) => {
        setSearchedFilms(res.data.results);
        console.log(res.data.results);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error detected!");
      });
  };

  return (
    <>
      <Nav />
      <Form onSubmit={fetchSearchMovies} />
      <ul>
        {films.map((individualMovie) => {
          return (
            <li key={individualMovie.id}>
              <p>{individualMovie.title}</p>
              <img src={individualMovie.poster_path} alt="" />
            </li>
          );
        })}
      </ul>
      <MovieResults movies={searchedFilms} />
      <MySavedMovies />
    </>
  );
}

export default App;

// error handling, if array returns with 0 indexed items, show something like "no movies found with that title?"
