import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Form = ({ name, setSearchedFilms, setUserQuery }) => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] =useState(false)

  // initializing a state variable to store a boolean to see if search was performed
  // const [isSearchMade, setIsSearchMade] = useState(false);

  const navigate = useNavigate();
  const fetchSearchMovies = (userInput) => {
    const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;

    // calling our api data
    setLoading(true); // Set loading before sending API request
    axios({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      params: {
        api_key: apiKey,
        query: userInput,
        include_adult: false,
        page: "1",
      },
    })
      .then((res) => {
        const results = res.data.results;
        setLoading(false); // Stop loading
        navigate("/movieResults");
        const englishAndPoster = results.filter((obj) => {
          return obj.original_language === "en" && obj.poster_path;
        });
        setSearchedFilms(englishAndPoster);
        name(englishAndPoster);
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        alert("Error detected!");
      });
  };

  const handleSubmit = (event) => {
    fetchSearchMovies(userInput);
    event.preventDefault();
    setUserInput("");
    setUserQuery(userInput);
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <section className="formContainer">
      <div className="formHeader">
        <h2>Welcome to The Film Factory!</h2>
        <h3>
          {" "}
          Search your favourite English language film, get results from around
          the world!
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <legend>What are you looking for?</legend>
        <label htmlFor="search"></label>
        <div className="searchContainer">
          <FontAwesomeIcon className="searchIcon" icon={faSearch} />
          <input
            onChange={handleUserInput}
            type="text"
            name="search"
            id="searchField"
            value={userInput}
            placeholder=" What do you have in mind? "
          />
        </div>
        <div className="buttonContainer">
          <button className="searchButton">
            {loading ? <>Loading..</> : <>Search</>}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

