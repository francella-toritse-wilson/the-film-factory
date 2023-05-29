import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Form = ({ name, setSearchedFilms, setUserQuery }) => {
  const [userInput, setUserInput] = useState("");

  // const [searchedFilms, setSearchedFilms] = useState([]);

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
        // original_language: "en",
        include_adult: false,
        page: "1",
      },
    })
      .then((res) => {
        const results = res.data.results;
        console.log(results);
        setIsSearchMade(true);
        navigate("/movieResults");
        const englishAndPoster = results.filter((obj) => {
          return obj.original_language === "en" && obj.poster_path;
        });

        // remember to add more instruction / clarity for the user so that they know they should search for an English-language film. if they search for a foreign-language film, something should happen (ie. foreign-language films are returned and rendered with accompanying text, or an error pops up)

        console.log(englishAndPoster);

        setSearchedFilms(englishAndPoster);
        name(englishAndPoster);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error detected!");
      });
  };

  const handleSubmit = (event) => {
    fetchSearchMovies(userInput);
    event.preventDefault();
    setUserQuery(userInput);
    // setTimeout(() => {
      setUserInput("");
      console.log("hello")
      // }, 10000); // to make the input text dissapear 
  };

  const handleUserInput = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  return (
    <div className="formContainer">
      <div className="formHeader">
        <h2>Welcome to The Film Factory!</h2>
        <h3> Search your favourite English language film, get results from around the world!</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <legend>What are you looking for?</legend>
        <label htmlFor="search"></label>
        <div className="searchContainer">
          <FontAwesomeIcon  className="searchIcon"icon={faSearch} />
          <input
            onChange={handleUserInput}
            type="text"
            name="search"
            id="searchField"
            value={userInput}
            placeholder=" What do you have in mind? "
          />
        </div>

        <button className="searchButton">Search</button>
      </form>
      
    </div>
  );
};

export default Form;
