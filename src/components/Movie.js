import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ title, overview, poster_path, id }) {
  return (
    <div>
      <div>
        <Link to={`/movie/${id}`}>{title}</Link>
        <p>{overview}</p>
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
      </div>
    </div>
  );
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Movie;
