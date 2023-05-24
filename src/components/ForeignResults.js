import { useParams } from 'react-router-dom';

const ForeignResults = () => {
    const { movieID } = useParams();
        return (

            console.log("hi")
            // <ul>
            //     {clickedMovie.map((englishMovie) => {

            //         return (
            //             <p>{englishMovie.original_title}</p>
            //                 {/* <img src={`https://image.tmdb.org/t/p/w300/${clickedMovie.poster_path}`} alt="" /> */}
//                 <p>Overview</p>
//                 <p>Because you chose ???, see below for foreign options</p> 
            //         )
            //     }
            //     )}

            // </ul>
        )

}

export default ForeignResults;