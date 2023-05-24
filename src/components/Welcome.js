import { useState, useEffect } from "react";
import axios from "axios";

const Welcome = () => {

    const [films, setFilms] = useState([]);

    const apiKey = `89517ad5b04450b82d2f07f6f3e3d03b`;
    const fetchMovies = () => {
        console.log("Welcome")
        axios({
            url: "https://api.themoviedb.org/3/discover/movie",
            method: "GET",
            params: {
                api_key: apiKey,
                language: "en-US",
                include_adult: false,
                page: "1",
                with_original_language: 'en'
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
    useEffect(() => fetchMovies(), []);

            return (
                <ul>
                {films.map((individualMovie) => {
                return (
                    <li key={individualMovie.id}>
                        <p>{individualMovie.title}</p>
                        <img src={`https://image.tmdb.org/t/p/w200/${individualMovie.poster_path}`} alt="" />
                    </li>
                );
            })}
        </ul>
    )
}

export default Welcome;