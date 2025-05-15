import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Tv({ name, overview, poster_path, id }) {
  return (
    <div>
      <div>
        <Link to={`/movie/${id}`}>{name}</Link>
        <p>{overview}</p>
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
      </div>
    </div>
  );
}

Tv.propTypes = {
  name: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Tv;
