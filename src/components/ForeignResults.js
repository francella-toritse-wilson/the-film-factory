import { useParams } from "react-router-dom";

const ForeignResults = ({}) => {
  const { movieID } = useParams();
  return (
    <>
      <ul>
        <h1>{movieID}</h1>;
        {/* {something.map((singleEnglishMovie) => {
          return <li>{singleEnglishMovie.original_title}</li>;
        })} */}
      </ul>
    </>
  );
};

export default ForeignResults;
