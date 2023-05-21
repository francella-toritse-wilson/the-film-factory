import axios from 'axios';
import { useEffect } from 'react';
import './App.css';


function App() {
  const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;
  
  useEffect(() => {
    
    axios({
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      params: {
        api_key: apiKey,
        query: 'flkjsdflkj',
        language: 'en-US',
        page: '1',
      }
      
      
    }).then((res)=> {
      console.log(res.data.results);
    }).catch((error) => {
      console.log(error)
      console.log('Error detected!')
    })

  })

  return (
    console.log(`Hello`)
  )

};

export default App;


// error handling, if array returns with 0 indexed items, show something like "no movies found with that title?"