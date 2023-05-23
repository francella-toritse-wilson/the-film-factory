
import { useState } from "react";

const Form = ({onSubmit}) => {
  
  const [userInput, setUserInput] = useState("");
  

  
  const handleSubmit = (event) => {
    onSubmit(userInput);
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
