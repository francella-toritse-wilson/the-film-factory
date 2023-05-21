const MovieResults =  ({showMovies}) => {
    return (
        <ul>
        {showMovies.map((individualMovie) => {
            return (
                <li>
                    <p>{individualMovie.id}</p>
                </li>
            )
        })}
        </ul>
    )
}

export default MovieResults;