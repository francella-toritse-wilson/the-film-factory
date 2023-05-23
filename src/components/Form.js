
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = ({name}) => {
  
  const [userInput, setUserInput] = useState("");

  const [searchedFilms, setSearchedFilms] = useState([]);

  // initializing a state variable to store a boolean to see if search was performed
  const [isSearchMade, setIsSearchMade] = useState(false);


  // Using the useEffect function here to call the sideeffct and include the depedency array to only call it once

  const navigate = useNavigate();
  const fetchSearchMovies = (userInput) => {
    const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;

    // calling our api data
    axios({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      params: {
        api_key: apiKey,
        query: userInput,
        language: "en",
        include_adult: false,
        page: "1",
      },
    })
      .then((res) => {
        setSearchedFilms(res.data.results);
        name(res.data.results);
        console.log(res.data.results);
        setIsSearchMade(true);
        navigate("/movieResults");
      })
      .catch((error) => {
        console.log(error);
        console.log("Error detected!");
      });
  };
  
 useEffect(fetchSearchMovies, []);

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
