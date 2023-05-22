import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [films, setFilms] = useState([]);
  const [userInput, setUserInput] = useState("");
  const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;

  const fetchSearchMovies = (keyword) => {
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
        setFilms(res.data.results);
        console.log(res.data.results);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error detected!");
      });
  };
  const handleSubmit = (event) => {
    fetchSearchMovies(userInput);
    event.preventDefault();
    setUserInput("");
  };

  const handleUserInput = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <legend>What are you looking for?</legend>
      <label htmlFor="search"></label>
      <input
        onChange={handleUserInput}
        type="text"
        name="search"
        id="searchField"
        value={userInput}
      />
      <button>Search</button>
    </form>
  );
};

export default Form;
